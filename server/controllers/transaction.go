package controllers

import (
	"net/http"
	"strconv"
	"time"
	"waysbeans/dto"
	"waysbeans/dto/result"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUCT
type transactionControl struct {
	TransactionRepository repositories.TransactionRepository
	UserRepository        repositories.UserRepository
	ProductRepository     repositories.ProductRepository
	CartRepository        repositories.CartRepository
}

// SETUP CONTROL FUNCTION
func ControlTransaction(
	TransactionRepository repositories.TransactionRepository,
	UserRepository repositories.UserRepository,
	ProductRepository repositories.ProductRepository,
	CartRepository repositories.CartRepository,
) *transactionControl {
	return &transactionControl{
		TransactionRepository,
		UserRepository,
		ProductRepository,
		CartRepository,
	}
}

// FUNCTION FIND TRANSACTIONS
func (h *transactionControl) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	if len(transaction) > 0 {
		return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: transaction})
	} else {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: "No record found"})
	}
}

// FUNCTION GET TRANSACTION ID
func (h *transactionControl) GetTransaction(c echo.Context) error {
	// get param id
	id, _ := strconv.Atoi(c.Param("id"))
	// get transaction by id
	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: transaction})
}

// FUNCTION CREATE TRANSACTION
func (h *transactionControl) CreateTransaction(c echo.Context) error {
	request := new(dto.TransactionRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, err := h.UserRepository.GetUser(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	totalQuantity := 0
	for _, cart := range user.Cart {
		totalQuantity += cart.OrderQty
	}
	totalPrice := 0
	for _, cart := range user.Cart {
		product, err := h.ProductRepository.GetProducts(cart.ProductID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		}
		totalPrice += cart.OrderQty * product.Price
	}

	var productTransaction []models.CartToTransaction
	for _, cart := range user.Cart {
		product, err := h.ProductRepository.GetProducts(cart.ProductID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
		}
		var cartNew models.CartToTransaction
		cartNew.ProductID = product.ID
		cartNew.ProductName = product.Name
		cartNew.ProductPhoto = product.Photo
		cartNew.ProductPrice = product.Price
		cartNew.OrderQuantity = cart.OrderQty

		productExists := false
		for _, product := range productTransaction {
			if product.ProductID == cartNew.ProductID {
				productExists = true
				break
			}
		}
		if !productExists {
			productTransaction = append(productTransaction, cartNew)
		}
	}

	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
		transactionId = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:            transactionId,
		UserID:        int(userId),
		User:          models.UsersRelation{},
		Name:          request.Name,
		Email:         request.Email,
		Phone:         request.Phone,
		Address:       request.Address,
		Cart:          productTransaction,
		TotalQuantity: totalQuantity,
		TotalPrice:    totalPrice,
		Status:        "pending",
	}

	dataTransactions, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}

	carts, err := h.CartRepository.FindCart()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	for _, cart := range carts {
		if cart.UserID == int(userId) {
			cartToDelete, err := h.CartRepository.GetCart(cart.ID)
			if err != nil {
				return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			}

			_, err = h.CartRepository.DelCart(cartToDelete)
			if err != nil {
				return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
			}
		}
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: dataTransactions})
}

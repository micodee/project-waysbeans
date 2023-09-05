package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"waysbeans/dto"
	"waysbeans/dto/result"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
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

	var userTransaction models.UsersRelation
	userTransaction.ID = user.ID
	userTransaction.Name = user.Name

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

	// create ID
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
		User:          userTransaction,
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

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID),
			GrossAmt: int64(dataTransactions.TotalPrice),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.Name,
			Email: dataTransactions.Email,
			Phone: dataTransactions.Phone,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: snapResp})
}

func (h *transactionControl) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	fmt.Print("payload: ", notificationPayload)

	transaction, _ := h.TransactionRepository.GetTransaction(order_id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_id)
		} else if fraudStatus == "accept" {
			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "Waysbeans <waysbeans.admin@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var totalQuantity = strconv.Itoa(transaction.TotalQuantity)
		var totalPrice = strconv.Itoa(transaction.TotalPrice)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", "tommymh21@gmail.com")
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
			<html lang="en">
					<head>
					<meta charset="UTF-8" />
					<meta http-equiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Document</title>
					<style>
							h1 {
							color: brown;
							}
					</style>
					</head>
					<body>
					<h2>Product payment :</h2>
					<ul style="list-style-type:none;">
							<li>Total Quantity : %s</li>
							<li>Total payment: Rp.%s</li>
							<li>Status : <b>%s</b></li>
					</ul>
					</body>
			</html>`, totalQuantity, totalPrice, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + CONFIG_AUTH_EMAIL)
	}
}

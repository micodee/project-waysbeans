package controllers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"waysbeans/dto"
	"waysbeans/dto/result"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUCT
type productControl struct {
	ProductRepository repositories.ProductRepository
}

// SETUP CONTROL FUNCTION
func ControlProduct(ProductRepository repositories.ProductRepository) *productControl {
	return &productControl{ProductRepository}
}

// FUNCTION FIND PRODUCTS
func (h *productControl) FindProducts(c echo.Context) error {
	products, err := h.ProductRepository.FindProduct()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// cloudinary
	for i, p := range products {
		imagePath := os.Getenv("PATH_FILE") + p.Photo
		products[i].Photo = imagePath
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: products})
}

// FUNCTION GET PRODUCT BY ID
func (h *productControl) GetProducts(c echo.Context) error {
	// get url param ID
	id, _ := strconv.Atoi(c.Param("id"))

	// repository get product
	products, err := h.ProductRepository.GetProducts(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// cloudinary
	products.Photo = os.Getenv("PATH_FILE") + products.Photo
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProduct(products)})
}

// FUNCTION CREATE PRODUCT
func (h *productControl) CreateProduct(c echo.Context) error {
	// get file IMAGE
	filepath := c.Get("dataFile").(string)
	fmt.Println(filepath, "upload successfully")

	// convert request STRING TO INT
	price, _ := strconv.Atoi(c.FormValue("price"))
	stock, _ := strconv.Atoi(c.FormValue("stock"))

	// get request
	request := dto.CreateProductRequest{
		Name:        c.FormValue("name"),
		Description: c.FormValue("desc"),
		Price:       price,
		Photo:       filepath,
		Stock:       stock,
	}

	// validate request input
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// cloudinary
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// cloudinary
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, filepath, uploader.UploadParams{Folder: "waysbeans"})
	if err != nil {
		fmt.Println(err.Error())
	}

	// get user FROM JWT TOKEN
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	// submit TO DATABASE tb PRODUCTS
	product := models.Product{
		Name:        request.Name,
		Price:       request.Price,
		Description: request.Description,
		Stock:       request.Stock,
		Photo:       resp.SecureURL,
		UserID:      int(userId),
	}

	// run REPOSITORY create product
	data, err := h.ProductRepository.CreateProduct(product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProduct(data)})
}

// FUNCTION UPDATE PRODUCT
func (h *productControl) UpdateProduct(c echo.Context) error {
	// get file IMAGE
	dataFile := c.Get("dataFile").(string)

	// request data product
	request := new(dto.UpdateProductRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// get url param ID
	id, _ := strconv.Atoi(c.Param("id"))

	// run REPOSITORY get products
	product, err := h.ProductRepository.GetProducts(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// check update value = jika request name tidak sama dengan null maka tetap menggunakan value sebelumnya
	if request.Name != "" {
		product.Name = request.Name
	}
	if request.Price != 0 {
		product.Price = request.Price
	}
	if request.Description != "" {
		product.Description = request.Description
	}
	if request.Stock != 0 {
		product.Stock = request.Stock
	}
	if dataFile != "" {
		// delete image old in file and update new image
		fileName := product.Photo
		filePath := "uploads/" + fileName
		err = os.Remove(filePath)
		if err != nil {
			fmt.Println("Failed to delete file"+fileName+":", err)
			return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
		}
		fmt.Println(dataFile + " update successfully")

		product.Photo = dataFile

	}

	// run REPOSITORY update product
	data, err := h.ProductRepository.UpdateProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProduct(data)})
}

// FUNCTION DELETE PRODUCT
func (h *productControl) DeleteProduct(c echo.Context) error {
	// get url param ID
	id, _ := strconv.Atoi(c.Param("id"))

	// run REPOSITORY get products
	product, err := h.ProductRepository.GetProducts(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	// cloudinary
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// create a new cloudinary
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	fileName := product.Photo
	del, err := cld.Upload.Destroy(ctx, uploader.DestroyParams{PublicID: fileName})
	if err != nil {
		fmt.Println("Failed to delete file"+fileName+":", err)
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	fmt.Println(fileName+" deleted successfully", del)

	// run REPOSITORY delete product
	data, err := h.ProductRepository.DeleteProduct(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProduct(data)})
}

// write response product
func convProduct(u models.Product) dto.ProductResponse {
	return dto.ProductResponse{
		Name:        u.Name,
		Price:       u.Price,
		Description: u.Description,
		Stock:       u.Stock,
		Photo:       u.Photo,
		User:        u.User,
	}
}

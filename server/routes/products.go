package routes

import (
	"waysbeans/controllers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	productRepository := repositories.RepositoryProduct(mysql.ConnDB)
	h := controllers.ControlProduct(productRepository)

	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProducts)
	e.POST("/product", middleware.Auth(middleware.Admin(middleware.UploadFile(h.CreateProduct))))
	e.PATCH("/product/:id", middleware.Auth(middleware.Admin(middleware.UploadFile(h.UpdateProduct))))
	e.DELETE("/product/:id", middleware.Auth(middleware.Admin(h.DeleteProduct)))
}

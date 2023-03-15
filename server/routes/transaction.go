package routes

import (
	"waysbeans/controllers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryCart(mysql.ConnDB)
	userRepository := repositories.RepositoryUser(mysql.ConnDB)
	productRepository := repositories.RepositoryProduct(mysql.ConnDB)
	cartRepository := repositories.RepositoryCart(mysql.ConnDB)
	h := controllers.ControlTransaction(transactionRepository, userRepository, productRepository, cartRepository)

	e.GET("/transaction", h.FindTransaction)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.POST("/notification", h.Notification)
}

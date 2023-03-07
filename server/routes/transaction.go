package routes

import (
	"waysbeans/controllers"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryCart(mysql.ConnDB)
	h := controllers.ControlTransaction(transactionRepository)

	e.GET("/transaction", h.FindTransaction)
}

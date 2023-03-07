package routes

import "github.com/labstack/echo/v4"

func Routes(e *echo.Group) {
	ProductRoutes(e)
	UserRoutes(e)
	ProfileRoutes(e)
	AuthRoutes(e)
	CartRoutes(e)
	TransactionRoutes(e)
}

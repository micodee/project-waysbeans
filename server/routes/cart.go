package routes

import (
	"waysbeans/controllers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

func CartRoutes(e *echo.Group) {
	cartRepository := repositories.RepositoryCart(mysql.ConnDB)
	productRepository := repositories.RepositoryProduct(mysql.ConnDB)
	h := controllers.ControlCart(cartRepository, productRepository)

	e.GET("/cart", h.FindCarts)
	e.GET("/cart/:id", h.GetCart)
	e.PATCH("/cart/:product_id", middleware.Auth(h.CreateCart))
	e.DELETE("/cart/:id", h.DeleteCart)
	e.PATCH("/increase-order-quantity/:id", middleware.Auth(h.IncreaseOrderQuntity))
	e.PATCH("/decrease-order-quantity/:id", middleware.Auth(h.DecreaseOrderQuntity))
}

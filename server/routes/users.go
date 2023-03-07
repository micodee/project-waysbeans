package routes

import (
	"waysbeans/controllers"
	"waysbeans/pkg/middleware"
	"waysbeans/pkg/mysql"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.ConnDB)
	AuthRepository := repositories.RepositoryAuth(mysql.ConnDB)
	h := controllers.ControlUser(userRepository, AuthRepository)

	e.GET("/users", middleware.Auth(middleware.Admin(h.FindUsers)))
	e.GET("/user/:id", middleware.Auth(middleware.Admin(h.GetUser)))
	e.PATCH("/user", middleware.Auth(h.UpdateUser))
	e.DELETE("/user/:id", middleware.Auth(middleware.Admin(h.DeleteUser)))
}

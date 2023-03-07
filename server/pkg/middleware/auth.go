package middleware

import (
	"net/http"
	"strings"
	"waysbeans/dto/result"
	jwtToken "waysbeans/pkg/jwt"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// Declare Result struct here ...
type Result struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

// Create Auth function here ...
func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")

		if token == "" {
			return c.JSON(http.StatusUnauthorized, result.ErrorResult{Status: http.StatusBadRequest, Message: "unauthorized"})
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, Result{Code: http.StatusUnauthorized, Message: "unathorized"})
		}

		c.Set("userLogin", claims)
		return next(c)
	}
}

// create admin function
func Admin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		userRole := c.Get("userLogin").(jwt.MapClaims)["role"].(string)

		if userRole != "admin" {
			return c.JSON(http.StatusUnauthorized, result.ErrorResult{Status: http.StatusOK, Message: "Forbidden, just admin"})
		}
		return next(c)
	}
}

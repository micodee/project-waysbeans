package middleware

import (
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var method = c.Request().Method
		file, err := c.FormFile("photo")

		if err != nil {
			if method == "PATCH" && err.Error() == "http: no such file" {
				c.Set("dataFile", "")
				return next(c)
			}
		}
		if err != nil {
			if method == "POST" && err.Error() == "http: no such file" {
				c.Set("dataFile", "")
				return next(c)
			}
		}
		
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		src, err := file.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer src.Close()

		tempFile, err := ioutil.TempFile("uploads", "image-*.png")
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer tempFile.Close()

		if _, err = io.Copy(tempFile, src); err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		data := tempFile.Name()

		c.Set("dataFile", data)
		return next(c)
	}
}

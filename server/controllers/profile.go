package controllers

import (
	"net/http"
	"strconv"
	"waysbeans/dto"
	"waysbeans/dto/result"
	"waysbeans/models"
	"waysbeans/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUCT
type profileControl struct {
	ProfileRepository repositories.ProfileRepository
}

// SETUP CONTROL FUNCTION
func ControlProfile(ProfileRepository repositories.ProfileRepository) *profileControl {
	return &profileControl{ProfileRepository}
}

// FUNCTION FIND PROFILE
func (h *profileControl) FindProfile(c echo.Context) error {
	profile, err := h.ProfileRepository.FindProfile()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: profile})
}

// FUNCTION GET PROFILE BY ID
func (h *profileControl) GetProfile(c echo.Context) error {
	// get url param ID
	id, _ := strconv.Atoi(c.Param("id"))

	// repository get profile
	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProfile(profile)})
}

// FUNCTION CREATE PROFILE
func (h *profileControl) CreateProfile(c echo.Context) error {
	// get request
	request := dto.CreateProfileRequest{
		Phone:   c.FormValue("phone"),
		Address: c.FormValue("address"),
	}

	// validate request input
	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// get user FROM JWT TOKEN
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	// submit TO DATABASE tb PROFILE
	profile := models.Profile{
		Phone:   request.Phone,
		Address: request.Address,
		UserID:  int(userId),
	}

	// run REPOSITORY create profile
	data, err := h.ProfileRepository.CreateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProfile(data)})
}

// FUNCTION UPDATE PROFILE
func (h *profileControl) UpdateProfile(c echo.Context) error {
	// get request
	request := dto.UpdateProfileRequest{
		Phone:   c.FormValue("phone"),
		Address: c.FormValue("address"),
	}

	// get user FROM JWT TOKEN
	userId := c.Get("userLogin").(jwt.MapClaims)["id"].(float64)

	// run REPOSITORY get profile
	profile, err := h.ProfileRepository.GetProfile(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}

	// check update value
	if request.Phone != "" {
		profile.Phone = request.Phone
	}

	if request.Address != "" {
		profile.Address = request.Address
	}

	// run REPOSITORY update profile
	data, err := h.ProfileRepository.UpdateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, result.ErrorResult{Status: http.StatusInternalServerError, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: convProfile(data)})
}

func convProfile(u models.Profile) dto.ProfileResponse {
	return dto.ProfileResponse{
		ID:      u.ID,
		Phone:   u.Phone,
		Address: u.Address,
		UserID:  u.UserID,
		User:    u.User,
	}
}

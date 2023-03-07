package controllers

import (
	"net/http"
	"waysbeans/dto/result"
	"waysbeans/repositories"

	"github.com/labstack/echo/v4"
)

// SETUP CONTROL STRUCT
type transactionControl struct {
	TransactionRepository repositories.TransactionRepository
}

// SETUP CONTROL FUNCTION
func ControlTransaction(TransactionRepository repositories.TransactionRepository) *transactionControl {
	return &transactionControl{TransactionRepository}
}

// FUNCTION FIND TRANSACTIONS
func (h *transactionControl) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, result.ErrorResult{Status: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, result.SuccessResult{Status: http.StatusOK, Data: transaction})
}

package dto

type TransactionRequest struct {
	UserID        int           `json:"user_id"`
	Name          string        `json:"name"`
	Email         string        `json:"email"`
	Phone         string        `json:"phone"`
	Address       string        `json:"address"`
	TotalQuantity int           `json:"total_quantity"`
	TotalPrice    int           `json:"total_price"`
	Status        string        `json:"status"`
}

type TransactionResponse struct {
	ID            int           `json:"id"`
	UserID        int           `json:"user_id"`
	TotalQuantity int           `json:"total_quantity"`
	TotalPrice    int           `json:"total_price"`
}

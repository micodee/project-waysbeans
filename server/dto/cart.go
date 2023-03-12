package dto

type CartRequest struct {
	ProductID int `json:"product_id" gorm:"type: int"`
	OrderQty  int `json:"order_quantity" gorm:"type: int" validate:"required"`
	UserID    int `json:"user_id"`
}

type UpdateCartRequest struct {
	OrderQty int `json:"order_quantity"`
}

type CartResponse struct {
	ID        int `json:"id"`
	ProductID int `json:"product_id" gorm:"type: int"`
	OrderQty  int `json:"order_quantity" gorm:"type: int"`
	Subtotal  int `json:"subtotal"`
	UserID    int `json:"user_id"`
}

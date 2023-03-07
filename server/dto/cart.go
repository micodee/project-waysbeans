package dto

type CartRequest struct {
	ProductID int `json:"product_id" gorm:"type: int"`
	OrderQty  int `json:"order_quantity" gorm:"type: int" validate:"required"`
	UserID    int `json:"user_id"`
}

type CartResponse struct {
	ProductID int `json:"product_id" gorm:"type: int"`
	OrderQty  int `json:"order_quantity" gorm:"type: int"`
	UserID    int `json:"user_id"`
}

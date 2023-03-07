package models

import "time"

type Cart struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	UserID    int           `json:"user_id"`
	User      UsersRelation `json:"user"`
	ProductID int           `json:"product_id" gorm:"type: int"`
	Product   ProductToCart `json:"product"`
	OrderQty  int           `json:"order_qty" gorm:"type: int"`
	CreatedAt time.Time     `json:"-"`
	UpdatedAt time.Time     `json:"-"`
}

type CartToUser struct {
	ProductID int `json:"product_id" gorm:"type: int"`
	OrderQty  int `json:"order_qty" gorm:"type: int"`
	UserID    int `json:"-"`
}

type CartToProduct struct {
	ProductID int `json:"-"`
	OrderQty  int `json:"order_qty" gorm:"type: int"`
	UserID    int `json:"user_id"`
}

func (CartToUser) TableName() string {
	return "carts"
}

func (CartToProduct) TableName() string {
	return "carts"
}

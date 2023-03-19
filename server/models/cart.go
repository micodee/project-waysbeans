package models

import "time"

type Cart struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	UserID    int           `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	User      UsersRelation `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ProductID int           `json:"product_id" gorm:"type: int" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Product   ProductToCart `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OrderQty  int           `json:"order_qty" gorm:"type: int"`
	Subtotal  int           `json:"subtotal" gorm:"type: int"`
	CreatedAt time.Time     `json:"-"`
	UpdatedAt time.Time     `json:"-"`
}

type CartToUser struct {
	ProductID int `json:"product_id"`
	OrderQty  int `json:"order_qty"`
	Subtotal  int `json:"subtotal"`
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

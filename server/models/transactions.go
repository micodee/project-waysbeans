package models

import "time"

type Transaction struct {
	ID            int                 `json:"id" gorm:"primary_key: auto_increment"`
	UserID        int                 `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	User          UsersRelation       `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Name          string              `json:"name" form:"name" gorm:"type: varchar(50)"`
	Email         string              `json:"email" gorm:"type: varchar(50)"`
	Phone         string              `json:"phone" form:"phone" gorm:"type: varchar(50)"`
	Address       string              `json:"address" form:"address" gorm:"type : text"`
	Status        string              `json:"status" gorm:"type: varchar(25)"`
	TotalQuantity int                 `json:"total_quantity" gorm:"type: int"`
	TotalPrice    int                 `json:"total_price" gorm:"type: int"`
	Cart          []CartToTransaction `json:"cart" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt     time.Time           `json:"created_at"`
	UpdatedAt     time.Time           `json:"updated_at"`
}

type CartToTransaction struct {
	ID            int    `json:"id" gorm:"primary_key: auto_increment"`
	ProductID     int    `json:"product_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ProductName   string `json:"product_name"`
	ProductPhoto  string `json:"product_photo"`
	ProductPrice  int    `json:"product_price"`
	OrderQuantity int    `json:"order_quantity"`
	TransactionID int    `json:"-"`
}

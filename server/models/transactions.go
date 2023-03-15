package models

import "time"

type Transaction struct {
	ID            int                 `json:"id" gorm:"primary_key: auto_increment"`
	UserID        int                 `json:"user_id"`
	User          UsersRelation       `json:"user"`
	Name          string              `json:"name" form:"name" gorm:"type: varchar(50)"`
	Email         string              `json:"email" gorm:"type: varchar(50)"`
	Phone         string              `json:"phone" form:"phone" gorm:"type: varchar(50)"`
	Address       string              `json:"address" form:"address" gorm:"type : text"`
	Status        string              `json:"status" gorm:"type: varchar(25)"`
	TotalQuantity int                 `json:"total_quantity" gorm:"type: int"`
	TotalPrice    int                 `json:"total_price" gorm:"type: int"`
	Cart          []CartToTransaction `json:"cart"`
	CreatedAt     time.Time           `json:"-"`
	UpdatedAt     time.Time           `json:"-"`
}

type CartToTransaction struct {
	ProductID     int    `json:"product_id"`
	ProductName   string `json:"product_name"`
	ProductPhoto  string `json:"product_photo"`
	ProductPrice  int    `json:"product_price"`
	OrderQuantity int    `json:"order_quantity"`
	TransactionID int    `json:"-"`
}

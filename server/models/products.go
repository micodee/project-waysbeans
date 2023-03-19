package models

import "time"

type Product struct {
	ID          int             `json:"id"`
	Name        string          `json:"name" gorm:"type: varchar(255)"`
	Description string          `json:"description" gorm:"type: varchar(255)"`
	Price       int             `json:"price" gorm:"type: int"`
	Stock       int             `json:"stock" gorm:"type: int"`
	Photo       string          `json:"photo" gorm:"type: varchar(255)"`
	UserID      int             `json:"user_id" form:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	User        UsersRelation   `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Cart        []CartToProduct `json:"cart" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

type ProductToUser struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Price       int    `json:"price"`
	Description string `json:"description"`
	Stock       int    `json:"stock"`
	Photo       string `json:"photo"`
	UserID      int    `json:"-"`
}

type ProductToCart struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Stock int    `json:"stock"`
	Photo string `json:"photo"`
}

func (ProductToUser) TableName() string {
	return "products"
}

func (ProductToCart) TableName() string {
	return "products"
}

package dto

import "waysbeans/models"

type ProductResponse struct {
	ID            int                  `json:"id" gorm:"primary_key:auto_increment"`
	Name          string               `json:"name"`
	Price         int                  `json:"price"`
	Description   string               `json:"description"`
	Stock         int                  `json:"stock"`
	Photo         string               `json:"photo"`
	PhotoPublicID string               `json:"image_public_id"`
	UserID        int                  `json:"-"`
	User          models.UsersRelation `json:"user"`
}

type CreateProductRequest struct {
	Name        string `json:"name" form:"name" validate:"required"`
	Price       int    `json:"price" form:"price" validate:"required"`
	Description string `json:"description" form:"desc" validate:"required"`
	Stock       int    `json:"stock" form:"stock" validate:"required"`
	Photo       string `json:"photo" form:"photo" validate:"required"`
}

type UpdateProductRequest struct {
	Name        string `json:"name" form:"name"`
	Price       int    `json:"price" form:"price"`
	Description string `json:"description" form:"desc"`
	Stock       int    `json:"stock" form:"stock"`
	Photo       string `json:"photo" form:"photo"`
}

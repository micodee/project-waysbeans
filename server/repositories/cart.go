package repositories

import (
	"waysbeans/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCart() ([]models.Cart, error)
	GetCart(ID int) (models.Cart, error)
	CreateCart(cart models.Cart, ID int) (models.Cart, error)
	DeleteCart(cart models.Cart, ID int) (models.Cart, error)
	DelCart(cart models.Cart) (models.Cart, error)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCart() ([]models.Cart, error) {
	var cart []models.Cart
	err := r.db.Preload("User").Preload("Product").Find(&cart).Error
	return cart, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Preload("User").Preload("Product").First(&cart, ID).Error
	return cart, err
}

func (r *repository) CreateCart(cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Save(&cart).Error
	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart, ID int) (models.Cart, error) {
	err := r.db.Delete(&cart).Error
	return cart, err
}

func (r *repository) DelCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Delete(&cart).Scan(&cart).Error
	return cart, err
}
package repositories

import (
	"waysbeans/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	FindProfile() ([]models.Profile, error)
	GetProfile(ID int) (models.Profile, error)
	CreateProfile(profile models.Profile) (models.Profile, error)
	UpdateProfile(profile models.Profile) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

// FIND PROFILE * DATABASE
func (r *repository) FindProfile() ([]models.Profile, error) {
	var profile []models.Profile
	err := r.db.Preload("User").Find(&profile).Error
	return profile, err
}

// GET PROFILE ID * DATABASE
func (r *repository) GetProfile(ID int) (models.Profile, error) {
	var profile models.Profile
	err := r.db.Preload("User").First(&profile, ID).Error
	return profile, err
}

// CREATE PROFILE TO DATABASE
func (r *repository) CreateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Create(&profile).Error
	return profile, err
}

// UPDATE PROFILE * DATABASE
func (r *repository) UpdateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Save(&profile).Error
	return profile, err
}
package models

import "time"

// CREATE TB PROFILE
type Profile struct {
	ID        int           `json:"id" gorm:"primary_key:auto_increment"`
	Phone     string        `json:"phone" gorm:"type: varchar(255)"`
	Address   string        `json:"address" gorm:"type: text"`
	UserID    int           `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	User      UsersRelation `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt time.Time     `json:"-"`
	UpdatedAt time.Time     `json:"-"`
}

// for association relation with another table (user)
type ProfileToUser struct {
	Phone   string `json:"phone"`
	Address string `json:"address"`
	UserID  int    `json:"-"`
}

func (ProfileToUser) TableName() string {
	return "profiles"
}

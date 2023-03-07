package models

import "time"

type User struct {
	ID        int             `json:"id"`
	Name      string          `json:"fullname" gorm:"type: varchar(255)"`
	Email     string          `json:"email" gorm:"type: varchar(255)"`
	Password  string          `json:"password" gorm:"type: varchar(255)"`
	Role      string          `json:"role" gorm:"type: varchar(255)"`
	Profile   ProfileToUser   `json:"profile" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Products  []ProductToUser `json:"products"`
	Cart      []CartToUser    `json:"cart"`
	CreatedAt time.Time       `json:"-"`
	UpdatedAt time.Time       `json:"-"`
}

// Associated with (Profile, Cart, Transaction)
type UsersRelation struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func (UsersRelation) TableName() string {
	return "users"
}

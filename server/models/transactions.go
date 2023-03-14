package models

import "time"

type Transaction struct {
	ID       int           `json:"id" gorm:"primary_key: auto_increment"`
	UserID   int           `json:"user_id"`
	User     UsersRelation `json:"user"`
	Name     string        `json:"name" form:"name" gorm:"type: varchar(50)"`
	Email    string        `json:"email" gorm:"type: varchar(50)"`
	Phone    string        `json:"phone" form:"phone" gorm:"type: varchar(50)"`
	Address  string        `json:"address" form:"address" gorm:"type : text"`
	Status   string        `json:"status" gorm:"type: varchar(25)"`
	Total    int           `json:"total" gorm:"type: int"`
	CreateAt time.Time     `json:"-"`
	UpdateAt time.Time     `json:"-"`
}

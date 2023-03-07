package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var ConnDB *gorm.DB

func DatabaseInit() {
	var err error
	DBurl := "admin:admin@tcp(localhost:3306)/waysbeans?charset=utf8mb4&parseTime=True&loc=Local"
	ConnDB, err = gorm.Open(mysql.Open(DBurl), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to Database")
}
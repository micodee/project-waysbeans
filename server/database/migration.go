package database

import (
	"waysbeans/models"
	"waysbeans/pkg/mysql"
	"fmt"
)

func RunMigration() {
	err := mysql.ConnDB.AutoMigrate(
		&models.Product{},
		&models.User{},
		&models.Profile{},
		&models.Cart{},
		&models.Transaction{},
		&models.CartToTransaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}

	fmt.Println("Migration Success")
}
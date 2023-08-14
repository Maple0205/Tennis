package model

import "github.com/jinzhu/gorm"

type Account struct {
	gorm.Model
	Email   string `gorm:"type:varchar(100);unique"`
	Balance float64
}

package model

import "github.com/jinzhu/gorm"

type Address struct {
	gorm.Model
	Suburb          string `gorm:"not null"`
	DetailedAddress string
}

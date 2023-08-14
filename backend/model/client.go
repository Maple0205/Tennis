package model

import "github.com/jinzhu/gorm"

type Client struct {
	gorm.Model
	Email string `gorm:"unique"`
	Aid   uint
	Name  string `gorm:"not null"`
	Phone string `gorm:"not null"`
	Level int    `gorm:"not null"`
}

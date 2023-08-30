package model

import "github.com/jinzhu/gorm"

type Teacher struct {
	gorm.Model
	Email  string `gorm:"unique"`
	Name   string `gorm:"not null"`
	Phone  string
	Remark string
}

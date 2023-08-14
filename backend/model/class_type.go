package model

import "github.com/jinzhu/gorm"

type ClassType struct {
	gorm.Model
	TypeName string `gorm:"type:varchar(100);unique"`
	Rate     int    `gorm:"type:int"`
}

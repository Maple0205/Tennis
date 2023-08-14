package model

import "github.com/jinzhu/gorm"

type Record struct {
	gorm.Model
	Date      string  `json:"date"`
	Name      string  `json:"name"`
	ClassType string  `json:"class_type"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Hours     float64 `json:"hours"`
	Rate      int     `json:"rate"`
	Fee       float64 `json:"fee"`
	Recharge  int     `json:"recharge"`
	Bonus     int     `json:"bonus"`
	Balance   float64 `json:"balance"`
	AccountID uint    `json:"account_id"`
	Remark    string  `json:"remark"`
}

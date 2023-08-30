package model

import "github.com/jinzhu/gorm"

type Course struct {
	gorm.Model
	Date             string `json:"date"`
	Day              string `json:"day"`
	Address          string `json:"address"`
	CourtID          uint   `json:"court_id"`
	ClassType        string `json:"class_type"`
	StartTime        string `json:"start_time"`
	EndTime          string `json:"end_time"`
	Capacity         int    `json:"capacity"`
	TeacherID        uint   `json:"teacher_id"`
	TeacherName      string `json:"teacher_name"`
	NumberOfStudents int    `json:"number_of_students"`
	Remark           string `json:"remark"`
}

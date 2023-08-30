package serializer

import "tennis/model"

type Course struct {
	ID               uint   `json:"id" form:"id"`
	Date             string `json:"date" form:"date"`
	Day              string `json:"day" form:"day"`
	Address          string `json:"address" form:"address"`
	CourtID          uint   `json:"court_id" form:"court_id"`
	ClassType        string `json:"class_type" form:"class_type"`
	StartTime        string `json:"start_time" form:"start_time"`
	EndTime          string `json:"end_time" form:"end_time"`
	Capacity         int    `json:"capacity" form:"capacity"`
	TeacherID        uint   `json:"teacher_id" form:"teacher_id"`
	TeacherName      string `json:"teacher_name" form:"teacher_name"`
	NumberOfStudents int    `json:"number_of_students" form:"number_of_students"`
	Remark           string `json:"remark" form:"remark"`
}

func BuildCourse(item model.Course) Course {
	return Course{
		ID:               item.ID,
		Date:             item.Date,
		Day:              item.Day,
		Address:          item.Address,
		CourtID:          item.CourtID,
		ClassType:        item.ClassType,
		StartTime:        item.StartTime,
		EndTime:          item.EndTime,
		Capacity:         item.Capacity,
		TeacherID:        item.TeacherID,
		TeacherName:      item.TeacherName,
		NumberOfStudents: item.NumberOfStudents,
		Remark:           item.Remark,
	}
}

func BuildCourses(items []model.Course) (courses []Course) {
	for _, item := range items {
		course := BuildCourse(item)
		courses = append(courses, course)
	}
	return courses
}

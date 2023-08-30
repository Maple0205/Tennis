package service

import (
	"context"
	"fmt"
	"tennis/model"
	"tennis/serializer"
)

type CreateCourseService struct {
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

type ShowCourseService struct {
}

type ListCourseService struct {
	PageNum  int `json:"page_num" form:"page_num"`
	PageSize int `json:"page_size" form:"page_size"`
}

type UpdateCourseService struct {
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

type SearchCourseService struct {
	Info string `json:"info"`
	// PageNum  int    `json:"page_num" form:"page_num"`
	// PageSize int    `json:"page_size" form:"page_size"`
}

type DeleteCourseService struct {
}

func (service *CreateCourseService) Create() serializer.Response {
	code := 200
	course := model.Course{
		Date:             service.Date,
		Day:              service.Day,
		Address:          service.Address,
		CourtID:          service.CourtID,
		ClassType:        service.ClassType,
		StartTime:        service.StartTime,
		EndTime:          service.EndTime,
		Capacity:         service.Capacity,
		TeacherID:        service.TeacherID,
		TeacherName:      service.TeacherName,
		NumberOfStudents: service.NumberOfStudents,
		Remark:           service.Remark,
	}
	err := model.DB.Create(&course).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   course,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowCourseService) Show(tid uint) serializer.Response {
	var course model.Course
	code := 200
	err := model.DB.First(&course, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildCourse(course),
	}
}

func (service *ListCourseService) List() serializer.Response {
	var courses []model.Course
	count := 0
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	model.DB.Model(&model.Course{}).Preload("Course").Count(&count).
		Limit(service.PageSize).Offset((service.PageNum - 1) * service.PageSize).Find(&courses)
	return serializer.BuildListResponse(serializer.BuildCourses(courses), uint(count))
}

func (service *UpdateCourseService) Update(tid string) serializer.Response {
	var course model.Course
	result := model.DB.First(&course, tid)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Course not found",
		}
	}

	// Update the course data
	model.DB.Model(&course).Where("id = ?", tid).Updates(map[string]interface{}{
		"date":               service.Date,
		"day":                service.Day,
		"address":            service.Address,
		"court_id":           service.CourtID,
		"class_type":         service.ClassType,
		"start_time":         service.StartTime,
		"end_time":           service.EndTime,
		"capacity":           service.Capacity,
		"teacher_id":         service.TeacherID,
		"teacher_name":       service.TeacherName,
		"number_of_students": service.NumberOfStudents,
		"remark":             service.Remark,
	})

	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildCourse(course),
		Msg:    "Update succeed!",
	}
}

func (service *SearchCourseService) Search(ctx context.Context, info string) serializer.Response {
	var courses []model.Course
	fmt.Println("info1: ", info)
	model.DB.Model(&model.Course{}).Where("day LIKE ? or address LIKE ?", "%"+info+"%", "%"+info+"%").Find(&courses)
	count := len(courses)
	return serializer.BuildListResponse(serializer.BuildCourses(courses), uint(count))
}

func (service *DeleteCourseService) Delete(tid uint) serializer.Response {
	var course model.Course
	code := 200
	err := model.DB.First(&course, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	model.DB.Delete(&course)
	return serializer.Response{
		Status: code,
		Msg:    "Delete succeed!",
	}
}

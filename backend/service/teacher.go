package service

import (
	"context"
	"fmt"
	"tennis/model"
	"tennis/serializer"
)

type CreateTeacherService struct {
	Email  string `json:"email" form:"email"`
	Name   string `json:"name" form:"name"`
	Phone  string `json:"phone" form:"phone"`
	Remark string `json:"remark" form:"remark"`
}

type ShowTeacherService struct {
}

type ListTeacherService struct {
	PageNum  int `json:"page_num" form:"page_num"`
	PageSize int `json:"page_size" form:"page_size"`
}

type UpdateTeacherService struct {
	Email  string `json:"email" form:"email"`
	Name   string `json:"name" form:"name"`
	Phone  string `json:"phone" form:"phone"`
	Remark string `json:"remark" form:"remark"`
}

type SearchTeacherService struct {
	Info string `json:"info"`
	// PageNum  int    `json:"page_num" form:"page_num"`
	// PageSize int    `json:"page_size" form:"page_size"`
}

type DeleteTeacherService struct {
}

func (service *CreateTeacherService) Create() serializer.Response {
	code := 200
	teacher := model.Teacher{
		Email:  service.Email,
		Name:   service.Name,
		Phone:  service.Phone,
		Remark: service.Remark,
	}
	err := model.DB.Create(&teacher).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   teacher,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowTeacherService) Show(tid uint) serializer.Response {
	var teacher model.Teacher
	code := 200
	err := model.DB.First(&teacher, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildTeacher(teacher),
	}
}

func (service *ListTeacherService) List() serializer.Response {
	var teachers []model.Teacher
	count := 0
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	model.DB.Model(&model.Teacher{}).Preload("Teacher").Count(&count).
		Limit(service.PageSize).Offset((service.PageNum - 1) * service.PageSize).Find(&teachers)
	return serializer.BuildListResponse(serializer.BuildTeachers(teachers), uint(count))
}

func (service *UpdateTeacherService) Update(tid string) serializer.Response {
	var teacher model.Teacher
	result := model.DB.First(&teacher, tid)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Teacher not found",
		}
	}

	// Update the teacher data
	model.DB.Model(&teacher).Where("id = ?", tid).Updates(map[string]interface{}{
		"email":  service.Email,
		"name":   service.Name,
		"phone":  service.Phone,
		"remark": service.Remark,
	})

	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildTeacher(teacher),
		Msg:    "Update succeed!",
	}
}

func (service *SearchTeacherService) Search(ctx context.Context, info string) serializer.Response {
	var teachers []model.Teacher
	fmt.Println("info1: ", info)
	model.DB.Model(&model.Teacher{}).Where("email LIKE ? or name LIKE ?", "%"+info+"%", "%"+info+"%").Find(&teachers)
	count := len(teachers)
	return serializer.BuildListResponse(serializer.BuildTeachers(teachers), uint(count))
}

func (service *DeleteTeacherService) Delete(tid uint) serializer.Response {
	var teacher model.Teacher
	code := 200
	err := model.DB.First(&teacher, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	model.DB.Delete(&teacher)
	return serializer.Response{
		Status: code,
		Msg:    "Delete succeed!",
	}
}

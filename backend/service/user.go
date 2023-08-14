package service

import (
	"tennis/model"
	"tennis/pkg/utils"
	"tennis/serializer"

	"github.com/jinzhu/gorm"
)

type UserService struct {
	UserName string `form:"user_name" json:"user_name" binding:"required,min=3,max=15"`
	Password string `form:"password" json:"password" binding:"required,min=5,max=16"`
}

type UpdateUserService struct {
	UserName    string `form:"user_name" json:"user_name" binding:"required,min=3,max=15"`
	Password    string `form:"password" json:"password" binding:"required,min=5,max=16"`
	NewPassword string `form:"new_password" json:"new_password" binding:"required,min=5,max=16"`
}

func (service *UserService) Register() serializer.Response {
	var user model.User
	var count int
	model.DB.Model(&model.User{}).Where("user_name=?", service.UserName).
		First(&user).Count(&count)
	if count == 1 {
		return serializer.Response{
			Status: 400,
			Msg:    "Existed username",
		}
	}
	user.UserName = service.UserName
	if err := user.SetPassword(service.Password); err != nil {
		return serializer.Response{
			Status: 400,
			Msg:    err.Error(),
		}
	}
	//创建用户
	if err := model.DB.Create(&user).Error; err != nil {
		return serializer.Response{
			Status: 500,
			Msg:    "Database implement failed!",
		}
	}
	return serializer.Response{
		Status: 200,
		Msg:    "User enrolment succeed!",
	}
}

func (service *UserService) Login() serializer.Response {
	var user model.User
	if err := model.DB.Model(&model.User{}).Where("user_name=?", service.UserName).
		First(&user).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return serializer.Response{
				Status: 400,
				Msg:    "Username is not existed!",
			}
		}
		return serializer.Response{
			Status: 500,
			Msg:    "Server is not connected!",
		}
	}
	user.UserName = service.UserName
	if res := user.CheckPassword(service.Password); !res {
		return serializer.Response{
			Status: 400,
			Msg:    "Password is not correct!",
		}
	}
	token, err := utils.GenerateToken(user.ID, service.UserName, service.Password)
	if err != nil {
		return serializer.Response{
			Status: 500,
			Msg:    "Token generation failed!",
		}
	}
	return serializer.Response{
		Status: 200,
		Data: serializer.TokenData{
			User:  serializer.BuildUser(user),
			Token: token,
		},
		Msg: "User login succeed!",
	}
}

func (service *UpdateUserService) Update(id uint) serializer.Response {
	var user model.User
	if err := model.DB.Model(&model.User{}).Where("id=?", id).
		First(&user).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return serializer.Response{
				Status: 400,
				Msg:    "User is not existed!",
			}
		}
		return serializer.Response{
			Status: 500,
			Msg:    "Server is not connected!",
		}
	}
	if res := user.CheckPassword(service.Password); !res {
		return serializer.Response{
			Status: 400,
			Msg:    "Password is not correct!",
		}
	}
	user.UserName = service.UserName
	if err := user.SetPassword(service.NewPassword); err != nil {
		return serializer.Response{
			Status: 400,
			Msg:    "Set password failed!",
		}
	}
	if err := model.DB.Save(&user).Error; err != nil {
		return serializer.Response{
			Status: 500,
			Msg:    "Database implement failed!",
		}
	}
	return serializer.Response{
		Status: 200,
		Msg:    "User update succeed!",
	}
}

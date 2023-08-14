package service

import (
	"tennis/model"
	"tennis/serializer"
)

type CreateClassTypeService struct {
	TypeName string `json:"type_name"`
	Rate     int    `json:"rate"`
}

type ListClassTypeService struct {
}

type UpdateClassTypeService struct {
	Id       uint   `json:"id"`
	TypeName string `json:"type_name"`
	Rate     int    `json:"rate"`
}

func (service *CreateClassTypeService) Create() serializer.Response {
	code := 200
	class_type := model.ClassType{
		TypeName: service.TypeName,
		Rate:     service.Rate,
	}
	err := model.DB.Create(&class_type).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   class_type,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ListClassTypeService) List() serializer.Response {
	var class_types []model.ClassType
	model.DB.Model(&model.ClassType{}).Find(&class_types)
	count := len(class_types)
	return serializer.BuildListResponse(serializer.BuildClassTypes(class_types), uint(count))
}

func (service *UpdateClassTypeService) Update(cId uint) serializer.Response {
	var class_type model.ClassType
	result := model.DB.First(&class_type, cId)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Class type not found",
		}
	}
	model.DB.Model(&class_type).Where("id = ?", cId).Updates(map[string]interface{}{
		"type_name": service.TypeName,
		"rate":      service.Rate,
	})
	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildClassType(class_type),
		Msg:    "Update succeed!",
	}
}

func (service *ListClassTypeService) Delete(cId uint) serializer.Response {
	var class_type model.ClassType
	result := model.DB.First(&class_type, cId)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Class type not found",
		}
	}
	model.DB.Delete(&class_type)
	return serializer.Response{
		Status: 200,
		Msg:    "Delete succeed!",
	}
}

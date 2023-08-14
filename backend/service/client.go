package service

import (
	"context"
	"fmt"
	"tennis/model"
	"tennis/serializer"
)

type CreateClientService struct {
	Email string `json:"email" form:"email"`
	Name  string `json:"name" form:"name"`
	Phone string `json:"phone" form:"phone"`
	Level int    `json:"level" form:"level"`
	Aid   uint   `json:"aid" form:"aid"`
}

type ShowClientService struct {
}

type ListClientService struct {
	PageNum  int `json:"page_num" form:"page_num"`
	PageSize int `json:"page_size" form:"page_size"`
}

type UpdateClientService struct {
	Email string `json:"email" form:"email"`
	Name  string `json:"name" form:"name"`
	Phone string `json:"phone" form:"phone"`
	Level int    `json:"level" form:"level"`
	Aid   uint   `json:"aid" form:"aid"`
}

type SearchClientService struct {
	Info string `json:"info"`
	// PageNum  int    `json:"page_num" form:"page_num"`
	// PageSize int    `json:"page_size" form:"page_size"`
}

type DeleteClientService struct {
}

func (service *CreateClientService) Create() serializer.Response {
	code := 200
	client := model.Client{
		Email: service.Email,
		Name:  service.Name,
		Phone: service.Phone,
		Level: service.Level,
		Aid:   service.Aid,
	}
	err := model.DB.Create(&client).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   client,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowClientService) Show(tid uint) serializer.Response {
	var client model.Client
	code := 200
	err := model.DB.First(&client, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildClient(client),
	}
}

func (service *ListClientService) List() serializer.Response {
	var clients []model.Client
	count := 0
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	model.DB.Model(&model.Client{}).Preload("Client").Count(&count).
		Limit(service.PageSize).Offset((service.PageNum - 1) * service.PageSize).Find(&clients)
	return serializer.BuildListResponse(serializer.BuildClients(clients), uint(count))
}

func (service *UpdateClientService) Update(tid string) serializer.Response {
	var client model.Client
	result := model.DB.First(&client, tid)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Client not found",
		}
	}

	// Update the client data
	model.DB.Model(&client).Where("id = ?", tid).Updates(map[string]interface{}{
		"email": service.Email,
		"name":  service.Name,
		"phone": service.Phone,
		"level": service.Level,
		"aid":   service.Aid,
	})

	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildClient(client),
		Msg:    "Update succeed!",
	}
}

func (service *SearchClientService) Search(ctx context.Context, info string) serializer.Response {
	var clients []model.Client
	fmt.Println("info1: ", info)
	model.DB.Model(&model.Client{}).Where("email LIKE ? or name LIKE ?", "%"+info+"%", "%"+info+"%").Find(&clients)
	count := len(clients)
	return serializer.BuildListResponse(serializer.BuildClients(clients), uint(count))
}

func (service *DeleteClientService) Delete(tid uint) serializer.Response {
	var client model.Client
	code := 200
	err := model.DB.First(&client, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	model.DB.Delete(&client)
	return serializer.Response{
		Status: code,
		Msg:    "Delete succeed!",
	}
}

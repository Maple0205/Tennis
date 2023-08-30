package service

import (
	"context"
	"fmt"
	"tennis/model"
	"tennis/serializer"
)

type CreateAddressService struct {
	Suburb          string `json:"suburb" form:"suburb"`
	DetailedAddress string `json:"detailed_address" form:"detailed_address"`
}

type ShowAddressService struct {
}

type ListAddressService struct {
	PageNum  int `json:"page_num" form:"page_num"`
	PageSize int `json:"page_size" form:"page_size"`
}

type UpdateAddressService struct {
	Suburb          string `json:"suburb" form:"suburb"`
	DetailedAddress string `json:"detailed_address" form:"detailed_address"`
}

type SearchAddressService struct {
	Info string `json:"info"`
	// PageNum  int    `json:"page_num" form:"page_num"`
	// PageSize int    `json:"page_size" form:"page_size"`
}

type DeleteAddressService struct {
}

func (service *CreateAddressService) Create() serializer.Response {
	code := 200
	address := model.Address{
		Suburb:          service.Suburb,
		DetailedAddress: service.DetailedAddress,
	}
	err := model.DB.Create(&address).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   address,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowAddressService) Show(tid uint) serializer.Response {
	var address model.Address
	code := 200
	err := model.DB.First(&address, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildAddress(address),
	}
}

func (service *ListAddressService) List() serializer.Response {
	var addresses []model.Address
	count := 0
	if service.PageSize == 0 {
		service.PageSize = 15
	}
	model.DB.Model(&model.Address{}).Preload("Address").Count(&count).
		Limit(service.PageSize).Offset((service.PageNum - 1) * service.PageSize).Find(&addresses)
	return serializer.BuildListResponse(serializer.BuildAddresses(addresses), uint(count))
}

func (service *UpdateAddressService) Update(tid string) serializer.Response {
	var address model.Address
	result := model.DB.First(&address, tid)
	if result.Error != nil {
		return serializer.Response{
			Status: 404,
			Msg:    "Address not found",
		}
	}

	// Update the address data
	model.DB.Model(&address).Where("id = ?", tid).Updates(map[string]interface{}{
		"suburb":           service.Suburb,
		"detailed_address": service.DetailedAddress,
	})

	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildAddress(address),
		Msg:    "Update succeed!",
	}
}

func (service *SearchAddressService) Search(ctx context.Context, info string) serializer.Response {
	var addresses []model.Address
	fmt.Println("info1: ", info)
	model.DB.Model(&model.Address{}).Where("suburb LIKE ? or detailed_address LIKE ?", "%"+info+"%", "%"+info+"%").Find(&addresses)
	count := len(addresses)
	return serializer.BuildListResponse(serializer.BuildAddresses(addresses), uint(count))
}

func (service *DeleteAddressService) Delete(tid uint) serializer.Response {
	var address model.Address
	code := 200
	err := model.DB.First(&address, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	model.DB.Delete(&address)
	return serializer.Response{
		Status: code,
		Msg:    "Delete succeed!",
	}
}

package service

import (
	"context"
	"fmt"
	"tennis/model"
	"tennis/serializer"
)

type CreateAccountService struct {
	Balance float64 `json:"balance"`
	Email   string  `json:"email"`
}

type ShowAccountService struct {
}

type ListAccountService struct {
	PageNum  int `json:"page_num" form:"page_num"`
	PageSize int `json:"page_size" form:"page_size"`
}

type UpdateAccountService struct {
	Id      uint    `json:"id"`
	Balance float64 `json:"balance"`
	Email   string  `json:"email"`
}

type SearchAccountService struct {
	Info string `json:"info"`
	// PageNum  int    `json:"page_num" form:"page_num"`
	// PageSize int    `json:"page_size" form:"page_size"`
}

// type DeleteClientService struct {
// }

func (service *CreateAccountService) Create() serializer.Response {
	code := 200
	account := model.Account{
		Balance: service.Balance,
		Email:   service.Email,
	}
	err := model.DB.Create(&account).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	return serializer.Response{
		Data:   account,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowAccountService) Show(tid uint) serializer.Response {
	var account model.Account
	code := 200
	err := model.DB.First(&account, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildAccount(account),
	}
}

func (service *SearchAccountService) Search(ctx context.Context, info string) serializer.Response {
	var accounts []model.Account
	fmt.Println("info1: ", info)
	model.DB.Model(&model.Account{}).Where("email LIKE ? or id = ?", "%"+info+"%", info).Find(&accounts)
	count := len(accounts)
	return serializer.BuildListResponse(serializer.BuildAccounts(accounts), uint(count))
}

func (service *ShowAccountService) List() serializer.Response {
	var accounts []model.Account
	model.DB.Model(&model.Account{}).Find(&accounts)
	count := len(accounts)
	return serializer.BuildListResponse(serializer.BuildAccounts(accounts), uint(count))
}

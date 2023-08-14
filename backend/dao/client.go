package dao

import (
	"context"
	"fmt"
	"tennis/model"

	"gorm.io/gorm"
)

type ClientDao struct {
	*gorm.DB
}

func NewClientDao(ctx context.Context) ClientDao {
	return ClientDao{NewDBClient(ctx)}
}

func (dao *ClientDao) SearchClientsByInfo(info string) (clients []model.Client, err error) {
	fmt.Println("info2: ", info)
	if info == "" {
		return clients, nil
	}

	err = dao.DB.Model(&model.Client{}).Where("email LIKE ? or name LIKE ?", "%"+info+"%", "%"+info+"%").Find(&clients).Error
	return
}

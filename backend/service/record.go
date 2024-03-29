package service

import (
	"tennis/model"
	"tennis/serializer"
)

type CreateRecordService struct {
	Name      string  `json:"name"`
	Date      string  `json:"date"`
	ClassType string  `json:"class_type"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Rate      int     `json:"rate"`
	Recharge  int     `json:"recharge"`
	Bonus     int     `json:"bonus"`
	AccountID uint    `json:"account_id"`
	Remark    string  `json:"remark"`
	Fee       float64 `json:"fee"`
	Hours     float64 `json:"hours"`
}

type ShowRecordService struct {
}

type ListRecordService struct {
}

type UpdateRecordService struct {
	Name      string  `json:"name"`
	Date      string  `json:"date"`
	ClassType string  `json:"class_type"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Rate      int     `json:"rate"`
	Recharge  int     `json:"recharge"`
	Bonus     int     `json:"bonus"`
	AccountID uint    `json:"account_id"`
	Remark    string  `json:"remark"`
	Fee       float64 `json:"fee"`
	Hours     float64 `json:"hours"`
}

// type SearchRecordService struct {
// 	Info     string `json:"info" form:"info"`
// 	PageNum  int    `json:"page_num" form:"page_num"`
// 	PageSize int    `json:"page_size" form:"page_size"`
// }

// type DeleteRecordService struct {
// }

func (service *CreateRecordService) Create() serializer.Response {
	code := 200
	var account model.Account
	// Find the balance of the account with the specified ID
	err := model.DB.Model(&account).
		Where("id = ?", service.AccountID).
		Limit(1).
		Scan(&account).
		Error

	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}

	//calculate balance
	account.Balance = account.Balance + float64(service.Recharge) + float64(service.Bonus) - service.Fee
	record := model.Record{
		Date:      service.Date,
		Name:      service.Name,
		ClassType: service.ClassType,
		StartTime: service.StartTime,
		EndTime:   service.EndTime,
		Hours:     service.Hours,
		Rate:      service.Rate,
		Fee:       service.Fee,
		Recharge:  service.Recharge,
		Bonus:     service.Bonus,
		Balance:   account.Balance,
		AccountID: service.AccountID,
		Remark:    service.Remark,
	}
	err1 := model.DB.Create(&record).Error
	if err1 != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Creation failed!",
		}
	}
	//update balance
	err2 := model.DB.Model(&account).Update("balance", account.Balance).Error
	if err2 != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Update failed!",
		}
	}
	return serializer.Response{
		Data:   record,
		Status: code,
		Msg:    "Creation succeed!",
	}
}

func (service *ShowRecordService) Show(tid string) serializer.Response {
	var record model.Record
	code := 200
	err := model.DB.First(&record, tid).Error
	if err != nil {
		code = 500
		return serializer.Response{
			Status: code,
			Msg:    "Search failed!",
		}
	}
	return serializer.Response{
		Status: code,
		Data:   serializer.BuildRecord(record),
	}
}

func (service *ListRecordService) List(uid uint) serializer.Response {
	var records []model.Record
	model.DB.Model(&model.Record{}).Where("account_id = ?", uid).Find(&records)
	count := len(records)
	return serializer.BuildListResponse(serializer.BuildRecords(records), uint(count))
}

func (service *UpdateRecordService) Update(tid string) serializer.Response {
	var record model.Record
	model.DB.First(&record, tid)
	record.Name = service.Name
	record.Date = service.Date
	record.ClassType = service.ClassType
	record.StartTime = service.StartTime
	record.EndTime = service.EndTime
	record.Rate = service.Rate
	record.Recharge = service.Recharge
	record.Bonus = service.Bonus
	record.AccountID = service.AccountID
	record.Remark = service.Remark
	record.Fee = service.Fee
	record.Hours = service.Hours

	model.DB.Save(&record)
	return serializer.Response{
		Status: 200,
		Data:   serializer.BuildRecord(record),
		Msg:    "Update succeed!",
	}
}

// func (service *SearchTaskService) Search(uid uint) serializer.Response {
// 	var tasks []model.Task
// 	count := 0
// 	if service.PageSize == 0 {
// 		service.PageSize = 15
// 	}
// 	model.DB.Model(&model.Task{}).Preload("User").
// 		Where("title LIKE ? OR content LIKE ?", "%"+service.Info+"%", "%"+service.Info+"%").
// 		Count(&count).Limit(service.PageSize).Offset((service.PageNum - 1) * service.PageSize).Find(&tasks)
// 	return serializer.BuildListResponse(serializer.BuildTasks(tasks), uint(count))
// }

// func (service *DeleteTaskService) Delete(tid string) serializer.Response {
// 	var task model.Task
// 	code := 200
// 	err := model.DB.First(&task, tid).Error
// 	if err != nil {
// 		code = 500
// 		return serializer.Response{
// 			Status: code,
// 			Msg:    "Search failed!",
// 		}
// 	}
// 	model.DB.Delete(&task)
// 	return serializer.Response{
// 		Status: code,
// 		Msg:    "Delete succeed!",
// 	}
// }

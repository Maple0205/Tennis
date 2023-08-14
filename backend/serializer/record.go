package serializer

import "tennis/model"

type Record struct {
	ID        uint    `json:"id" example:"1"`
	Date      string  `json:"date"`
	Name      string  `json:"name"`
	ClassType string  `json:"class_type"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Hours     float64 `json:"hours"`
	Rate      int     `json:"rate"`
	Fee       float64 `json:"fee"`
	Recharge  int     `json:"recharge"`
	Bonus     int     `json:"bonus"`
	Balance   float64 `json:"balance"`
	AccountID uint    `json:"account_id"`
	Remark    string  `json:"remark"`
}

func BuildRecord(item model.Record) Record {
	return Record{
		ID:        item.ID,
		Date:      item.Date,
		Name:      item.Name,
		ClassType: item.ClassType,
		StartTime: item.StartTime,
		EndTime:   item.EndTime,
		Hours:     item.Hours,
		Rate:      item.Rate,
		Fee:       item.Fee,
		Recharge:  item.Recharge,
		Bonus:     item.Bonus,
		Balance:   item.Balance,
		AccountID: item.AccountID,
		Remark:    item.Remark,
	}
}

func BuildRecords(items []model.Record) (records []Record) {
	for _, item := range items {
		record := BuildRecord(item)
		records = append(records, record)
	}
	return records
}

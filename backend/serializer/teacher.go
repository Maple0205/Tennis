package serializer

import "tennis/model"

type Teacher struct {
	ID     uint   `json:"id" form:"id"`
	Email  string `json:"email" form:"email"`
	Name   string `json:"name" form:"name"`
	Phone  string `json:"phone" form:"phone"`
	Remark string `json:"remark" form:"remark"`
}

func BuildTeacher(item model.Teacher) Teacher {
	return Teacher{
		ID:     item.ID,
		Email:  item.Email,
		Name:   item.Name,
		Phone:  item.Phone,
		Remark: item.Remark,
	}
}

func BuildTeachers(items []model.Teacher) (teachers []Teacher) {
	for _, item := range items {
		teacher := BuildTeacher(item)
		teachers = append(teachers, teacher)
	}
	return teachers
}

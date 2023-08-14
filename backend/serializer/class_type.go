package serializer

import "tennis/model"

type ClassType struct {
	ID       uint   `json:"id"`
	TypeName string `json:"type_name"`
	Rate     int    `json:"rate"`
}

func BuildClassType(item model.ClassType) ClassType {
	return ClassType{
		ID:       item.ID,
		TypeName: item.TypeName,
		Rate:     item.Rate,
	}
}

func BuildClassTypes(items []model.ClassType) (class_types []ClassType) {
	for _, item := range items {
		class_type := BuildClassType(item)
		class_types = append(class_types, class_type)
	}
	return class_types
}

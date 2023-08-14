package serializer

import "tennis/model"

type Client struct {
	ID    uint   `json:"id" form:"id"`
	Email string `json:"email" form:"email"`
	Name  string `json:"name" form:"name"`
	Phone string `json:"phone" form:"phone"`
	Level int    `json:"level" form:"level"`
	Aid   uint   `json:"aid" form:"aid"`
}

func BuildClient(item model.Client) Client {
	return Client{
		ID:    item.ID,
		Email: item.Email,
		Name:  item.Name,
		Phone: item.Phone,
		Level: item.Level,
		Aid:   item.Aid,
	}
}

func BuildClients(items []model.Client) (clients []Client) {
	for _, item := range items {
		client := BuildClient(item)
		clients = append(clients, client)
	}
	return clients
}

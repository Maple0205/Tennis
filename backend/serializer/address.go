package serializer

import "tennis/model"

type Address struct {
	ID              uint   `json:"id" form:"id"`
	Suburb          string `json:"suburb" form:"suburb"`
	DetailedAddress string `json:"detailed_address" form:"detailed_address"`
}

func BuildAddress(item model.Address) Address {
	return Address{
		ID:              item.ID,
		Suburb:          item.Suburb,
		DetailedAddress: item.DetailedAddress,
	}
}

func BuildAddresses(items []model.Address) (addresses []Address) {
	for _, item := range items {
		address := BuildAddress(item)
		addresses = append(addresses, address)
	}
	return addresses
}

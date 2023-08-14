package serializer

import "tennis/model"

type Account struct {
	ID      uint    `json:"id"`
	Balance float64 `json:"balance"`
	Email   string  `json:"email"`
}

func BuildAccount(item model.Account) Account {
	return Account{
		ID:      item.ID,
		Balance: item.Balance,
		Email:   item.Email,
	}
}

func BuildAccounts(items []model.Account) (accounts []Account) {
	for _, item := range items {
		account := BuildAccount(item)
		accounts = append(accounts, account)
	}
	return accounts
}

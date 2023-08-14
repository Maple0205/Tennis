package dao

import (
	"context"

	"gorm.io/gorm"
)

var (
	_db *gorm.DB
)

func NewDBClient(ctx context.Context) *gorm.DB {
	db := _db
	return db.WithContext(ctx)
}

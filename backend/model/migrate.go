package model

func migrate() {
	//自动迁移模式
	DB.Set("gorm:table options", "charset=utf8mb4").AutoMigrate(&User{}).AutoMigrate(&Task{}).AutoMigrate(&Account{}).AutoMigrate(&Client{}).AutoMigrate(&Record{}).AutoMigrate(&ClassType{})
	DB.Model(&Task{}).AddForeignKey("uid", "User(id)", "CASCADE", "CASCADE")
}

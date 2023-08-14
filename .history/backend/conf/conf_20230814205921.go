package conf

import (
	"fmt"
	"strings"
	"tennis/model"

	"gopkg.in/ini.v1"
)

var (
	AppMode     string
	HttpPort    string
	Db          string
	DB_HOST     string
	DB_PORT     string
	DB_USERNAME string
	DB_PASSWORD string
	DB_DBNAME   string
)

func Init() {
	file, err := ini.Load("./conf/config.ini")
	if err != nil {
		fmt.Println("Failed to read config file, please check the file path.")
	}
	LoadServer(file)
	LoadMysql(file)
	path := strings.Join([]string{DB_USERNAME, ":", DB_PASSWORD, "@tcp(", DB_HOST, ":", DB_PORT, ")/", DB_DBNAME, "?charset=utf8mb4&parseTime=true"}, "")
	model.Database(path)
}

func LoadServer(file *ini.File) {
	AppMode = file.Section("service").Key("AppMode").String()
	HttpPort = file.Section("service").Key("HttpPort").String()
}

func LoadMysql(file *ini.File) {
	Db = file.Section("mysql").Key("Db").String()
	DB_HOST = file.Section("mysql").Key("DB_HOST").String()
	DB_PORT = file.Section("mysql").Key("DB_PORT").String()
	DB_USERNAME = file.Section("mysql").Key("DB_USERNAME").String()
	DB_PASSWORD = file.Section("mysql").Key("DB_PASSWORD").String()
	DB_DBNAME = file.Section("mysql").Key("DB_DBNAME").String()
}

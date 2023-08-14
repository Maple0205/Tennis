package main

import (
	"tennis/conf"
	"tennis/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	conf.Init()
	r := routes.NewRouter()
	_ = r.Run(conf.HttpPort)
}

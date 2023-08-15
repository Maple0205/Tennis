package main

import (
	"fmt"
	"net/http"
	"os"
	"tennis/conf"
	"tennis/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	conf.Init()
	r := routes.NewRouter()
	_ = r.Run(conf.HttpPort)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // 默认端口号
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	http.ListenAndServe(":"+port, nil)
}

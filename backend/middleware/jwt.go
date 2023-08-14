package middleware

import (
	"tennis/pkg/utils"
	"time"

	"github.com/gin-gonic/gin"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		code := 200
		var err = ""
		//var data interface{}
		token := c.GetHeader("Authorization")
		if token == "" {
			code = 404
		} else {
			claim, err := utils.ParseToken(token)
			if err != nil {
				code = 403
			} else if time.Now().Unix() > claim.ExpiresAt {
				code = 401
			}
		}
		if code != 200 {
			c.JSON(200, gin.H{
				"Status": code,
				"msg":    "Token parse failed!",
				"err":    err,
				"token":  token,
			})
			c.Abort()
			return
		}
		//c.JSON(200, gin.H{
		//	"Status": code,
		//	"msg":    "Token parse yes",
		//})
		c.Next()
	}
}

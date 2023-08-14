package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
)

func UserRegister(c *gin.Context) {
	var userRegister service.UserService
	if err := c.ShouldBind(&userRegister); err == nil {
		res := userRegister.Register()
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func UserLogin(c *gin.Context) {
	var userLogin service.UserService
	if err := c.ShouldBind(&userLogin); err == nil {
		res := userLogin.Login()
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	uId, _ := strconv.Atoi(id)
	var updateUser service.UpdateUserService
	if err := c.ShouldBind(&updateUser); err == nil {
		res := updateUser.Update(uint(uId))
		c.JSON(200, res)
	} else {
		c.JSON(400, gin.H{"error": err.Error()})
	}
}

package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateAccount(c *gin.Context) {
	var createAccount service.CreateAccountService
	if err := c.ShouldBind(&createAccount); err == nil {
		res := createAccount.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ShowAccount(c *gin.Context) {
	var showAccount service.ShowAccountService
	id := c.Param("id")
	aId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&showAccount); err == nil {
		res := showAccount.Show(uint(aId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListAccount(c *gin.Context) {
	var listAccount service.ShowAccountService
	if err := c.ShouldBind(&listAccount); err == nil {
		res := listAccount.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

// func UpdateClient(c *gin.Context) {
// 	var updateClient service.UpdateClientService
// 	if err := c.ShouldBind(&updateClient); err == nil {
// 		res := updateClient.Update(c.Param("id"))
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

func SearchAccount(c *gin.Context) {
	var searchAccount service.SearchAccountService
	info := c.Param("info")
	if err := c.ShouldBind(&searchAccount); err == nil {
		res := searchAccount.Search(c.Request.Context(), info)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

// func DeleteClient(c *gin.Context) {
// 	var deleteClient service.DeleteClientService
// 	id := c.Param("id")
// 	cId, _ := strconv.Atoi(id)
// 	if err := c.ShouldBind(&deleteClient); err == nil {
// 		res := deleteClient.Delete(uint(cId))
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateClient(c *gin.Context) {
	var createClient service.CreateClientService
	if err := c.ShouldBind(&createClient); err == nil {
		res := createClient.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ShowClient(c *gin.Context) {
	var showClient service.ShowClientService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&showClient); err == nil {
		res := showClient.Show(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListClient(c *gin.Context) {
	var listClient service.ListClientService
	if err := c.ShouldBind(&listClient); err == nil {
		res := listClient.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func UpdateClient(c *gin.Context) {
	var updateClient service.UpdateClientService
	if err := c.ShouldBind(&updateClient); err == nil {
		res := updateClient.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func SearchClient(c *gin.Context) {
	var searchClient service.SearchClientService
	info := c.Param("info")
	if err := c.ShouldBind(&searchClient); err == nil {
		res := searchClient.Search(c.Request.Context(), info)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func DeleteClient(c *gin.Context) {
	var deleteClient service.DeleteClientService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&deleteClient); err == nil {
		res := deleteClient.Delete(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

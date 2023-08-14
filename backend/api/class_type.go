package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateClassType(c *gin.Context) {
	var createClassType service.CreateClassTypeService
	if err := c.ShouldBind(&createClassType); err == nil {
		res := createClassType.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListClassType(c *gin.Context) {
	var listClassType service.ListClassTypeService
	if err := c.ShouldBind(&listClassType); err == nil {
		res := listClassType.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func UpdateClassType(c *gin.Context) {
	var updateClassType service.UpdateClassTypeService
	if err := c.ShouldBind(&updateClassType); err == nil {
		id := c.Param("id")
		cId, _ := strconv.Atoi(id)
		res := updateClassType.Update(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func DeleteClassType(c *gin.Context) {
	var deleteClassType service.ListClassTypeService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&deleteClassType); err == nil {
		res := deleteClassType.Delete(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

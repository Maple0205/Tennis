package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateRecord(c *gin.Context) {
	var createRecord service.CreateRecordService
	if err := c.ShouldBind(&createRecord); err == nil {
		res := createRecord.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

// func ShowRecord(c *gin.Context) {
// 	var showRecord service.ShowRecordService
// 	if err := c.ShouldBind(&showRecord); err == nil {
// 		res := showRecord.Show(c.Param("id"))
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

func ListRecord(c *gin.Context) {
	var listRecord service.ListRecordService
	id := c.Param("id")
	aId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&listRecord); err == nil {
		res := listRecord.List(uint(aId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

// func UpdateTask(c *gin.Context) {
// 	var updateTask service.UpdateTaskService
// 	if err := c.ShouldBind(&updateTask); err == nil {
// 		res := updateTask.Update(c.Param("id"))
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

// func SearchTask(c *gin.Context) {
// 	var searchTask service.SearchTaskService
// 	claim, _ := utils.ParseToken(c.GetHeader("Authorization"))
// 	if err := c.ShouldBind(&searchTask); err == nil {
// 		res := searchTask.Search(claim.Id)
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

// func DeleteTask(c *gin.Context) {
// 	var deleteTask service.DeleteTaskService
// 	if err := c.ShouldBind(&deleteTask); err == nil {
// 		res := deleteTask.Delete(c.Param("id"))
// 		c.JSON(200, res)
// 	} else {
// 		logging.Error(err)
// 		c.JSON(400, err)
// 	}
// }

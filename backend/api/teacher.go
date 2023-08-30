package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateTeacher(c *gin.Context) {
	var createTeacher service.CreateTeacherService
	if err := c.ShouldBind(&createTeacher); err == nil {
		res := createTeacher.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ShowTeacher(c *gin.Context) {
	var showTeacher service.ShowTeacherService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&showTeacher); err == nil {
		res := showTeacher.Show(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListTeacher(c *gin.Context) {
	var listTeacher service.ListTeacherService
	if err := c.ShouldBind(&listTeacher); err == nil {
		res := listTeacher.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func UpdateTeacher(c *gin.Context) {
	var updateTeacher service.UpdateTeacherService
	if err := c.ShouldBind(&updateTeacher); err == nil {
		res := updateTeacher.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func SearchTeacher(c *gin.Context) {
	var searchTeacher service.SearchTeacherService
	info := c.Param("info")
	if err := c.ShouldBind(&searchTeacher); err == nil {
		res := searchTeacher.Search(c.Request.Context(), info)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func DeleteTeacher(c *gin.Context) {
	var deleteTeacher service.DeleteTeacherService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&deleteTeacher); err == nil {
		res := deleteTeacher.Delete(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

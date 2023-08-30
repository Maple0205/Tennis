package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateCourse(c *gin.Context) {
	var createCourse service.CreateCourseService
	if err := c.ShouldBind(&createCourse); err == nil {
		res := createCourse.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ShowCourse(c *gin.Context) {
	var showCourse service.ShowCourseService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&showCourse); err == nil {
		res := showCourse.Show(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListCourse(c *gin.Context) {
	var listCourse service.ListCourseService
	if err := c.ShouldBind(&listCourse); err == nil {
		res := listCourse.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func UpdateCourse(c *gin.Context) {
	var updateCourse service.UpdateCourseService
	if err := c.ShouldBind(&updateCourse); err == nil {
		res := updateCourse.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func SearchCourse(c *gin.Context) {
	var searchCourse service.SearchCourseService
	info := c.Param("info")
	if err := c.ShouldBind(&searchCourse); err == nil {
		res := searchCourse.Search(c.Request.Context(), info)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func DeleteCourse(c *gin.Context) {
	var deleteCourse service.DeleteCourseService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&deleteCourse); err == nil {
		res := deleteCourse.Delete(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

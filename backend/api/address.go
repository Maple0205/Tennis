package api

import (
	"strconv"
	"tennis/service"

	"github.com/gin-gonic/gin"
	logging "github.com/sirupsen/logrus"
)

func CreateAddress(c *gin.Context) {
	var createAddress service.CreateAddressService
	if err := c.ShouldBind(&createAddress); err == nil {
		res := createAddress.Create()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ShowAddress(c *gin.Context) {
	var showAddress service.ShowAddressService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&showAddress); err == nil {
		res := showAddress.Show(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func ListAddress(c *gin.Context) {
	var listAddress service.ListAddressService
	if err := c.ShouldBind(&listAddress); err == nil {
		res := listAddress.List()
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func UpdateAddress(c *gin.Context) {
	var updateAddress service.UpdateAddressService
	if err := c.ShouldBind(&updateAddress); err == nil {
		res := updateAddress.Update(c.Param("id"))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

func SearchAddress(c *gin.Context) {
	var searchAddress service.SearchAddressService
	info := c.Param("info")
	if err := c.ShouldBind(&searchAddress); err == nil {
		res := searchAddress.Search(c.Request.Context(), info)
		c.JSON(200, res)
	} else {
		c.JSON(400, err)
	}
}

func DeleteAddress(c *gin.Context) {
	var deleteAddress service.DeleteAddressService
	id := c.Param("id")
	cId, _ := strconv.Atoi(id)
	if err := c.ShouldBind(&deleteAddress); err == nil {
		res := deleteAddress.Delete(uint(cId))
		c.JSON(200, res)
	} else {
		logging.Error(err)
		c.JSON(400, err)
	}
}

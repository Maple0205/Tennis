package routes

import (
	"tennis/api"
	"tennis/middleware"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())
	store := cookie.NewStore([]byte("something-very-secret"))
	r.Use(sessions.Sessions("mysession", store))
	v1 := r.Group("api/v1")
	{
		v1.POST("user/register", api.UserRegister)
		v1.POST("user/login", api.UserLogin)
		authed := v1.Group("/")
		authed.Use(middleware.JWT())
		{
			// User
			authed.PUT("user/:id", api.UpdateUser)
			// Task
			authed.POST("task", api.CreateTask)
			authed.GET("task/:id", api.ShowTask)
			authed.GET("tasks", api.ListTask)
			authed.PUT("task/:id", api.UpdateTask)
			authed.POST("search", api.SearchTask)
			authed.DELETE("delete/:id", api.DeleteTask)

			// Client
			authed.POST("client", api.CreateClient)
			authed.GET("client/:id", api.ShowClient)
			authed.GET("clients", api.ListClient)
			authed.PUT("client/:id", api.UpdateClient)
			authed.GET("search_client/:info", api.SearchClient)
			authed.DELETE("delete_client/:id", api.DeleteClient)

			// Account
			authed.POST("account", api.CreateAccount)
			authed.GET("account_search/:info", api.SearchAccount)
			authed.GET("account", api.ListAccount)
			authed.GET("account/:id", api.ShowAccount)

			// Record
			authed.POST("record", api.CreateRecord)
			authed.GET("record/:id", api.ShowRecord)
			authed.GET("records/:id", api.ListRecord)
			authed.PUT("record/:id", api.UpdateRecord)

			//class_type
			authed.POST("class_type", api.CreateClassType)
			authed.GET("class_type", api.ListClassType)
			authed.DELETE("class_type/:id", api.DeleteClassType)
			authed.PUT("class_type/:id", api.UpdateClassType)

			//teacher
			authed.POST("teacher", api.CreateTeacher)
			authed.GET("teachers", api.ListTeacher)
			authed.DELETE("teacher/:id", api.DeleteTeacher)
			authed.PUT("teacher/:id", api.UpdateTeacher)
			authed.GET("teacher/:id", api.ShowTeacher)
			authed.POST("search_teacher/:info", api.SearchTeacher)

			//course
			authed.POST("course", api.CreateCourse)
			authed.GET("course/:id", api.ShowCourse)
			authed.GET("courses", api.ListCourse)
			authed.DELETE("course/:id", api.DeleteCourse)
			authed.PUT("course/:id", api.UpdateCourse)
			authed.POST("search_course/:info", api.SearchCourse)

		}
	}
	return r
}

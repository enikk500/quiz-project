package main

import (
	"fmt"

	"migproject/models"
	"migproject/utilities/endpoints"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&models.Score{},
		&models.User{},
		&models.Question{},
		&models.Competition{},
		&models.Option{})

	r := initializeEndpoints()
	r.Run(":8080")
}

func initializeEndpoints() *gin.Engine {
	r := gin.Default()

	r.GET("/", Index)

	r.POST("/signup/", Signup)
	r.POST("/login/", Login)
	r.GET("/users/", GetUsers)

	r.GET("/explore/", ExploreCompetitions)
	r.GET("/Competition/:competitionid", GetQuestions)

	r.POST("/create/Competition/", CreateCompetition)
	r.DELETE("/delete/Competition/", DeleteCompetition)
	r.GET("/get/Competition/", GetAllCompetitions)

	r.GET("/question/:questionid", GetQuestion)
	r.POST("/create/question/:competitionid", AddQuestion)
	r.DELETE("/delete/question/:questionid", DeleteQuestion)
	r.PUT("/update/question/", UpdateQuestion)

	r.POST("/create/option/", AddOption)
	r.PUT("/update/option/", UpdateOption)
	r.DELETE("/delete/option/:optionid", DeleteOption)

	r.POST("/submit/", SubmitCompetition)

	r.GET("/leaderboard/", LeaderboardAll)

	r.GET("/performance/:userid", GetPerformance)

	r.Use((cors.Default()))
	return r
}

func Index(context *gin.Context) {
	endpoints.Index(context, db)
}

func GetUsers(context *gin.Context) {
	endpoints.GetUsers(context, db)
}

func Signup(context *gin.Context) {
	endpoints.Signup(context, db)
}

func Login(context *gin.Context) {
	endpoints.Login(context, db)
}

func ExploreCompetitions(context *gin.Context) {
	endpoints.ExploreCompetitions(context, db)
}

func GetQuestions(context *gin.Context) {
	endpoints.GetQuestions(context, db)
}

func CreateCompetition(context *gin.Context) {
	endpoints.CreateCompetition(context, db)
}

func DeleteCompetition(context *gin.Context) {
	endpoints.DeleteCompetition(context, db)
}

func GetQuestion(context *gin.Context) {
	endpoints.GetQuestion(context, db)
}

func AddQuestion(context *gin.Context) {
	endpoints.AddQuestion(context, db)
}

func DeleteQuestion(context *gin.Context) {
	endpoints.DeleteQuestion(context, db)
}

func UpdateQuestion(context *gin.Context) {
	endpoints.UpdateQuestion(context, db)
}

func UpdateOption(context *gin.Context) {
	endpoints.UpdateOption(context, db)
}

func DeleteOption(context *gin.Context) {
	endpoints.DeleteOption(context, db)
}

func AddOption(context *gin.Context) {
	endpoints.AddOption(context, db)
}

func SubmitCompetition(context *gin.Context) {
	endpoints.SubmitCompetition(context, db)
}

func LeaderboardAll(context *gin.Context) {
	endpoints.LeaderboardAll(context, db)
}

func GetPerformance(context *gin.Context) {
	endpoints.GetPerformance(context, db)
}

func GetAllCompetitions(context *gin.Context) {
	endpoints.GetAllCompetitions(context, db)
}

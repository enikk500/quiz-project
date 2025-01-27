package endpoints

import (
	"fmt"
	"migproject/models"
	"migproject/utilities/utilities"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func Index(context *gin.Context, db *gorm.DB) {
	context.Header("access-control-allow-origin", "*")
	context.AbortWithStatus(200)
}

func GetUsers(context *gin.Context, db *gorm.DB) {
	var users []models.User

	if err := db.Find(&users).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	} else {
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, users)
	}
}

func Signup(context *gin.Context, db *gorm.DB) {
	var user models.User
	context.BindJSON(&user)
	if user.Username == "" || user.Password == "" || user.FirstName == "" || user.LastName == "" {
		context.AbortWithStatus(400)
	}
	user.Password = utilities.GeneratePassword(user.Password)
	db.Create(&user)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, user)
}

func Login(context *gin.Context, db *gorm.DB) {
	var requestBody utilities.Authentication
	var user models.User
	context.BindJSON(&requestBody)
	if err := db.Where("username = ?", requestBody.Username).First(&user).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	} else {
		passwordCorrect := utilities.CheckPassword(requestBody.Password, []byte(user.Password))
		if passwordCorrect == true {
			fmt.Println("Authenticated")
			context.Header("access-control-allow-origin", "*")
			context.JSON(http.StatusOK, user)
		} else {
			context.Header("access-control-allow-origin", "*")
			context.JSON(401, gin.H{"authenticated": false})
		}
	}
}

func ExploreCompetitions(context *gin.Context, db *gorm.DB) {
	var Competitions []models.Competition

	db.Find(&Competitions)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, Competitions)
}

func GetQuestions(context *gin.Context, db *gorm.DB) {
	id := context.Params.ByName("competitionid")
	var Competition models.Competition
	var questions []models.Question

	if err := db.Where("id = ?", id).First(&Competition).Error; err != nil {
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	}

	db.Model(&Competition).Related(&questions)
	for i, question := range questions {
		var options []models.Option
		db.Model(&question).Related(&options)
		questions[i].Options = append(questions[i].Options, options...)
	}
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, questions)
}

func CreateCompetition(context *gin.Context, db *gorm.DB) {
	var req_competition models.Competition
	var competition_found models.Competition
	context.BindJSON(&req_competition)

	err := db.Where("name = ?", req_competition.Name).First(&competition_found).Error
	if err == nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusBadRequest)
		fmt.Println(err)
	} else {
		db.Create(&req_competition)
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, req_competition)
	}
}

func DeleteCompetition(context *gin.Context, db *gorm.DB) {
	var req_competition models.Competition
	var competition_found models.Competition
	var Competition models.Competition
	context.BindJSON(&req_competition)
	err := db.Where("name = ?", req_competition.Name).First(&competition_found).Error
	if err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	} else {
		d := db.Where("id = ?", competition_found.ID).Delete(&Competition)
		fmt.Println(d)
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, gin.H{"Deleted": Competition.Name})
	}
}

func GetQuestion(context *gin.Context, db *gorm.DB) {
	var question models.Question
	var options []models.Option
	id := context.Params.ByName("questionid")

	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	} else {
		db.Model(&question).Related(&options)
		question.Options = append(question.Options, options...)
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, question)
	}
}

func AddQuestion(context *gin.Context, db *gorm.DB) {
	var question models.Question
	context.BindJSON(&question)
	db.Create(&question)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, question)
}

func DeleteQuestion(context *gin.Context, db *gorm.DB) {
	var question models.Question
	id := context.Params.ByName("questionid")
	if err := db.Where("id = ?", id).Delete(&question).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	}
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, gin.H{"Deleted": question.ID})
}

func UpdateQuestion(context *gin.Context, db *gorm.DB) {
	var question models.Question
	var check_question models.Question
	context.BindJSON(&question)
	if err := db.Where("id = ?", question.ID).First(&check_question).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
	} else {
		db.Save(&question)
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, question)
	}
}

func UpdateOption(context *gin.Context, db *gorm.DB) {
	var option models.Option
	var check_option models.Option
	context.BindJSON(&option)
	if err := db.Where("id = ?", option.ID).First(&check_option).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
	} else {
		db.Save(&option)
		context.Header("access-control-allow-origin", "*")
		context.JSON(http.StatusOK, option)
	}
}

func DeleteOption(context *gin.Context, db *gorm.DB) {
	var option models.Option
	id := context.Params.ByName("optionid")
	if err := db.Where("id = ?", id).Delete(&option).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	}
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, gin.H{"Deleted": option.ID})
}

func AddOption(context *gin.Context, db *gorm.DB) {
	var option models.Option
	context.BindJSON(&option)
	db.Create(&option)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, option)
}

func SubmitCompetition(context *gin.Context, db *gorm.DB) {
	var score models.Score
	var score_record models.Score
	var Competition models.Competition
	var user models.User
	context.BindJSON(&score)
	if err := db.Where("id = ?", score.CompetitionID).First(&Competition).Error; err != nil {
		context.Header("access-control-allow-origin", "*")
		context.AbortWithStatus(http.StatusNotFound)
		fmt.Println(err)
	} else {
		db.Where("id = ?", score.UserID).First(&user)
		if err2 := db.Where("user_id = ? AND competition_id = ?", score.UserID, score.CompetitionID).First(&score_record).Error; err2 != nil {
			score.Attempts = 1
			score.Username = user.Username
			db.Create(&score)
			user.TotalScore = user.TotalScore + score.Value
			db.Save(&user)
			context.Header("access-control-allow-origin", "*")
			context.JSON(http.StatusOK, score)
		} else {
			user.TotalScore = user.TotalScore - score_record.Value + score.Value
			db.Save(&user)
			score_record.Value = score.Value
			score_record.Attempts = score_record.Attempts + 1
			db.Save(&score_record)
			context.Header("access-control-allow-origin", "*")
			context.JSON(http.StatusOK, score_record)
		}
	}
}

func LeaderboardAll(context *gin.Context, db *gorm.DB) {
	var users []models.User
	db.Order("total_score desc").Find(&users)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, users)
}

func GetPerformance(context *gin.Context, db *gorm.DB) {
	var scores []models.Score
	var user models.User
	id := context.Params.ByName("userid")
	db.Where("id = ?", id).First(&user)
	db.Model(&user).Related(&scores)
	user.Scores = append(user.Scores, scores...)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, user)
}

func GetAllCompetitions(context *gin.Context, db *gorm.DB) {
	var Competitions []models.Competition
	db.Find(&Competitions)
	context.Header("access-control-allow-origin", "*")
	context.JSON(http.StatusOK, Competitions)
}

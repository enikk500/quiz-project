package models

import (
	_ "fmt"

	_ "github.com/gin-contrib/cors"
	_ "github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// Stores results of the users
type Score struct {
	ID            uint   `json: "id"`
	Username      string `json:"username"`
	UserID        uint   `json:"userid"`
	CompetitionID uint   `json:"Competitionid"`
	Value         uint   `json:"value"`
	Attempts      uint   `json:"attempts"`
}

// Users that participate in competitions
type User struct {
	ID         uint    `json:"id"; gorm:"primary_key"`
	Username   string  `json:"username"; gorm:"unique"`
	Password   string  `json:"password"`
	FirstName  string  `json:"firstname"`
	LastName   string  `json:"lastname"`
	Scores     []Score `json:"scores"`
	TotalScore uint    `json:"totalscore"`
}

// Options in questions
type Option struct {
	ID         uint   `json:"id"; gorm:"primary_key"`
	Content    string `json:"content"`
	QuestionID uint   `json:questionid`
	Correct    bool   `json:"correct"`
}

// Question from a competition
type Question struct {
	ID            uint     `json:"id"; gorm:"primary_key"`
	CompetitionID uint     `json:"Competitionid"`
	Question      string   `json:"question"`
	Options       []Option `json:"options"`
	NumberCorrect uint     `json:"numcorrect"`
}

// Competition has multiple questions and name
type Competition struct {
	ID        uint       `json:"id"; gorm:"primary_key"`
	Name      string     `json:"name"; gorm:"unique"`
	Questions []Question `json:"questions"`
}

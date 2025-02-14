package main

import (
	"context"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/libs/db/models"
	"github.com/tobyrushton/elohoops/libs/db/postgres"
)

func handler() (string, error) {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})
	if err != nil {
		return "Could not launch db", err
	}

	var players []models.Player

	err = db.NewSelect().
		Model(&players).
		Order("rating DESC").
		Where("active=true").
		Scan(context.Background())

	if err != nil {
		return "error creating log", err
	}

	ratings := make([]models.PlayerRating, len(players))
	for i := 0; i < len(players); i++ {
		ratings[i] = models.PlayerRating{
			Rating:   players[i].Rating,
			Ranking:  i + 1,
			PlayerID: players[i].ID,
		}
	}

	err = db.NewInsert().Model(&ratings).Scan(context.Background())

	if err != nil {
		return "error creating log", err
	}

	return "successfully updated db", nil
}

func main() {
	lambda.Start(handler)
}

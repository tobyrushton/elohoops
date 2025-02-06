package matchmaker

import (
	"context"
	"log"

	"github.com/uptrace/bun"

	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/libs/db/models"
	"github.com/tobyrushton/elohoops/libs/db/postgres"
)

type MatchMaker struct {
	db *bun.DB
}

func New() *MatchMaker {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})
	if err != nil {
		log.Fatal(err)
	}
	return &MatchMaker{
		db: db,
	}
}

func (mm *MatchMaker) CreateMatch() (models.Match, error) {
	var player1 models.Player
	err := mm.db.
		NewRaw("SELECT * FROM players ORDER BY RANDOM() LIMIT 1").
		Scan(context.Background(), &player1)

	if err != nil {
		return models.Match{}, err
	}

	// initially search for a player with a diff of 50, then add by +25 until match is found
	ratingDiff := 50

	var player2 models.Player

	found := false

	for !found {
		err = mm.db.NewRaw(
			"SELECT * FROM players WHERE ABS(rating - ?) <= ? AND id != ? ORDER BY RANDOM() LIMIT 1",
			player1.Rating,
			ratingDiff,
			player1.ID,
		).
			Scan(context.Background(), &player2)

		if err != nil {
			return models.Match{}, err
		}
		if player2.FirstName != "" {
			found = true
		} else {
			ratingDiff += 25
		}
	}

	match := models.Match{
		Player1ID: player1.ID,
		Player2ID: player2.ID,
		Player1:   &player1,
		Player2:   &player2,
	}
	_, err = mm.db.NewInsert().
		Model(&match).Exec(context.Background())

	if err != nil {
		return models.Match{}, nil
	}

	return match, nil
}

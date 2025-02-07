package matchmaker

import (
	"context"
	"errors"
	"log"
	"math"

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

func (mm *MatchMaker) ResultMatch(matchID int, result int) error {
	if !(result == 1 || result == 2) {
		return errors.New("result must be either 1 or 2")
	}

	var match models.Match

	err := mm.db.NewSelect().
		Model(&match).
		Relation("Player1").
		Relation("Player2").
		Where("match.id = ?", matchID).
		Scan(context.Background())
	if err != nil {
		return err
	}

	res := models.Result{
		Player1ID: match.Player1ID,
		Player2ID: match.Player2ID,
		Result:    result,
	}

	_, err = mm.db.NewInsert().Model(&res).Exec(context.Background())

	if err != nil {
		return err
	}

	_, err = mm.db.NewDelete().
		Model((*models.Match)(nil)).
		Where("id = ?", match.ID).
		Exec(context.Background())

	if err != nil {
		return err
	}

	// now update player ratings
	r1, r2 := mm.calculateUpdatedRatings(match.Player1.Rating, match.Player2.Rating, result)

	_, err = mm.db.NewUpdate().
		Model((*models.Player)(nil)).
		Where("id IN (?,?)", match.Player1ID, match.Player2ID).
		Set(
			"rating = CASE WHEN id = ? THEN ? WHEN id = ? THEN ? ELSE rating END",
			match.Player1ID, r1,
			match.Player2ID, r2,
		).
		Exec(context.Background())

	return err
}

func (mm *MatchMaker) calculateUpdatedRatings(rating1 int, rating2 int, outcome int) (int, int) {
	// probability each player has of winning based on their ratings
	p1 := 1 / (1 + math.Pow(10, float64(rating2-rating1)/400))
	p2 := 1 / (1 + math.Pow(10, float64(rating1-rating2)/400))

	outcome--

	// now update rating based on outcome
	K := float64(30)
	rating1 = rating1 + int(math.Floor(K*(float64(1-outcome)-p1)))
	rating2 = rating2 + int(math.Floor(K*(float64(outcome)-p2)))

	return rating1, rating2
}

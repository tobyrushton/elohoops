package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/render"
	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/libs/db/models"
	"github.com/tobyrushton/elohoops/libs/db/postgres"
)

type LeaderboardHandler struct{}

func NewLeaderboardHandler() *LeaderboardHandler {
	return &LeaderboardHandler{}
}

func (h *LeaderboardHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})

	if err != nil {
		http.Error(w, "unable to get leaderboard", http.StatusBadRequest)
		return
	}

	var players []models.Player

	err = db.NewSelect().
		Model(&players).
		Order("rating DESC").
		Scan(context.Background())

	if err != nil {
		http.Error(w, "unable to get leaderboard", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, players)
}

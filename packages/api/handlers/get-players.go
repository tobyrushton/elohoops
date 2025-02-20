package handlers

import (
	"context"
	"net/http"
	"strconv"

	"github.com/go-chi/render"
	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/libs/db/models"
	"github.com/tobyrushton/elohoops/libs/db/postgres"
	"github.com/uptrace/bun"
)

type GetPlayersHandler struct{}

func NewPlayersHandler() *GetPlayersHandler {
	return &GetPlayersHandler{}
}

func (h *GetPlayersHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	ids := r.Form["player_ids"]

	if len(ids) == 0 || len(ids) > 100 {
		http.Error(w, "invalid amount of player ids passed", http.StatusBadRequest)
		return
	}

	idsAsInts := make([]int, len(ids))

	for i, id := range ids {
		idAsInt, err := strconv.Atoi(id)

		if err != nil {
			http.Error(w, "unable to fetch players", http.StatusBadRequest)
			return
		}

		idsAsInts[i] = idAsInt
	}

	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})

	if err != nil {
		http.Error(w, "unable to fetch players", http.StatusBadRequest)
		return
	}

	var players []models.Player

	err = db.NewSelect().
		Model(&players).
		Where("id IN (?)", bun.In(idsAsInts)).
		Scan(context.Background())

	if err != nil {
		http.Error(w, "unable to fetch players", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, Response[[]models.Player, interface{}]{
		Data: players,
	})
}

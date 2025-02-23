package handlers

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/libs/db/models"
	"github.com/tobyrushton/elohoops/libs/db/postgres"
)

type GetPlayerRatingsHandler struct{}

func NewPlayerRatingsHandler() *GetPlayerRatingsHandler {
	return &GetPlayerRatingsHandler{}
}

func (h *GetPlayerRatingsHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(chi.URLParam(r, "playerID"))

	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}

	upUntilDate := r.URL.Query().Get("until")

	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})

	var playerRatings []models.PlayerRating

	baseQuery := db.NewSelect().
		Model(&playerRatings).
		Where("player = ?", id).
		Order("day DESC")

	if upUntilDate == "" {
		err = baseQuery.Limit(1).Scan(context.Background())
	} else {
		date, err := time.Parse("02/01/2006", upUntilDate)

		if err != nil {
			http.Error(w, "invalid until date", http.StatusBadRequest)
			return
		}

		err = baseQuery.Where("day > ?", date).
			Scan(context.Background())
	}

	if err != nil {
		fmt.Println(err)
		http.Error(w, "error fetching ratings", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, Response[[]models.PlayerRating, interface{}]{
		Data: playerRatings,
	})
}

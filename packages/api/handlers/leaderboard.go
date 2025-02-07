package handlers

import (
	"context"
	"math"
	"net/http"
	"strconv"

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

	currentPage, _ := strconv.Atoi(r.URL.Query().Get("page"))
	if currentPage == 0 {
		currentPage = 1
	}
	perPage, _ := strconv.Atoi(r.URL.Query().Get("per_page"))
	if perPage == 0 {
		perPage = 25
	}
	if perPage > 100 || perPage < 1 {
		http.Error(w, "invalid per_page value", http.StatusBadRequest)
		return
	}

	var count int
	err = db.NewSelect().Model((*models.Player)(nil)).ColumnExpr("COUNT(*)").Scan(context.Background(), &count)
	if err != nil {
		http.Error(w, "unable to get leaderboard", http.StatusBadRequest)
		return
	}

	totalPages := int(math.Ceil(float64(count) / float64(perPage)))

	if currentPage > totalPages {
		http.Error(w, "invalid page", http.StatusBadRequest)
		return
	}

	var players []models.Player

	err = db.NewSelect().
		Model(&players).
		Order("rating DESC").
		Limit(perPage).
		Offset(perPage * (currentPage - 1)).
		Scan(context.Background())

	if err != nil {
		http.Error(w, "unable to get leaderboard", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, Response[[]models.Player, PaginationMeta]{
		Data: players,
		Meta: PaginationMeta{
			CurrentPage: currentPage,
			TotalPages:  totalPages,
		},
	})
}

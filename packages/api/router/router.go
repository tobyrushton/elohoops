package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/tobyrushton/elohoops/packages/api/handlers"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Group(func(r chi.Router) {
		r.Post("/create-match", handlers.NewCreateMatchHandler().ServeHTTP)
		r.Put("/result-match", handlers.NewResultMatchHandler().ServeHTTP)
		r.Get("/leaderboard", handlers.NewLeaderboardHandler().ServeHTTP)
	})

	return r
}

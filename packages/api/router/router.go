package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/tobyrushton/elohoops/packages/api/handlers"
)

func NewRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Group(func(r chi.Router) {
		r.Post("/create-match", handlers.NewCreateMatchHandler().ServeHTTP)
		r.Put("/result-match", handlers.NewResultMatchHandler().ServeHTTP)
		r.Get("/leaderboard", handlers.NewLeaderboardHandler().ServeHTTP)
		r.Get("/players", handlers.NewPlayersHandler().ServeHTTP)
		r.Get("/player-rating/{playerID}", handlers.NewPlayerRatingsHandler().ServeHTTP)
	})

	return r
}

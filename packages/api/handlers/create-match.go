package handlers

import (
	"net/http"

	"github.com/go-chi/render"
	"github.com/tobyrushton/elohoops/packages/api/matchmaker"
)

type CreateMatchHandler struct{}

func NewCreateMatchHandler() *CreateMatchHandler {
	return &CreateMatchHandler{}
}

func (h *CreateMatchHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	mm := matchmaker.New()

	match, err := mm.CreateMatch()

	if err != nil {
		http.Error(w, "Could not create match", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, match)
}

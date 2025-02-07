package handlers

import (
	"net/http"
	"strconv"

	"github.com/go-chi/render"
	"github.com/tobyrushton/elohoops/packages/api/matchmaker"
)

type Res struct {
	Message string
}

type ResultMatchHandler struct{}

func NewResultMatchHandler() *ResultMatchHandler {
	return &ResultMatchHandler{}
}

func (h *ResultMatchHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	matchID, err := strconv.Atoi(r.URL.Query().Get("matchID"))
	if matchID == 0 || err != nil {
		http.Error(w, "no match id given", http.StatusBadRequest)
		return
	}
	result, err := strconv.Atoi(r.URL.Query().Get("result"))
	if !(result == 1 || result == 2) || err != nil {
		http.Error(w, "invalud result", http.StatusBadRequest)
		return
	}

	mm := matchmaker.New()

	err = mm.ResultMatch(matchID, result)
	if err != nil {
		http.Error(w, "could not result match", http.StatusBadRequest)
		return
	}

	render.JSON(w, r, Response[Res, interface{}]{
		Data: Res{
			Message: "Success",
		},
	})
}

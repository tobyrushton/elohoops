package handlers

import "net/http"

type CreateMatchHandler struct{}

func NewCreateMatchHandler() *CreateMatchHandler {
	return &CreateMatchHandler{}
}

func (h *CreateMatchHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// here we need to get a match and then create an entry in the db for that match, then return the 2 players
	// players should be match based upon having a 'close' rating

}

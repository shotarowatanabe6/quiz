package http

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type Handler struct {
	// Dependencies go here
}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/api/hello", h.handleHello()).Methods("GET")
}

func (h *Handler) handleHello() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res := map[string]string{"message": "Hello, World!"}
		json.NewEncoder(w).Encode(res)
	}
}

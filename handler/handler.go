package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/sthtnr/kakeibo/command"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Item struct {
	Itemnumber string `json:"item_number"`
	Content    string `json:"content"`
	Price      string `json:"price"`
}

func Handler() {
	// init router
	r := mux.NewRouter()

	// route handlers / endpoints
	r.HandleFunc("/item/{item_number}", getItem).Methods("GET")
	r.HandleFunc("/item/", getItems).Methods("GET")
	r.HandleFunc("/item/", createItem).Methods("POST")
	r.HandleFunc("/item/{item_number}", updateItem).Methods("PUT")
	r.HandleFunc("/item/{item_number}", deleteItem).Methods("DELETE")
	r.HandleFunc("/item/", deleteItems).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r)))
	// log.Fatal(http.ListenAndServeTLS(":8000", "https-server.crt", "https-server.key", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(r)))
}

// get single item
func getItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["item_number"])
	if err != nil {
		panic(err)
	}
	receiver := command.GetItem_z(i)
	json.NewEncoder(w).Encode(receiver)
}

// get all items
func getItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	receiver := command.GetItems_z()
	json.NewEncoder(w).Encode(receiver)
}

// create a new item
func createItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var item Item
	_ = json.NewDecoder(r.Body).Decode(&item)
	receiver := command.CreateItem_z(item.Content, item.Price)
	json.NewEncoder(w).Encode(receiver)
}

// update item
func updateItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var item Item
	_ = json.NewDecoder(r.Body).Decode(&item)
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["item_number"])
	if err != nil {
		panic(err)
	}
	receiver := command.UpdateItem_z(i, item.Content, item.Price)
	json.NewEncoder(w).Encode(receiver)
}

// delete item
func deleteItem(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	i, err := strconv.Atoi(params["item_number"])
	if err != nil {
		panic(err)
	}
	command.DeleteItem_z(i)
}

// delete all items
func deleteItems(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	command.DeleteItems_z()
}

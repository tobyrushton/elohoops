package scrape

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/tobyrushton/elohoops/packages/config"
)

type BDLData struct {
	Data []BDLPlayerData `json:"data"`
	Meta BDLMeta         `json:"meta"`
}

type BDLMeta struct {
	NextCursor int `json:"next_cursor"`
}

type BDLPlayerData struct {
	Id        int    `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type BDLScraper struct {
	key string
}

func NewBDLScraper() *BDLScraper {
	cfg := config.MustLoadConfig()
	return &BDLScraper{
		key: cfg.BALL_DONT_LIE_API_KEY,
	}
}

func (bs *BDLScraper) Scrape() []BDLPlayerData {
	players := make([]BDLPlayerData, 0)
	cursor := 1

	for cursor > 0 {
		next_cursor, data := bs.scrapePage(cursor)
		players = append(players, data...)
		cursor = next_cursor
	}

	return players
}

func (bs *BDLScraper) scrapePage(cursor int) (int, []BDLPlayerData) {
	url := fmt.Sprintf("https://api.balldontlie.io/v1/players/active?per_page=100&cursor=%d", cursor)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Add("Authorization", bs.key)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var data BDLData
	if err := json.Unmarshal([]byte(body), &data); err != nil {
		log.Fatal(err)
	}

	return data.Meta.NextCursor, data.Data
}

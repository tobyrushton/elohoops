package scrape_test

import (
	"testing"

	"github.com/tobyrushton/elohoops/packages/data-service/scrape"
)

// check
func TestWebScrape(t *testing.T) {
	ws := scrape.NewWebScraper()

	players := ws.Scrape()

	for i, player := range players {
		if player.FirstName == "" {
			t.Errorf("Player %d has an empty FirstName", i)
		}

		if player.LastName == "" {
			t.Errorf("Player %d has an empty LastName", i)
		}

		if player.Id == 0 {
			t.Errorf("Player %d has an invalid Id (zero)", i)
		}
	}
}

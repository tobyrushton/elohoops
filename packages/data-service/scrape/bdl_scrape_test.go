package scrape_test

import (
	"testing"

	"github.com/tobyrushton/elohoops/packages/scrape"
)

func TestBDLScrape(t *testing.T) {
	bs := scrape.NewBDLScraper()

	players := bs.Scrape()

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

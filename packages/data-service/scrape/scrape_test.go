package scrape_test

import (
	"log"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/tobyrushton/elohoops/packages/scrape"
)

func TestMain(m *testing.M) {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal(err)
	}

	os.Exit(m.Run())
}

func TestScrape(t *testing.T) {
	s := scrape.New()

	players := s.Scrape()

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

		if player.NBAId == 0 {
			t.Errorf("Player %d has an invalid NBA Id (zero)", i)
		}
	}
}

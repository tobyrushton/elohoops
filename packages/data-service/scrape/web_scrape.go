package scrape

import (
	"encoding/json"
	"log"

	"github.com/gocolly/colly"
)

// json data of web page types
// data is structured
//
//		{
//			"props": {
//				"pageProps": {
//					"players": [{
//						"PLAYER_FIRST_NAME": string,
//						"PLAYER_LAST_NAME": string,
//						"PERSON_ID": int,
//						...
//					}, ...],
//					...,
//				},
//				...,
//			},
//			...,
//	}
type JSONData struct {
	Props WSProps `json:"props"`
}

type WSProps struct {
	PageProps WSPageProps `json:"pageProps"`
}

type WSPageProps struct {
	Players []WSPlayer `json:"players"`
}

type WSPlayer struct {
	FirstName string `json:"PLAYER_FIRST_NAME"`
	LastName  string `json:"PLAYER_LAST_NAME"`
	Id        int    `json:"PERSON_ID"`
}

type WebScraper struct{}

func NewWebScraper() *WebScraper {
	return &WebScraper{}
}

func (ws *WebScraper) Scrape() []WSPlayer {
	c := colly.NewCollector(
		colly.AllowedDomains("www.nba.com"),
	)

	var data JSONData

	// scrape from the next data script
	c.OnHTML("#__NEXT_DATA__", func(e *colly.HTMLElement) {
		jsonData := e.Text

		if err := json.Unmarshal([]byte(jsonData), &data); err != nil {
			log.Printf("Error parsing JSON: %v", err)
			return
		}
	})

	c.Visit("https://www.nba.com/players")

	return data.Props.PageProps.Players
}

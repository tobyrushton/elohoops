package scrape

import (
	"sort"
	"unicode"

	"golang.org/x/text/unicode/norm"
)

type Player struct {
	Id        int
	FirstName string
	LastName  string
	Rating    int
	NBAId     int
}

type Scraper struct{}

func New() *Scraper {
	return &Scraper{}
}

func (s *Scraper) Scrape() []Player {
	webData := NewWebScraper().Scrape()
	bdlData := NewBDLScraper().Scrape()

	sort.Slice(webData, func(i, j int) bool {
		if webData[i].FirstName == webData[j].FirstName {
			return webData[i].LastName < webData[j].LastName
		}
		return webData[i].FirstName < webData[j].FirstName
	})

	sort.Slice(bdlData, func(i, j int) bool {
		if bdlData[i].FirstName == bdlData[j].FirstName {
			return bdlData[i].LastName < bdlData[j].LastName
		}
		return bdlData[i].FirstName < bdlData[j].FirstName
	})

	// now we match them and create new
	data := make([]Player, 0)
	i, j := 0, 0
	for i < len(webData) && j < len(bdlData) {
		if s.removeAccentsFromName(webData[i].FirstName) == s.removeAccentsFromName(bdlData[j].FirstName) {
			if s.removeAccentsFromName(webData[i].LastName) == s.removeAccentsFromName(bdlData[j].LastName) {
				data = append(data, Player{
					Id:        bdlData[j].Id,
					FirstName: bdlData[j].FirstName,
					LastName:  bdlData[j].LastName,
					NBAId:     webData[i].Id,
				})
				i++
				j++
			} else if webData[i].LastName < bdlData[j].LastName {
				i++
			} else {
				j++
			}
		} else if webData[i].FirstName < bdlData[j].FirstName {
			i++
		} else {
			j++
		}
	}

	return data
}

func (s *Scraper) removeAccentsFromName(name string) string {
	nfd := norm.NFD.String(name)

	var res []rune
	for _, r := range nfd {
		if !unicode.Is(unicode.Mn, r) {
			res = append(res, r)
		}
	}
	return string(res)
}

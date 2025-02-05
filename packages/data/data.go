package data

import (
	"context"
	"fmt"
	"log"
	"math"

	"github.com/tobyrushton/elohoops/packages/config"
	"github.com/tobyrushton/elohoops/packages/postgres"
	"github.com/tobyrushton/elohoops/packages/scrape"
	"github.com/uptrace/bun"
)

type Player struct {
	ID        int    `bun:"id,pk,autoincrement"`
	FirstName string `bun:"first_name"`
	LastName  string `bun:"last_name"`
	NBAID     int    `bun:"nba_id"`
	Rating    int    `bun:"rating"`
	Active    bool   `bun:"active,default:true"`
}

type DataHandler struct {
	db *bun.DB
}

func New() *DataHandler {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})
	if err != nil {
		log.Fatal(err)
	}

	return &DataHandler{
		db: db,
	}
}

func (dh *DataHandler) UpdateData() error {
	players := scrape.New().Scrape()

	// make list of ids
	playerIds := make([]int, len(players))
	for i, player := range players {
		playerIds[i] = player.Id
	}

	// check what players are not in db (if any)
	playersNotInDBIds, err := dh.getPlayersNotInDb(playerIds)

	if err != nil {
		return err
	}

	playersToBeAdded := make([]scrape.Player, 0)

	playerMap := make(map[int]scrape.Player)

	for _, player := range players {
		playerMap[player.Id] = player
	}

	for _, playerId := range playersNotInDBIds {
		playersToBeAdded = append(playersToBeAdded, playerMap[playerId])
	}

	if len(playersToBeAdded) > 0 {
		err := dh.addNewPlayersToDb(playersToBeAdded)

		if err != nil {
			return err
		}
	}

	return nil
}

func (dh *DataHandler) getPlayersNotInDb(playerIds []int) ([]int, error) {
	// check what players are not in db (if any)
	playersNotInDBIds := make([]int, 0)

	// only 100 can go into sql statement at once
	max := int(math.Ceil(float64(len(playerIds)) / 100))

	for i := 0; i < max; i++ {
		var ids []int
		if i+1 == max {
			ids = playerIds[i*100:]
		} else {
			ids = playerIds[i*100 : (i+1)*100]
		}

		fmt.Println(len(ids), len(playerIds))

		tempIds := make([]int, 0)
		err := dh.db.NewRaw("SELECT player_id FROM unnest(array[?]) AS player_id WHERE player_id NOT IN (SELECT id FROM players)",
			bun.In(ids),
		).
			Scan(context.Background(), &tempIds)

		if err != nil {
			return nil, err
		}

		if len(tempIds) > 0 {
			playersNotInDBIds = append(playersNotInDBIds, tempIds...)
		}
	}

	return playersNotInDBIds, nil
}

func (dh *DataHandler) addNewPlayersToDb(players []scrape.Player) error {
	playersInDbFormat := make([]Player, len(players))

	for i, player := range players {
		playersInDbFormat[i] = Player{
			FirstName: player.FirstName,
			LastName:  player.LastName,
			ID:        player.Id,
			NBAID:     player.NBAId,
			Rating:    1500,
		}
	}
	_, err := dh.db.NewInsert().Model(&playersInDbFormat).Exec(context.Background())

	return err
}

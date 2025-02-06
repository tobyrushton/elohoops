package updater

import (
	"context"
	"fmt"
	"log"
	"math"

	"github.com/tobyrushton/elohoops/libs/config"
	"github.com/tobyrushton/elohoops/packages/data-service/scrape"
	"github.com/tobyrushton/elohoops/packages/postgres"
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

type DataUpdater struct {
	db *bun.DB
}

func New() *DataUpdater {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})
	if err != nil {
		log.Fatal(err)
	}

	return &DataUpdater{
		db: db,
	}
}

func (du *DataUpdater) UpdateData() error {
	players := scrape.New().Scrape()

	// make list of ids
	playerIds := make([]int, len(players))
	for i, player := range players {
		playerIds[i] = player.Id
	}

	// check what players are not in db (if any)
	playersNotInDBIds, err := du.getPlayersNotInDb(playerIds)

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
		err := du.addNewPlayersToDb(playersToBeAdded)

		if err != nil {
			return err
		}
	}

	err = du.setPlayersUnactive(playerIds)

	if err != nil {
		return err
	}

	return nil
}

func (du *DataUpdater) getPlayersNotInDb(playerIds []int) ([]int, error) {
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
		err := du.db.NewRaw("SELECT player_id FROM unnest(array[?]) AS player_id WHERE player_id NOT IN (SELECT id FROM players)",
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

func (du *DataUpdater) addNewPlayersToDb(players []scrape.Player) error {
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
	_, err := du.db.NewInsert().Model(&playersInDbFormat).Exec(context.Background())

	return err
}

func (du *DataUpdater) setPlayersUnactive(playerIDs []int) error {
	_, err := du.db.NewUpdate().
		Model((*Player)(nil)).
		Set("active = ?", false).
		Where("id NOT IN (?)", bun.In(playerIDs)).
		Where("active = ?", true).
		Exec(context.Background())

	return err
}

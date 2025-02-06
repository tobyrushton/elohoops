package models

import "time"

type Player struct {
	ID        int    `bun:"id,pk,autoincrement"`
	FirstName string `bun:"first_name"`
	LastName  string `bun:"last_name"`
	NBAID     int    `bun:"nba_id"`
	Rating    int    `bun:"rating"`
	Active    bool   `bun:"active,default:true"`
}

type Match struct {
	ID        int       `bun:"id,pk,autoincrement"`
	Player1ID int       `bun:"player1"`
	Player2ID int       `bun:"player2"`
	CreatedAt time.Time `bun:"created_at,default:current_timestamp"`
	Player1   *Player   `bun:"rel:belongs-to,join:player1=id"`
	Player2   *Player   `bun:"rel:belongs-to,join:player2=id"`
}

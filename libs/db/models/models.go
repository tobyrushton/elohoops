package models

type Player struct {
	ID        int    `bun:"id,pk,autoincrement"`
	FirstName string `bun:"first_name"`
	LastName  string `bun:"last_name"`
	NBAID     int    `bun:"nba_id"`
	Rating    int    `bun:"rating"`
	Active    bool   `bun:"active,default:true"`
}

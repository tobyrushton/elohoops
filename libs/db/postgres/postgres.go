package postgres

import (
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/extra/bundebug"
)

type Config struct {
	Url string
}

func NewDB(c *Config) (*bun.DB, error) {
	config, err := pgx.ParseConfig(c.Url)
	if err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}
	sqldb := stdlib.OpenDB(*config)

	db := bun.NewDB(sqldb, pgdialect.New())

	db.AddQueryHook(bundebug.NewQueryHook(bundebug.WithVerbose(true)))

	return db, nil
}

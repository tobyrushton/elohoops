package main

import (
	"fmt"
	"log"
	"log/slog"
	"os"
	"strings"

	"github.com/tobyrushton/elohoops/migrations"
	"github.com/tobyrushton/elohoops/packages/config"
	"github.com/tobyrushton/elohoops/packages/postgres"
	"github.com/uptrace/bun/migrate"
	"github.com/urfave/cli/v2"
)

func main() {
	cfg := config.MustLoadConfig()
	db, err := postgres.NewDB(&postgres.Config{Url: cfg.DATABASE_URL})
	if err != nil {
		log.Fatal(err)
	}

	app := &cli.App{
		Name: "migrate",
		Commands: []*cli.Command{
			newMigrationCmd(migrate.NewMigrator(db, migrations.New(), migrate.WithMarkAppliedOnSuccess(true))),
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}

func newMigrationCmd(m *migrate.Migrator) *cli.Command {
	return &cli.Command{
		Name:  "migrate",
		Usage: "database migrations",
		Subcommands: []*cli.Command{
			{
				Name:  "init",
				Usage: "create migrations table",
				Action: func(ctx *cli.Context) error {
					return m.Init(ctx.Context)
				},
			},
			{
				Name:  "up",
				Usage: "run up migration",
				Action: func(ctx *cli.Context) error {
					if err := m.Lock(ctx.Context); err != nil {
						return err
					}

					defer m.Unlock(ctx.Context)

					group, err := m.Migrate(ctx.Context)

					if err != nil {
						return err
					}

					if group.IsZero() {
						fmt.Printf("there are no new migrations (database is up to date)\n")
						return nil
					}
					fmt.Printf("migrated to %s\n", group)
					return nil
				},
			},
			{
				Name:  "down",
				Usage: "run down migration",
				Action: func(ctx *cli.Context) error {
					if err := m.Lock(ctx.Context); err != nil {
						return err
					}

					defer m.Unlock(ctx.Context)

					group, err := m.Rollback(ctx.Context)

					if err != nil {
						return err
					}

					if group.IsZero() {
						fmt.Printf("there are no groups to roll back\n")
						return nil
					}
					fmt.Printf("rolled back to %s\n", slog.Any("grous", group))
					return nil
				},
			},
			{
				Name:  "create",
				Usage: "create up and down sql migrations",
				Action: func(ctx *cli.Context) error {
					name := strings.Join(ctx.Args().Slice(), "_")
					files, err := m.CreateSQLMigrations(ctx.Context, name)
					if err != nil {
						return err
					}
					for _, f := range files {
						fmt.Printf("create migration %s (%s)\n", f.Name, f.Path)
					}
					return nil
				},
			},
			{
				Name:  "status",
				Usage: "print migration status",
				Action: func(ctx *cli.Context) error {
					ms, err := m.MigrationsWithStatus(ctx.Context)
					if err != nil {
						return err
					}

					fmt.Printf("migrations: %s\n", ms)
					fmt.Printf("unappled migrations: %s\n", ms.Unapplied())
					fmt.Printf("last migration group: %s\n", ms.LastGroup())

					return nil
				},
			},
		},
	}
}

module github.com/tobyrushton/elohoops/cmd

go 1.23.5

replace github.com/tobyrushton/elohoops/libs/db => ../libs/db

replace github.com/tobyrushton/elohoops/libs/config => ../libs/config

replace github.com/tobyrushton/elohoops/migrations => ../migrations

require (
	github.com/tobyrushton/elohoops/libs/config v0.0.0-00010101000000-000000000000
	github.com/tobyrushton/elohoops/libs/db v0.0.0-00010101000000-000000000000
	github.com/tobyrushton/elohoops/migrations v0.0.0-00010101000000-000000000000
	github.com/uptrace/bun v1.2.9
	github.com/urfave/cli/v2 v2.27.5
)

require (
	github.com/cpuguy83/go-md2man/v2 v2.0.5 // indirect
	github.com/fatih/color v1.18.0 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/pgx/v5 v5.7.2 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/joho/godotenv v1.5.1 // indirect
	github.com/kelseyhightower/envconfig v1.4.0 // indirect
	github.com/mattn/go-colorable v0.1.14 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/puzpuzpuz/xsync/v3 v3.5.0 // indirect
	github.com/russross/blackfriday/v2 v2.1.0 // indirect
	github.com/tmthrgd/go-hex v0.0.0-20190904060850-447a3041c3bc // indirect
	github.com/uptrace/bun/dialect/pgdialect v1.2.9 // indirect
	github.com/uptrace/bun/extra/bundebug v1.2.9 // indirect
	github.com/vmihailenco/msgpack/v5 v5.4.1 // indirect
	github.com/vmihailenco/tagparser/v2 v2.0.0 // indirect
	github.com/xrash/smetrics v0.0.0-20240521201337-686a1a2994c1 // indirect
	golang.org/x/crypto v0.31.0 // indirect
	golang.org/x/sync v0.10.0 // indirect
	golang.org/x/sys v0.29.0 // indirect
	golang.org/x/text v0.21.0 // indirect
)

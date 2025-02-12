module github.com/tobyrushton/elohoops/packages/api

go 1.23.5

require (
	github.com/go-chi/chi/v5 v5.2.1
	github.com/go-chi/render v1.0.3
	github.com/joho/godotenv v1.5.1
	github.com/tobyrushton/elohoops/libs/config v0.0.0-00010101000000-000000000000
	github.com/tobyrushton/elohoops/libs/db v0.0.0-00010101000000-000000000000
	github.com/uptrace/bun v1.2.9
)

require (
	github.com/ajg/form v1.5.1 // indirect
	github.com/aws/aws-lambda-go v1.47.0 // indirect
	github.com/awslabs/aws-lambda-go-api-proxy v0.16.2 // indirect
	github.com/fatih/color v1.18.0 // indirect
	github.com/go-chi/cors v1.2.1 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/pgx/v5 v5.7.2 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/kelseyhightower/envconfig v1.4.0 // indirect
	github.com/mattn/go-colorable v0.1.14 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/puzpuzpuz/xsync/v3 v3.5.0 // indirect
	github.com/tmthrgd/go-hex v0.0.0-20190904060850-447a3041c3bc // indirect
	github.com/uptrace/bun/dialect/pgdialect v1.2.9 // indirect
	github.com/uptrace/bun/extra/bundebug v1.2.9 // indirect
	github.com/vmihailenco/msgpack/v5 v5.4.1 // indirect
	github.com/vmihailenco/tagparser/v2 v2.0.0 // indirect
	golang.org/x/crypto v0.31.0 // indirect
	golang.org/x/sync v0.10.0 // indirect
	golang.org/x/sys v0.30.0 // indirect
	golang.org/x/text v0.21.0 // indirect
)

replace github.com/tobyrushton/elohoops/libs/config => ../../libs/config

replace github.com/tobyrushton/elohoops/libs/db => ../../libs/db

module github.com/tobyrushton/elohoops/packages/data-service

go 1.23.5

require (
	github.com/aws/aws-lambda-go v1.47.0
	github.com/gocolly/colly v1.2.0
	github.com/joho/godotenv v1.5.1
	github.com/tobyrushton/elohoops/libs/config v0.0.0-00010101000000-000000000000
	github.com/tobyrushton/elohoops/libs/db v0.0.0-00010101000000-000000000000
	github.com/uptrace/bun v1.2.9
	golang.org/x/text v0.21.0
)

require (
	github.com/PuerkitoBio/goquery v1.10.1 // indirect
	github.com/andybalholm/cascadia v1.3.3 // indirect
	github.com/antchfx/htmlquery v1.3.4 // indirect
	github.com/antchfx/xmlquery v1.4.4 // indirect
	github.com/antchfx/xpath v1.3.3 // indirect
	github.com/fatih/color v1.18.0 // indirect
	github.com/gobwas/glob v0.2.3 // indirect
	github.com/golang/groupcache v0.0.0-20241129210726-2c02b8208cf8 // indirect
	github.com/golang/protobuf v1.5.4 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/pgx/v5 v5.7.2 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/kelseyhightower/envconfig v1.4.0 // indirect
	github.com/kennygrant/sanitize v1.2.4 // indirect
	github.com/mattn/go-colorable v0.1.14 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/puzpuzpuz/xsync/v3 v3.5.0 // indirect
	github.com/saintfish/chardet v0.0.0-20230101081208-5e3ef4b5456d // indirect
	github.com/temoto/robotstxt v1.1.2 // indirect
	github.com/tmthrgd/go-hex v0.0.0-20190904060850-447a3041c3bc // indirect
	github.com/uptrace/bun/dialect/pgdialect v1.2.9 // indirect
	github.com/uptrace/bun/extra/bundebug v1.2.9 // indirect
	github.com/vmihailenco/msgpack/v5 v5.4.1 // indirect
	github.com/vmihailenco/tagparser/v2 v2.0.0 // indirect
	golang.org/x/crypto v0.32.0 // indirect
	golang.org/x/net v0.34.0 // indirect
	golang.org/x/sync v0.10.0 // indirect
	golang.org/x/sys v0.29.0 // indirect
	google.golang.org/appengine v1.6.8 // indirect
	google.golang.org/protobuf v1.36.4 // indirect
)

replace github.com/tobyrushton/elohoops/libs/config => ../../libs/config

replace github.com/tobyrushton/elohoops/libs/db => ../../libs/db

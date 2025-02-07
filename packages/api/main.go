package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
	"github.com/tobyrushton/elohoops/packages/api/router"
)

func main() {
	lambda.Start(httpadapter.NewV2(router.NewRouter()).ProxyWithContext)
}

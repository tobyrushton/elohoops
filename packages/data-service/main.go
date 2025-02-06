package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/tobyrushton/elohoops/packages/data-service/updater"
)

func handler() (string, error) {
	err := updater.New().UpdateData()

	if err != nil {
		return "", err
	}
	return "db successfully updated", nil
}

func main() {
	lambda.Start(handler)
}

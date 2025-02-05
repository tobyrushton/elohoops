package data_test

import (
	"log"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/tobyrushton/elohoops/packages/data"
)

func TestMain(m *testing.M) {
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal(err)
	}

	os.Exit(m.Run())
}

func TestUpdateData(t *testing.T) {
	dh := data.New()

	dh.UpdateData()
}

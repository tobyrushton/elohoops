package main

import (
	"fmt"
	"testing"
)

func TestMain(t *testing.T) {
	res, err := handler()

	fmt.Println(res, err)
}

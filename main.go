package main

import (
	"github.com/sthtnr/kakeibo/command"
	"github.com/sthtnr/kakeibo/handler"
)

func main() {
	command.Create_table()
	handler.Handler()
}

package command

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type Kakeibo_table struct {
	Id      int
	Content string
	Price   int
}

var (
	host     = os.Getenv("HOST")
	port     = os.Getenv("PORT")
	user     = os.Getenv("USER")
	password = os.Getenv("PASSWORD")
)

var psqlInfo = fmt.Sprintf("host=%s port=%s user=%s password=%s sslmode=disable", host, port, user, password)

func Create_table() {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `CREATE TABLE IF NOT EXISTS kakeibo_table
		(
		Id SERIAL,
		Content text NOT NULL,
		Price integer NOT NULL
		);
		`

	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

func GetItem_z(ts int) Kakeibo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `SELECT Id, Content,
									FROM kakeibo_table WHERE Id=$1;`
	var item Kakeibo_table
	row := db.QueryRow(sqlStatement, ts)
	err = row.Scan(&item.Id, &item.Content, &item.Price)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows were returned!")
		panic(err)
	case nil:
		return item
	default:
		panic(err)
	}
}

func GetItems_z() []Kakeibo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `SELECT Id, Content, Price
									FROM kakeibo_table;`
	var items []Kakeibo_table
	rows, err := db.Query(sqlStatement)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	for rows.Next() {
		var item Kakeibo_table
		err = rows.Scan(&item.Id, &item.Content, &item.Price)
		if err != nil {
			panic(err)
		}
		items = append(items, item)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
	return items
}

func CreateItem_z(c string, d string) Kakeibo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `INSERT INTO kakeibo_table (Content, Price)
	VALUES ($1, $2)
	RETURNING Id, Content, Price;`
	var item Kakeibo_table
	err = db.QueryRow(sqlStatement, c, d).Scan(&item.Id, &item.Content, &item.Price)
	if err != nil {
		panic(err)
	}
	return item
}

func UpdateItem_z(t int, c string, d string) Kakeibo_table {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `UPDATE kakeibo_table SET Content=$2, Price=$3
	WHERE Id = $1
	RETURNING Id, Content, Price;`
	var item Kakeibo_table
	err = db.QueryRow(sqlStatement, t, c, d).Scan(&item.Id, &item.Content, &item.Price)
	if err != nil {
		panic(err)
	}
	return item
}

func DeleteItem_z(t int) {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `DELETE FROM kakeibo_table WHERE Id = $1;`
	_, err = db.Exec(sqlStatement, t)
	if err != nil {
		panic(err)
	}
}

func DeleteItems_z() {
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	sqlStatement := `DELETE FROM kakeibo_table;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

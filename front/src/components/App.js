import React from "react";
import axios from "axios";
import "../style/App.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import MakeItem from "./MakeItem";
import DeleteAllItems from "./DeleteAllItems";
import DeleteItem from "./DeleteItem";
import UpdateItem from "./UpdateItem";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    axios.get("http://150.95.139.104:8000/item/").then(res => {
      const items = res.data;
      if (items !== null) {
        items.sort((a, b) => {
          return (a.Price - '0') - (b.Price - '0');
        });
      }
      this.setState({ items });
    });
  }
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>KakeiboApp</h1>
        </header>
        <Container className="container">
          <main>
            <Row>
              <Col sm={3}></Col>
              <Col sm={3}>
                <MakeItem
                  itemNextNumber={
                    this.state.items === null ? 1 : this.state.items.length + 1
                  }
                  view={this.componentDidMount.bind(this)}
                />
              </Col>
              <Col sm={3}>
                <DeleteAllItems view={this.componentDidMount.bind(this)} />
              </Col>
              <Col sm={3}></Col>
            </Row>
            <CardContents
              itemIsNull={this.state.items === null}
              items={this.state.items}
              view={this.componentDidMount.bind(this)}
            />
          </main>
        </Container>
      </React.Fragment>
    );
  }
}

const CardContents = props => {
  const itemIsNull = props.itemIsNull;
  if (itemIsNull) {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="main__card">
            <Card.Body>現在アイテムはありません</Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="main__card">
          <Card.Body>
            {props.items.map(item => (
              <div key={item.Id}>
                <div className="main__card__inner-second">
                  <span id={item.Id}>
                    {props.items.indexOf(item) + 1}: {item.Content}
                  </span>
                  <span>¥{item.Price}</span>
                  <span>
                    <UpdateItem
                      itemId={item.Id}
                      itemIndex={props.items.indexOf(item) + 1}
                      itemContent={item.Content}
                      itemPrice={item.Price}
                      view={props.view}
                    />
                  </span>
                  <span>
                    <DeleteItem
                      itemId={item.Id}
                      itemIndex={props.items.indexOf(item) + 1}
                      itemContent={item.Content}
                      itemPrice={item.Price}
                      view={props.view}
                    />
                  </span>
                </div>
                <hr />
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};


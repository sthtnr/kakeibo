import React from "react";
import axios from "axios";
import "../style/App.scss";
import "../style/MakeItem.scss";
import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = props => {
  const [content, setContent] = React.useState(null);
  const [price, setPrice] = React.useState("0");
  const handleContentChange = event => {
    setContent(event.target.value);
  };
  const handlePriceChange = event => {
    setPrice(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    const requestData = {
      content: content,
      price: price
    };
    axios.post("http://150.95.139.104:8000/item/", requestData).then(res => {
      props.view();
    });
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>新しく費目を作成</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="control">
            <label htmlFor="itemnumber">番号</label>
            {props.itemNextNumber}
          </div>
          <div className="control">
            <label htmlFor="content">費目</label>
            <textarea id="content" onChange={handleContentChange} />
          </div>
          <div className="control">
            <label htmlFor="price">金額</label>
            ¥ <input id="price" type="number" min="0" max="2147483647" onChange={handlePriceChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={props.onHide}>
            作成
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const MakeItem = props => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button
        variant="success"
        className="main__btn"
        onClick={() => setModalShow(true)}
      >
        作成
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        itemNextNumber={props.itemNextNumber}
        view={props.view}
      />
    </div>
  );
};

export default MakeItem;


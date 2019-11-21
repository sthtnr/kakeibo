import React from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import axios from "axios";
import "../style/App.scss";
import "../style/MakeItem.scss";
import "rc-time-picker/assets/index.css";
import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = props => {
  const [content, setContent] = React.useState(null);
  const [price, setPrice] = React.useState("00:00");
  const handleContentChange = event => {
    setContent(event.target.value);
  };
  const handlePriceChange = event => {
    setPrice(event.format("HH:mm"));
  };
  const handleSubmit = event => {
    event.preventDefault();
    const requestData = {
      content: content,
      price: price
    };
    axios.post("http://localhost:8000/item/", requestData).then(res => {
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
        <Modal.Title>新しくアイテムを作成</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="control">
            <label htmlFor="itemnumber">タスク番号</label>
            {props.itemNextNumber}
          </div>
          <div className="control">
            <label htmlFor="content">内容</label>
            <textarea id="content" onChange={handleContentChange} />
          </div>
          <div className="control">
            <label htmlFor="price">締め切り</label>
            <TimePicker
              defaultValue={moment("00:00", "HH:mm")}
              showSecond={false}
              allowEmpty={false}
              minuteStep={5}
              id="price"
              onChange={handlePriceChange}
            />
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

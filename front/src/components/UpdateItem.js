import React from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import axios from "axios";
import "../style/App.scss";
import "../style/MakeItem.scss";
import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = props => {
  const itemId = props.itemId;
  const itemContent = props.itemContent;
  const itemPrice = props.itemPrice;
  const [Content, setContent] = React.useState(itemContent);
  const [Price, setPrice] = React.useState(itemPrice);
  const handleContentChange = event => {
    setContent(event.target.value);
  };
  const handlePriceChange = event => {
    setPrice(event.format("HH:mm"));
  };
  const handleSubmit = event => {
    event.preventDefault();
    const requestData = {
      content: Content,
      price: Price
    };
    axios.put(`http://localhost:8000/item/${itemId}`, requestData).then(res => {
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
        <Modal.Title>アイテムを変更</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="control">
            <label htmlFor="itemnumber">アイテム番号</label>
            {props.itemIndex}
          </div>
          <div className="control">
            <label htmlFor="content">内容</label>
            <textarea
              id="content"
              placeholder={itemContent}
              onChange={handleContentChange}
            />
          </div>
          <div className="control">
            <label htmlFor="price">料金</label>
            <TimePicker
              defaultValue={moment(itemPrice, "HH:mm")}
              showSecond={false}
              allowEmpty={false}
              minuteStep={5}
              id="price"
              onChange={handlePriceChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={props.onHide}>
            変更
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const UpdateItem = props => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn-icon"
        onClick={() => setModalShow(true)}
      >
        <i className="fa fa-pencil"></i>
      </button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        itemId={props.itemId}
        itemIndex={props.itemIndex}
        itemContent={props.itemContent}
        itemPrice={props.itemPrice}
        view={props.view}
      />
    </React.Fragment>
  );
};

export default UpdateItem;

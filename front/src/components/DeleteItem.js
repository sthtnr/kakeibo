import React from "react";
import axios from "axios";
import "../style/App.scss";
import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = props => {
  const itemId = props.itemId;
  const itemContent = props.itemContent;
  const itemPrice = props.itemPrice;
  const handleSubmit = event => {
    event.preventDefault();
    axios.delete(`http://localhost:8000/item/${itemId}`).then(res => {
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
        <Modal.Title>アイテムを消去</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>以下のアイテムが消去されます</p>
          <div>タスク番号: {props.itemIndex}</div>
          <div>内容: {itemContent}</div>
          <div>締め切り: {itemPrime}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={props.onHide}>
            消去
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const DeleteItem = props => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn-icon"
        onClick={() => {
          setModalShow(true);
        }}
      >
        <i className="fa fa-ban" aria-hidden="true"></i>
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

export default DeleteItem;

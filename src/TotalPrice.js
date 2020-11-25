import React, { useState } from 'react';
import { Button, Control, Container, Row, Col, ListGroup } from 'react-bootstrap';
import './App.css';


const TotalPrice = ({quantity, price}) => {

  const totalAmount = (quantity * price)

  return (
    <>
      <Col >
      <h3>$12/pin</h3>
      <h3><strong>Order Total:</strong> ${totalAmount}</h3>
      </Col>


    </>
  );
};

export default TotalPrice;
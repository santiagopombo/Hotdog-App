import React, { useState } from 'react';
import { Button, Control, Container, Row, Col  } from 'react-bootstrap';
import './App.css';


const HotdogPinCounter = ({onFewer, quantity, onMore}) => {

  const quantityDescription = quantity + ' pins'

  return (
    <>
    <Container >
    <Row className="counterRow" >
      <Button onClick={onFewer} className="CounterButtonLeft">–</Button>
      <input type="text" value={quantityDescription} readOnly className="CounterQuantity"/>
      <Button onClick={onMore} className="CounterButtonRight">+</Button>

    </Row>

    </Container>
    </>
  );
};

export default HotdogPinCounter;

import React from 'react';
import {FormGroup, Label, Input, Row, Col} from 'reactstrap';

import './styles.css';

function LikertQuestion({number, question, value, onChange}) {
  return (
    <>
        <FormGroup tag="fieldset">
            <p><b>{number}. {question}</b> <span>*</span></p>
            <Row>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 1} onChange={() => onChange(1)}/>
                        {' '}
                        <Label check={value === 1}>1</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 2} onChange={() => onChange(2)}/>
                        {' '}
                        <Label check={value === 2}>2</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 3} onChange={() => onChange(3)}/>
                        {' '}
                        <Label check={value === 3}>3</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 4} onChange={() => onChange(4)}/>
                        {' '}
                        <Label check={value === 4}>4</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 5} onChange={() => onChange(5)}/>
                        {' '}
                        <Label check={value === 5}>5</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 6} onChange={() => onChange(6)}/>
                        {' '}
                        <Label check={value === 6}>6</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input type="radio" checked={value === 7} onChange={() => onChange(7)}/>
                        {' '}
                        <Label check={value === 7}>7</Label>
                    </FormGroup>
                </Col>
            </Row>
        </FormGroup>
    </>
  );
}

export default LikertQuestion;
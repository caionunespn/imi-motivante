import React from 'react';
import {FormGroup, Label, Input, Row, Col} from 'reactstrap';

import './styles.css';

function LikertQuestion({number, question, values, currentValue, onChange}) {
  return (
    <>
        <FormGroup tag="fieldset">
            <p><b>{number}. {question}</b> <span>*</span></p>
            {values.map((value, index) => (
                <Row key={index}>
                    <FormGroup>
                        <Input type="radio" checked={currentValue === value} onChange={() => onChange(value)}/>
                        {' '}
                        <Label check={currentValue === value}>{value}</Label>
                    </FormGroup>
                </Row>
            ))}
        </FormGroup>
    </>
  );
}

export default LikertQuestion;
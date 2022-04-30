import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ChoiceQuestion from '../ChoiceQuestion';
import {Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';

function CheckPortuguese({previousStep, nextStep, changeData, initialState}) {
  const questions = [
    'Sua língua-materna é o português brasileiro?',
  ];
  const [values, setValues] = useState([
    initialState[questions[0]] || null,
  ]);
  const options = [
    [
      'Sim',
      'Não'
    ],
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleChangeValue(questionIndex, questionValue) {
    const newValues = values.map((value, valueIndex) => {
        if (questionIndex === valueIndex) {
            return questionValue;
        }
        return value;
    });
    setValues(newValues);
  }

  function customValidations() {
    if (values[0] === 'Não') {
        toast.error(`Infelizmente, para continuar o questionário você precisa ter o português como língua materna :(`);
        return false;
    }
    return true;
  }

  function validateData() {
    let valid = true;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value === null) {
        toast.error(`Por favor, responda a pergunta ${i+1}: "${questions[i]}"`);
        valid = false;
        break;
      }
    }

    if (!valid) return false;
    
    valid = customValidations();

    return valid;
  }

  function handleSubmit() {
    const dataOK = validateData();

    if (dataOK) {
      let data = {};
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        data = {
          ...data,
          [question]: values[i]
        }
      }

      changeData(data);
      nextStep();
    }
  }

  return (
    <div>
        <h3>Antes de continuar</h3>
        <p>Você respondeu que não mora no Brasil, então só pra confirmar...</p>
        <br />
        <br />
        {questions.map((question, index) => (
          <ChoiceQuestion
            key={index}
            number={index+1}
            question={question}
            values={options[index]}
            currentValue={values[index]}
            onChange={(value) => handleChangeValue(index, value)}
          />
        ))}
        <Row>
          {previousStep && (
            <Col md={10} sm={8} xs={6}>
              <Button onClick={previousStep}>Anterior</Button>
            </Col>
          )}
          {nextStep && (
            <Col md={2} sm={4} xs={6}>
              <Button onClick={handleSubmit}>Próximo</Button>
            </Col>
          )}
        </Row>
    </div>
  );
}

export default CheckPortuguese;
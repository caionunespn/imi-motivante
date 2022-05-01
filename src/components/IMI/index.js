/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {toast} from 'react-toastify';

import LikertQuestion from '../LikertQuestion';

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function IMI({previousStep, changeData, task, loading}) {
  const [currentTask, setCurrentTask] = useState('_____________');
  const questions = [
    `Ao ${currentTask}, eu pensava no quanto havia gostado disso.`,
    `Não me senti nervoso de forma alguma em ${currentTask}.`,
    `Senti que era minha escolha ${currentTask}.`,
    `Acho que sou bom em ${currentTask}.`,
    `Achei que ${currentTask} foi muito interessante`,
    `Eu me senti tenso ao ${currentTask}.`,
    `Em comparação a outros jogadores, acho que me sai bem em ${currentTask}.`,
    `${currentTask} foi divertido.`,
    `Eu me senti relaxado ao ${currentTask}.`,
    `Curti muito ${currentTask}.`,
    `Eu realmente não tive escolha sobre ${currentTask}.`,
    `Estou satisfeito com meu desempenho ao ${currentTask}`,
    `Eu estava ansioso ao ${currentTask}.`,
    `Achei que ${currentTask} foi muito chato.`,
    `Ao ${currentTask}, senti que estava fazendo o que eu queria.`,
    `Eu me senti muito habilidoso ao ${currentTask}.`,
    `Achei que ${currentTask} foi muito interessante`,
    `Eu me senti pressionado ao ${currentTask}.`,
    `Senti que tinha que ${currentTask}.`,
    `Eu descreveria ${currentTask} como muito agradável.`,
    `${currentTask} foi feito porque não tive escolha.`,
    `Depois de ${currentTask} por um tempo, me senti muito competente`,
  ];
  const [randomOrder, setRandomOrder] = useState([]);
  const [randomOrderValues, setRandomOrderValues] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  useEffect(() => {
    if (currentTask !== '_____________') {
      const random = shuffle(questions);
      const values = new Array(random.length).fill(null);
      setRandomOrderValues(values);
      setRandomOrder(random);
      setLoaded(true);
    }
  }, [currentTask]);

  function handleChangeValue(questionIndex, questionValue) {
    const newValues = randomOrderValues.map((value, valueIndex) => {
        if (questionIndex === valueIndex) {
            return questionValue;
        }
        return value;
    });
    setRandomOrderValues(newValues);
  }

  function customValidations() {
    return true;
  }

  function validateData() {
    let valid = true;
    for (let i = 0; i < randomOrderValues.length; i++) {
      const value = randomOrderValues[i];
      if (value === null) {
        toast.error(`Por favor, responda a pergunta ${i+1}: "${randomOrder[i]}"`);
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
      for (let i = 0; i < randomOrder.length; i++) {
        const question = randomOrder[i];
        data = {
          ...data,
          [`${i+1} - ${question}`]: randomOrderValues[i]
        }
      }

      changeData(data);
    }
  }

  if (!loaded) return <p>Carregando...</p>

  return (
    <div>
        <h3>Sobre a tarefa que você escolheu...</h3>
        <p>Com base na tarefa que você escolheu, responda o questionário a seguir. Para cada item, pense na sua experiência ao realizar a tarefa e escolha:</p>
        <p>1 - Discordo fortemente</p>
        <p>4 - Não concordo, nem discordo</p>
        <p>7 - Concordo fortemente</p>
        <p>Caso você considere que o item não se aplica à tarefa que você escolheu, deixe em branco.</p>
        <br />
        <br />
        {randomOrder.map((question, index) => (
            <LikertQuestion
                key={index}
                number={index+1}
                question={question}
                value={randomOrderValues[index]}
                onChange={(value) => handleChangeValue(index, value)}
            />
        ))}
        <Row>
          {previousStep && (
            <Col md={10} sm={8} xs={6}>
              <Button onClick={previousStep}>Anterior</Button>
            </Col>
          )}
          <Col md={2} sm={4} xs={6}>
            <Button disabled={loading} onClick={handleSubmit}>Enviar</Button>
          </Col>
        </Row>
    </div>
  );
}

export default IMI;
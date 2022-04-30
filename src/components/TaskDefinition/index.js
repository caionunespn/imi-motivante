import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ChoiceQuestion from '../ChoiceQuestion';
import {Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';

function TaskDefinition({previousStep, nextStep, changeData, initialState}) {
  const [textInputs, setTextInputs] = useState({
    jogo: initialState['jogo'] || '',
    tarefa: initialState['tarefa'] || '',
  }); 
  const questions = [
    'As frases fazem sentido e posso continuar com o questionário',
  ];
  const [values, setValues] = useState([
    initialState[questions[0]] || null,
  ]);
  const options = [
    [
        'Sim',
        'Não',
    ]
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  function handleChangeInput(field, value) {
    setTextInputs({
        ...textInputs,
        [field]: value,
    });
  }

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
        toast.error('Por favor, ajuste a tarefa para se adequar às frases')
        return false;
    }
    return true;
  }

  function validateData() {
    let valid = true;
    if (textInputs.jogo.trim() === '') {
        toast.error(`Por favor, responda a pergunta 1: "Qual jogo digital você vai considerar?"`);
        valid = false;
    } else if (textInputs.tarefa.trim() === '') {
        toast.error(`Por favor, responda a pergunta 2: "Qual tarefa nesse jogo você vai considerar?"`);
        valid = false;
    }
    if (!valid) return false;

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value === null) {
        toast.error(`Por favor, responda a pergunta ${i+3}: "${questions[i]}"`);
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
      let data = {
          ...textInputs,
      };
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
        <h3>Agora escolha uma tarefa!</h3>
        <p>Para continuar a pesquisa, preciso que você pense numa experiência recente que você tenha considerado <b>MOTIVANTE</b> durante o uso de um jogo digital.</p>
        <p>Pensou? Agora pense numa tarefa que, durante o uso desse jogo, te fez considerar a experiência desta forma.</p>
        <p>Calma que posso te dar um exemplo! Vamos supor que uma pessoa goste da franquia Mario ou goste de jogar coisas que a desafiam. Neste cenário, um exemplo de tarefa que pode ser considerada motivante para essa pessoa é: "Terminar a primeira fase do jogo Super Mario World sem ser atacado por nenhum inimigo".</p>
        <br />
        <br />
        <FormGroup>
            <Label for="jogo">
            1. Qual jogo digital você vai considerar? <span>*</span>
            </Label>
            <Input id="jogo" value={textInputs.jogo} onChange={({currentTarget}) => handleChangeInput('jogo', currentTarget.value)} />
        </FormGroup>
        <br />

        <FormGroup>
            <Label for="tarefa">
            2. Qual tarefa neste jogo você vai considerar? <span>*</span>
            </Label>
            <Input id="tarefa" value={textInputs.tarefa} onChange={({currentTarget}) => handleChangeInput('tarefa', currentTarget.value)} />
        </FormGroup>
        <br />
        <p><b>Atenção!</b></p>
        <p>Substitua a tarefa que você digitou no espaço em branco nas frases abaixo:</p>
        <p><b>Eu gosto de ________________</b></p>
        <p><b>Eu sou bom em _______________</b></p>
        <p>Observe se as frases fazem sentido. Caso as frases não tenham ficado adequadas, por favor, ajuste a tarefa de forma com que elas façam sentido.</p>
        <br />
        {questions.map((question, index) => (
          <ChoiceQuestion
            key={index}
            number={index+3}
            question={question}
            values={options[index]}
            currentValue={values[index]}
            onChange={(value) => handleChangeValue(index, value)}
          />
        ))}
        <Row sm={12}>
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

export default TaskDefinition;
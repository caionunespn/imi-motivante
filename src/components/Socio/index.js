import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ChoiceQuestion from '../ChoiceQuestion';
import {Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';

function Socio({previousStep, nextStep, checkPortuguese, changeData, initialState}) {
  const [age, setAge] = useState(initialState['Que ano você nasceu?'] || '');
  const questions = [
    'Com qual gênero você se identifica?',
    'Atua ou já atuou / estudou na área de Tecnologia de Informação (Ex: Computação, Sistemas de Informação, Teleinformática, afins) ?',
    'Em qual região do país você reside?',
    'Qual seu nível de formação?',
    'Qual a faixa salarial mensal da sua residência?',
  ];
  const [values, setValues] = useState([
    initialState[questions[0]] || null,
    initialState[questions[1]] || null,
    initialState[questions[2]] || null,
    initialState[questions[3]] || null,
    initialState[questions[4]] || null,
  ]);
  const options = [
    [
      'Masculino',
      'Feminino',
      'Prefiro não dizer',
      'Outro',
    ],
    [
      'Sim',
      'Não'
    ],
    [
      'Norte',
      'Nordeste',
      'Centro-Oeste',
      'Sudeste',
      'Sul',
      'Não moro no Brasil',
    ],
    [
      'Ensino fundamental incompleto',
      'Ensino fundamental completo',
      'Ensino médio incompleto',
      'Ensino médio completo',
      'Ensino superior incompleto',
      'Ensino superior completo',
      'Pós-graduação completa',
    ],
    [
      'Até R$1.100',
      'Entre R$1.100 e R$1.819',
      'Entre R$1.819 e R$7.278',
      'Entre R$7.278 a R$11.001',
      'R$11.001 ou mais'
    ]
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
    return true;
  }

  function validateData() {
    let valid = true;
    if (age.trim() === '') {
      toast.error(`Por favor, responda a pergunta 1: "Que ano você nasceu?"`);
      valid = false;
    } else {
      try {
        const intAge = parseInt(age);
        if (intAge === undefined || isNaN(intAge)) {
          throw Error();
        }
        if (intAge < 1940 || intAge > 2004) {
          toast.error('O ano de nascimento deve estar entre 1940 e 2004');
          valid = false;
        }
      } catch (err) {
        toast.error(`O ano de nascimento inserido é inválido`);
        valid = false;
      }
    }

    if (!valid) return false;

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
      let data = {
        'Que ano você nasceu?': age,
      };
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        data = {
          ...data,
          [question]: values[i]
        }
      }

      changeData(data);
      if (data['Em qual região do país você reside?'] === 'Não moro no Brasil') {
        checkPortuguese();
      } else {
        nextStep();
      }
    }
  }

  return (
    <div>
        <h3>Nos fale um pouco sobre você :)</h3>
        <br />
        <br />
        <FormGroup>
            <Label for="idade">
            1. Que ano você nasceu? <span>*</span>
            </Label>
            <Input id="idade" value={age} onChange={({currentTarget}) => setAge(currentTarget.value)} />
        </FormGroup>
        <br />
        {questions.map((question, index) => (
          <ChoiceQuestion
            key={index}
            number={index+2}
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

export default Socio;
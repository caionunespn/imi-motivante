import React, {useState} from 'react';
import {toast} from 'react-toastify';
import ChoiceQuestion from '../ChoiceQuestion';
import {Row, Col, Button} from 'reactstrap';

function Intro({previousStep, nextStep, changeData, initialState}) {
  const questions = [
    'Você deseja participar da pesquisa',
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
      toast.error('Para prosseguir, você precisa aceitar participar da pesquisa!');
      return false;
    }

    return true;
  }

  function validateData() {
    let valid = true;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value === null) {
        toast.error(`Por favor, responda a pergunta "${questions[i]}"`);
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
        <h3>Intrinsic Motivation Inventory Task Evaluation Questionnaire (IMI-TEQ) - Experiências Motivantes</h3>
        <p>Prezado(a) colaborador(a),</p>
        <p>Somos pesquisadores da Universidade Federal do Ceará e estamos conduzindo um estudo para validar a tradução para o português brasileiro do questionário Intrinsic Motivation Inventory Task Evaluation Questionnaire (IMI-TEQ).</p>
        <p>Para efetivação do estudo, gostaríamos de contar com sua colaboração respondendo a este formulário, que dura em torno de 15 minutos.</p>
        <p><b>Antes de continuar, é importante esclarecer as seguintes informações sobre a pesquisa:</b></p>
        <p>- Sua participação no estudo é totalmente voluntária e, portanto, você não é obrigado a fornecer as informações e/ou colaborar com as atividades solicitadas pelos pesquisadores, podendo, a qualquer momento, desistir do mesmo.</p>
        <p>- As respostas coletadas são de caráter anônimo e confidencial.</p>
        <p>Por fim, nos colocamos à disposição para quaisquer dúvidas através do email: <b>caioeduardo@alu.ufc.br</b>.</p>
        <p><b>Atenciosamente,</b></p>
        <p><b>Profa. Dra. Ticianne Darin</b></p>
        <p><b>Caio Eduardo Pereira Nunes</b></p>
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
          <Col md={10} sm={8} xs={6}/>
          <Col md={2} sm={4} xs={6}>
            <Button onClick={handleSubmit}>Próximo</Button>
          </Col>
        </Row>
    </div>
  );
}

export default Intro;
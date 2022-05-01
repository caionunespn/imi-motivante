import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import ChoiceQuestion from '../ChoiceQuestion';
import {Row, Col, Button, FormGroup, Label, Input} from 'reactstrap';

import "./styles.css";

function TCLE({previousStep, nextStep, changeData, initialState}) {
  const [textInputs, setTextInputs] = useState({
    nome: initialState['nome'] || '',
    rg: initialState['rg'] || '',
    idade: initialState['idade'] || '',
  }); 
  const questions = [
    'Declaro minha participação',
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
      toast.error(`Para participar da pesquisa, você precisa declarar o seu aceite no termo de consentimento.`);
      return false;
    } 
    return true;
  }

  function validateData() {
    let valid = true;
    if (textInputs.nome.trim() === '') {
        toast.error(`Por favor, responda a pergunta: "Nome"`);
        valid = false;
    } else if (textInputs.idade.trim() === '') {
        toast.error(`Por favor, responda a pergunta: "Idade"`);
        valid = false;
    } else if (textInputs.rg.trim() === '') {
        toast.error(`Por favor, responda a pergunta: "RG"`);
        valid = false;
    } else {
        try {
            const intAge = parseInt(textInputs.idade);
            if (intAge === undefined || isNaN(intAge)) {
                throw Error();
            }
        } catch (err) {
            toast.error(`A idade inserida é inválida`);
            valid = false;
        }
    }
    if (!valid) return false;

    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value === null) {
        toast.error(`Por favor, responda a pergunta: "${questions[i]}"`);
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
        <h3>Termo de Consentimento Livre e Esclarecido -  Intrinsic Motivation Inventory Task Evaluation Questionnaire (IMI-TEQ)</h3>
        <p>Eu estou sendo convidado a participar do estudo denominado <b>"Validação da tradução do questionário Intrinsic Motivation Inventory (IMI) Task Evaluation Questionnaire para o português brasileiro"</b>, cujos objetivos e justificativas são:</p>
        <p><b>Validar a tradução do questionário Intrinsic Motivation Inventory Task Evaluation Questionnaire (IMI-TEQ) para a língua portuguesa e sua adaptação transcultural ao contexto brasileiro.</b></p>
        <p>O IMI é um questionário produzido e validado na língua inglesa e é usado em diversas pesquisas de diferentes áreas (ex. educação, saúde, tecnologia) para medir a motivação intrínseca, explicada pela teoria da autodeterminação como sendo comportamentos que são motivados pelo interesse da pessoa, apenas pelo sentimento de satisfação. O IMI-TEQ é uma versão menor do questionário IMI, com 22 itens, usado principalmente para medir a motivação intrínseca e auto-regulação em tarefas genéricas. A tradução e validação do IMI-TEQ para pesquisas no Brasil é necessária visto que a utilização de questionários em diferentes idiomas pode comprometer a validade de pesquisas científicas. Na falta de questionários traduzidos validados, os pesquisadores criam traduções livres, o que pode levar a inconsistências e perda de validade dos resultados.</p>
        <p><b>A minha participação no referido estudo será no sentido de fornecer dados para validação estatística do questionário IMI-TEQ traduzido para o português brasileiro. Para isso, eu fornecerei:</b></p>
        <p>- Dados sociodemográficos (ex. idade, escolaridade, gênero, ocupação)</p>
        <p>- Descreverei uma experiência à minha escolha com uma tarefa dentro de um jogo digital que considerei motivante; e</p>
        <p>- Avaliarei a experiência descrita utilizando o IMI-TEQ traduzido.</p>
        <p><b>Fui alertado de que, da pesquisa a se realizar, posso esperar alguns benefícios, tais como:</b></p>
        <p>- Contribuir com a ciência, ajudando na melhoria e validação de um instrumento para a comunidade de pesquisa brasileira, que pode ser utilizado em diversas áreas, como educação, saúde e tecnologia, para medir conceitos relacionados à teoria da autodeterminação (motivação intrínseca e auto-regulação).</p>
        <p>- Fomentar o desenvolvimento de pesquisas e produtos que, utilizando o IMI-TEQ traduzido, serão criados levando em consideração fatores que motivam e engajam seu público-alvo, inclusive, potencialmente, a mim.</p>
        <p><b>Recebi, por outro lado, os esclarecimentos necessários sobre os possíveis desconfortos e riscos decorrentes do estudo, levando-se em conta que é uma pesquisa, e os resultados positivos ou negativos somente serão obtidos após a sua realização. Os possíveis riscos durante este processo são:</b></p>
        <p>- Cansaço ou aborrecimento ao responder os questionários;</p>
        <p>- Cansaço ou vergonha ao responder às perguntas;</p>
        <p>- Possibilidade de constrangimento ao responder o instrumento de coleta de dados</p>
        <p>- Medo de não saber responder ou de ser identificado.</p>
        <p><b>Estou ciente de que minha privacidade será respeitada, ou seja, meu nome ou qualquer outro dado ou elemento que possa, de qualquer forma, me identificar, será mantido em sigilo.</b></p>
        <p><b>Também fui informado de que posso me recusar a participar do estudo, ou retirar meu consentimento a qualquer momento, sem precisar justificar, e de, por desejar sair da pesquisa, não sofrerei qualquer prejuízo à assistência que venho recebendo.</b></p>
        <br />
        <p><b>Endereço dos responsáveis pela pesquisa:</b></p>
        <div className="small-texts">
          <p>Nome: Ticianne de Gois Ribeiro Darin e Caio Eduardo Pereira Nunes</p>
          <p>Instituição: Universidade Federal do Ceará</p>
          <p>Endereço: Campus do Pici - Bloco 1430 CEP 60.440-554 Fortaleza - CE</p>
          <p>Telefones para contato: (85) 85996181086</p>
          <p>ATENÇÃO: Se você tiver alguma consideração ou dúvida, sobre a sua participação na pesquisa, entre em contato com o Comitê de Ética em Pesquisa da UFC/PROPESQ – Rua Coronel Nunes de Melo, 1000 - Rodolfo Teófilo, fone: 3366-8344/46. (Horário: 08:00-12:00 horas de segunda a sexta-feira).</p>
          <p>O CEP/UFC/PROPESQ é a instância da Universidade Federal do Ceará responsável pela avaliação e acompanhamento dos aspectos éticos de todas as pesquisas envolvendo seres humanos.</p>
        </div>
        <br />
        <FormGroup>
            <Label for="nome">
            <b>1. Nome <span>*</span></b>
            </Label>
            <Input id="nome" value={textInputs.nome} onChange={({currentTarget}) => handleChangeInput('nome', currentTarget.value)} />
        </FormGroup>
        <br />
        <FormGroup>
            <Label for="idade">
            <b>2. Idade <span>*</span></b>
            </Label>
            <Input id="idade" value={textInputs.idade} onChange={({currentTarget}) => handleChangeInput('idade', currentTarget.value)} />
        </FormGroup>
        <br />
        <FormGroup>
            <Label for="rg">
            <b>3. RG <span>*</span></b>
            </Label>
            <Input id="rg" value={textInputs.rg} onChange={({currentTarget}) => handleChangeInput('rg', currentTarget.value)} />
        </FormGroup>
        <br />
        <p><b>Eu declaro que é de livre e espontânea vontade que estou como participante de uma pesquisa. Eu declaro que li cuidadosamente este Termo de Consentimento Livre e Esclarecido e que, após sua leitura, tive a oportunidade de fazer perguntas sobre o seu conteúdo, como também sobre a pesquisa, e recebi explicações que responderam por completo minhas dúvidas. E declaro, ainda, estar recebendo uma via assinada deste termo.</b></p>
        {questions.map((question, index) => (
          <ChoiceQuestion
            key={index}
            number={index+4}
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

export default TCLE;
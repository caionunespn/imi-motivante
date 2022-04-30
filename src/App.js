/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {ToastContainer} from 'react-toastify';
import {Row, Col} from 'reactstrap';
import Intro from "./components/Intro";
import TCLE from "./components/TCLE";
import Socio from "./components/Socio";
import CheckPortuguese from "./components/CheckPortuguese";
import TaskDefinition from "./components/TaskDefinition";
import IMI from "./components/IMI";
import Thanks from "./components/Thanks";

import './global.css';

function App() {
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState({
    intro: {},
    tcle: {},
    socio: {},
    portugueseCheck: {},
    taskDefinition: {},
    imi: {},
  });

  useEffect(() => {
    if (Object.keys(payload.imi).length > 0) {
      handleSubmit();
    }
  }, [payload]);

  function handleChangePayload(field, newData) {
    setPayload({
      ...payload,
      [field]: newData,
    });
  }

  async function handleSubmit() {
    console.log(payload);
  }

  function renderCurrentComponent() {
    switch(step) {
      case 1:
        return (<Intro nextStep={() => setStep(2)} changeData={(data) => handleChangePayload('intro', data)} initialState={payload.intro} />);
      case 2:
        return (<TCLE previousStep={() => setStep(1)} nextStep={() => setStep(3)} changeData={(data) => handleChangePayload('tcle', data)} initialState={payload.tcle} />)
      case 3:
        return (<Socio previousStep={() => setStep(2)} nextStep={() => setStep(4)} checkPortuguese={() => setStep(7)} changeData={(data) => handleChangePayload('socio', data)} initialState={payload.socio} />)
      case 4:
        return (<TaskDefinition previousStep={(payload.portugueseCheck && payload.socio['Em qual região do país você reside?'] === 'Não moro no Brasil') ? () => setStep(7) : () => setStep(3)} nextStep={() => setStep(5)} changeData={(data) => handleChangePayload('taskDefinition', data)} initialState={payload.taskDefinition} />)
      case 5:
        return (<IMI previousStep={() => setStep(4)} changeData={(data) => handleChangePayload('imi', data)} task={payload.taskDefinition ? payload.taskDefinition.tarefa : null} />)
      case 6:
        return (<Thanks />)
      case 7:
        return (<CheckPortuguese previousStep={() => setStep(3)} nextStep={() => setStep(4)} changeData={(data) => handleChangePayload('portugueseCheck', data)} initialState={payload.portugueseCheck} />)
      default:
        return (<p>Recarregue a página...</p>)
    }
  }

  return (
    <Row className="form-wrapper">
      <Col
        md={{
          offset: 2,
          size: 8
        }}
        sm="12"
      >
        {renderCurrentComponent()}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Col>
    </Row>
  );
}

export default App;

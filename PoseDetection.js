import {useState, useRef, useReducer} from 'react';
import * as bodypix from"@tensorflow-models/body-pix";
import Webcam from 'react-webcam';

function PoseDetection(){
  const [model,setModel]=useState(null);

  const loadModel = async () =>{
    next();
    const net=await bodypix.load();
    setModel(net);
    next();
  }

  const start = async () => {
    next();
    setStateWebcam(true);
    setInterval(() => {
      detect(model);
    }, 10);
  }

  const stop = () => {
    next();
    setStateWebcam(false);
  }

  const macchina = {
    initial: "initial",
    states: {
      initial: { on: { next: 'loadingModel'} },
      loadingModel: { on: { next: 'startDetection'} },
      startDetection: { on: { next: 'stopDetection'} },
      stopDetection: { on: { next: 'startDetection'} },
    }
  }

  const actionButton = {
    initial: {action: loadModel, text: 'Load model'},
    loadingModel: {text: 'Loading'},
    startDetection: {action: start,text: 'Start'},
    stopDetection: {action: stop,text: 'Stop'},
  }

  const reducer = (state, event) =>
  machine.states[state].on[event] || machine.initial;

  const [appState, dispatch] = useReducer(reducer, machine.initial);
  const next = () => dispatch("next");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [stateWebcam, setStateWebcam] = useState(false);
}

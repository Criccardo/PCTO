import {useState, useRef, useReducer} from 'react';
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from 'react-webcam';

function RealTimeDetection(){
    const [model, setModel] = useState(null);

    const loadmodel = async () =>{
        next();
        const net= await cocossd.load();
        setModel(net);
        next();
    };

    const start = async () =>{
        next();
        setStateWebcam(true);
        setInterval(()=>{
            detect(model);
        }, 10)
    }

    const stop = () =>{
        next();
        setStateWebcam(false);
    }

    const macchina = {
        initial:"initial",
        states: {
            initial: {on: {next: 'loadingModel'}},
            loadingModel: {on: {next: 'startDetection'}},
            startDetection: {on: {next: 'stopDetection'}},
            stopDetection: {on: {next: 'startDetection'}},
        }
    }

    const actionButton={
        initial:{  action: loadModel, text: 'Load model'},
        loadingModel: { text: 'Loading'},
        startDetection: { action: start, text: 'Start'},
        stopDetection: { action: stop, text:'Stop'},
    }

    const reducer =(state, event )=> 
        {macchina.states[state].on[event] || macchina.initial;}

    const [appState, dispatch]= useReducer(reducer, macchina.initial);

    const next=()=>dispatch("next");


    const webcamRef= useref(null);
    const canvasRef= useRef(null);
    const[stateWebcam, setStateWebcam]=useState(false);


    function drawRect(detections, ctx){ 
            
        detections.forEach(prediction => {
            const [x,y, width, height] = prediction['bbox'];
            const text=prediction['class']+" "+Math.round(prediction['score']*100) + "%";
            
            const color =Math.floor(Math.random()*16772721).toString(16);
            ctx.strokeStyle = '#' + color
            ctx.lineWidth = 3
            ctx.font = '18px Bungee';

            ctx.beginPath();
            ctx.rect(x,y,width,height);
            ctx.stroke();
        });

    }

    const detect= async (net)=>{

        if(
            typeof webcamRef.current !== "undefined" && 
            webcamRef.current !== null && 
            webcamRef.current.video.readyState === 4
        ){
            const video = webcamRef.current.video;

            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width=videoWidth;
            webcamRef.current.video.height=videoHeight;

            canvasRef.current.width=videoWidth;
            canvasRef.current.height=videoHeight;

            const obj = await net.detect(video);
            console.log(obj);


            const ctx= canvasRef.current.getContext("2d");
            draw(obj, ctx);


        }
    };


    return(

        <div className="real-time-detection d-flex flex-column align-items-center">
            {
                stateWebcam && (

                    <div>
                        <Webcam
                            ref={webcamRef}
                            muted={true}
                            screenshotFormat="image/jpeg"
                            style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                                left: 0,
                                right: 0,
                                textAlign:"center",
                                width: 640,
                                height: 480,
                            }}
                        />

                        <canvas 
                            ref={canvasRef}
                            style={{
                                position: "absolute",
                                marginLeft: "auto",
                                marginRight: "auto",
                                left: 0,
                                right: 0,
                                textAlign: "center",
                                width: 640,
                                height: 480,
                            }}
                    
                        />

                    </div>
                )
            }

            <button className="btn btn-outline-warning rounded-0 mt-4 mb-5" style={{width:150,}} onClick={actionButton[appState].action || (() => {})}>
                <strong>{actonButton[appState].text}</strong>
            </button>

        </div>
    )
}


export default RealTimeDetection;
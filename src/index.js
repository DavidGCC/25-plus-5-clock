import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const Title = () => (
    <h1 className="m-auto">25 + 5 Clock</h1>
);

const BreakControl = ({ breakValue, setBreakValue }) => {

    const handleClick = operation => {
        if (operation === "+") {
            if (breakValue < 60) {
                setBreakValue(pv => pv + 1);
            }
        } else {
            if (breakValue > 1) {
                setBreakValue(pv => pv - 1);
            }
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h3 id="break-label">Break Length</h3>
            <div className="timeControls d-flex align-items-center justify-content-around">
                <button id="break-decrement" onClick={() => handleClick("-")} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-down fa-2x"></i>
                </button>
                <p id="break-length">{breakValue}</p>
                <button id="break-increment" onClick={() => handleClick("+")} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-up fa-2x"></i>
                </button>
            </div>
        </div>
    );
};

const SessionControl = ({ sessionValue, setSessionValue }) => {
    const handleClick = operation => {
        if (operation === "+") {
            if (sessionValue < 60) {
                setSessionValue(pv => pv + 1);
            }
        } else {
            if (sessionValue > 1) {
                setSessionValue(pv => pv - 1);
            }
        }
    };
    return (
        <div className="d-flex flex-column align-items-center">
            <h3 id="session-label">Session Length</h3>
            <div className="timeControls d-flex align-items-center justify-content-around">
                <button id="session-decrement" onClick={() => handleClick("-")} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-down fa-2x"></i>
                </button>
                <p id="session-length">{sessionValue}</p>
                <button id="session-increment" onClick={() => handleClick("+")} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-up fa-2x"></i>
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [breakValue, setBreakValue] = React.useState(5);
    const [sessionValue, setSessionValue] = React.useState(25);

    return (
        <div id="outer-container" className="container d-flex justify-content-center">
            <div id="container" className="w-75 d-flex flex-column align-items-center">
                <Title />
                <div className="d-flex w-75 justify-content-center mt-3 mb-3">
                    <BreakControl breakValue={breakValue} setBreakValue={setBreakValue} />
                    <SessionControl sessionValue={sessionValue} setSessionValue={setSessionValue} />
                </div>
            </div>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);
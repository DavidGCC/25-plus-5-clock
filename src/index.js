import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const Title = () => (
    <h1 className="m-auto">25 + 5 Clock</h1>
);

const BreakControl = ({ breakValue, handleTimeControl }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h3 id="break-label">Break Length</h3>
            <div className="timeControls d-flex align-items-center justify-content-around">
                <button id="break-decrement" onClick={() => handleTimeControl("break", -1)} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-down fa-2x"></i>
                </button>
                <p id="break-length">{breakValue}</p>
                <button id="break-increment" onClick={() => handleTimeControl("break", 1)} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-up fa-2x"></i>
                </button>
            </div>
        </div>
    );
};

const SessionControl = ({ sessionValue, handleTimeControl }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h3 id="session-label">Session Length</h3>
            <div className="timeControls d-flex align-items-center justify-content-around">
                <button id="session-decrement" onClick={() => handleTimeControl("session", -1)} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-down fa-2x"></i>
                </button>
                <p id="session-length">{sessionValue}</p>
                <button id="session-increment" onClick={() => handleTimeControl("session", 1)} className="btn btn-lg shadow-none">
                    <i className="far fa-arrow-alt-circle-up fa-2x"></i>
                </button>
            </div>
        </div>
    );
};

const Timer = ({ currentLabel, timeLeft }) => {
    const [timerDisplay, setTimerDisplay] = React.useState();
    React.useEffect(() => {
        const hh = String(Math.trunc(timeLeft / 60)).replace(/^(\d)$/, "0$1");
        const ss = String(Math.trunc(timeLeft % 60)).replace(/^(\d)$/, "0$1");
        setTimerDisplay(`${hh}:${ss}`);
    }, [timeLeft]);
    return (
        <div className="d-flex flex-column align-items-center w-50">
            <h3 id="timer-label">{currentLabel}</h3>
            <p id="time-left" className="w-75">{timerDisplay}</p>
        </div>
    );
};

const TimerControls = ({ isRunning, toggleTimer, reset }) => {
    const startPauseClass = isRunning ? "fas fa-pause" : "fas fa-play";
    return (
        <div>
            <button id="start_stop" className="btn btn-lg shadow-none" onClick={toggleTimer}>
                <i className={startPauseClass}></i>
            </button>
            <button id="reset" className="btn btn-lg shadow-none" onClick={reset}>
                <i className="fas fa-sync-alt"></i>
            </button>
        </div>
    );
};

const App = () => {
    const [breakValue, setBreakValue] = React.useState(5);
    const [sessionValue, setSessionValue] = React.useState(25);
    const [isRunning, setIsRunning] = React.useState(false);
    const [timerInterval, setTimerInterval] = React.useState();
    const [timer, setTimer] = React.useState({ for: "Session", value: 1 });
    const audioRef = React.useRef(null);

    const beginTimer = () => {
        setTimerInterval(setInterval(() => {
            setTimer(ps => {
                if (ps.value !== 0) {
                    return { ...ps, value: ps.value - 1 };
                } else {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                    if (ps.for === "Session") {
                        return {
                            for: "Break",
                            value: breakValue * 60
                        };
                    } else {
                        return {
                            for: "Session",
                            value: sessionValue * 60
                        };
                    }
                }
            });
        }, 1000));
    };

    const toggleTimer = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(timerInterval);
        } else {
            setIsRunning(true);
            beginTimer();
        }
    };

    const handleTimeControl = (type, amount) => {
        if (!isRunning) {
            if (type === "break") {
                if (breakValue + amount > 0 && breakValue + amount <= 60) {
                    setBreakValue(breakValue + amount);
                    if (timer.for === "Break") {
                        setTimer({...timer, value: (breakValue + amount) * 60});
                    }
                }
            } else {
                if (sessionValue + amount > 0 && sessionValue + amount <= 60) {
                    setSessionValue(sessionValue + amount);
                    if (timer.for === "Session") {
                        setTimer({...timer, value: (sessionValue + amount) * 60});
                    }
                }
            }
        }
    };
    const reset = () => {
        setBreakValue(5);
        setSessionValue(25);
        setIsRunning(false);
        setTimer({ for: "Session", value: 1500 });
        clearInterval(timerInterval);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    };

    return (
        <div id="outer-container" className="container d-flex justify-content-center">
            <div id="container" className="w-75 d-flex flex-column align-items-center">
                <Title />
                <div className="d-flex w-75 justify-content-center mt-3 mb-3">
                    <BreakControl breakValue={breakValue} handleTimeControl={handleTimeControl} />
                    <SessionControl sessionValue={sessionValue} handleTimeControl={handleTimeControl} />
                </div>
                <Timer currentLabel={timer.for} timeLeft={timer.value} />
                <TimerControls isRunning={isRunning} toggleTimer={toggleTimer} reset={reset} />
                <audio id="beep" ref={audioRef} src="/beep.mp3" />
            </div>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);
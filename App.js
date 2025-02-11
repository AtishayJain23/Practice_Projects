import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timetid, setTimerTid] = useState(0);
  

   const handleClick = () => {
    if(hour < 0 || minute < 0 || second <= 0 ){
      alert("Please enter the data in all fields");
      return;
    }
    else{
      setIsStart(true);
    } 
  };

  const handleReset = () => {
    setIsStart(false);
  }

  const handleInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if(id === "hours"){
      setHour(value)
    }
    else if(id === "minutes"){
      setMinute(value)
    }
    else{
      setSecond(value)
    }
  }

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(timetid);
  }

  const handleResume = () => {
    setIsPaused(false);
    runTimer(second, minute , hour);
  }

  const runTimer = (sec, min , hrs , tid) => {
    if(sec>0){
      setSecond((prev) => prev-1)
    }else if(min>0 && sec === 0){
      setMinute((prev) => prev-1);
      setSecond(59);
    }
    else{
      setHour((prev) => prev -1);
      setMinute(59);
      setSecond(59);

    }

    if(hour === 0 && minute ===0 && second ===0){
      handleReset();
    }
  }

  useEffect(()=> {
    let tid;
    if(isStart){
      tid = setInterval(()=> {
        runTimer(second, minute, hour , tid)
      }, 1000)
      setTimerTid(tid);
    };

    return() => {
      clearInterval(tid);
    }
    

  }, [isStart,hour,minute, second])

  return (
    <div className="App">
      <h1>CountDown Timer</h1>
      {!isStart && (
        <div className="input-container">
          <div className="input-boxes">
            <input onChange={handleInput} id="hours" placeholder="HH"></input>
            <input onChange={handleInput} id="minutes" placeholder="MM"></input>
            <input onChange={handleInput} id="seconds" placeholder="SS"></input>
          </div>
          <button className="timer-button" onClick={handleClick}>
            Start
          </button>
        </div>
      )}

      {isStart && (
        <div className="show-container">
          <div className="timer-box">
            <div>{hour < 10 ? `0${hour}` : hour}</div>
            <span>:</span>
            <div>{minute < 10 ? `0${minute}` : minute}</div>
            <span>:</span>
            <div>{second < 10 ? `0${second}` : second}</div>
          </div>

          <div className="action-box">
            {
              isPaused && 
              <button onClick={handleResume} className="timer-button">Resume</button>
            }

            {
              !isPaused && 
              <button onClick={handlePause} className="timer-button">Pause</button>

            }
          
            
            <button className="timer-button" onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

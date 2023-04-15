import React, { useEffect, useState } from "react";


import { useStore } from "../hooks-store/store";
import "./Timer.css";

const Timer = (props) => {
  const [state, dispatch] = useStore();
  const [httpError, setHttpError] = useState();
  const [timers, setTimers] =useState([]);

  useEffect(() => {

  if(state.seconds%10 === 0){  
  
    fetch('https://react-http-340ad-default-rtdb.europe-west1.firebasedatabase.app/timestamp.json', { 
      method: 'PATCH',
      body: JSON.stringify({
        timeStamp: state.timeStamp,
      })
      
    
  })}
    

    
  }, [dispatch, state.timeStamp]);

  useEffect(() => {
        
    const fetchTimerStamps = async () => {
      const response = await fetch('https://react-http-340ad-default-rtdb.europe-west1.firebasedatabase.app/timestamp.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      dispatch("ADDTIMESTAMP", responseData.timeStamp);   
      fetchHandler();
    };

    fetchTimerStamps().catch(error => {
    setHttpError(error.message);
    });           
    }, []);
    



  
  useEffect(() => {
    let interval = null;

    
      interval = setInterval(() => {
         dispatch("TICK", 1, state.timeStamp);        
      }, 1000);
    

    return () => clearInterval(interval);
  }, [dispatch, state.timeStamp]);


  const inputHandler = (event) => {
    dispatch("SAVETICKETNUMBER", event.target.value);
  }
  const  sendHandler = async () => {
    const response = await fetch('https://react-http-340ad-default-rtdb.europe-west1.firebasedatabase.app/timer.json', { 
      method: 'POST',
      body: JSON.stringify({
        seconds: state.renderedSeconds,
        minutes: state.renderedMinutes,
        hours: state.hours,
        ticket: state.ticketNumber,
        timeStamp: state.timeStamp,
      })
   });
   fetchHandler();
  }


  const fetchHandler =() => {
    const fetchTimers = async () => {
      const response = await fetch(
        'https://react-http-340ad-default-rtdb.europe-west1.firebasedatabase.app/timer.json'
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedTimers = [];
      for (const key in responseData) {
        loadedTimers.push({
          id: key,
          seconds: responseData[key].seconds,
          minutes: responseData[key].minutes,
          hours: responseData[key].hours,
          ticket: responseData[key].ticket
        });
      }
      let temp = "";        
      for(let timer of loadedTimers){
        
        temp += timer.ticket +": ";
        temp += timer.hours+ " hours, ";
        temp += timer.minutes+ " minutes, ";
        temp += timer.seconds+ " seconds | ";
      }
      
      setTimers(temp);  
    };
    
    fetchTimers().catch(error => {
    setHttpError(error.message);
    });
  };


  const deleteHandler =() => {

    const confirm = window.confirm( 'Are you sure you want to delete?');
    const fetchDelete = async () => {
      const response = await fetch(
        'https://react-http-340ad-default-rtdb.europe-west1.firebasedatabase.app/timer.json', {method: 'DELETE'} 
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      fetchHandler();
    };
    if(confirm){

    
    fetchDelete().catch(error => {
    setHttpError(error.message);
    })};
    
      
      
    
    
  };

  return (
    <div className="counter">
      <div>Mitäsmäteinkään</div>
      <p>Tiketti: <input type="text" onChange={inputHandler}></input></p>
      
      <div>
      {state.ticketNumber}:   {state.hours}h{" "}
        {state.renderedMinutes === 60 ? 0 : state.renderedMinutes}m{" "}
        {state.renderedSeconds === 60 ? 0 : state.renderedSeconds}s
      </div>

      <button onClick={sendHandler}>SEND</button>
      <button onClick={() => dispatch("RESET")}>RESET</button>
      <button onClick={deleteHandler}>DELETE</button>
      <button onClick={() => dispatch("FAKE", Math.floor(Math.random() * (19200000 - 1200000 + 1) + 1200000))}>Fake timestamp</button>
      

      
      <br />{timers.toString().split('|')[0]}
      <br />{timers.toString().split('|')[1]}
      <br />{timers.toString().split('|')[2]}
      <br />{timers.toString().split('|')[3]}
      <br />{timers.toString().split('|')[4]}
      <br />{timers.toString().split('|')[5]}
      <br />{timers.toString().split('|')[6]}
      <br />{timers.toString().split('|')[7]}
      <br />{timers.toString().split('|')[8]}
      <br />{timers.toString().split('|')[9]}
      <br />{timers.toString().split('|')[10]}
      <br />Current timeStamp in use: {state.timeStamp}
    </div>
  );
};

export default Timer;

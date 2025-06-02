import React, { useRef, useState, useEffect } from "react";
import "./calculator.css";
import "../App.css"; // Assuming you have a global CSS file for styles
import CoinDropdown from "./Coindropdown.jsx"; // Importing the CoinDropdown component
import tiltCardStyle  from "../Tilt.js"; // Importing the tiltCardStyle function



const Calculator = () => {
  // This is a simple calculator that performs basic arithmetic operations
    // such as addition, subtraction, multiplication, and division.
const inputRef = useRef(null);
  const resultRef = useRef(null);
  const [result, setResult] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);

  const getInputValue = () => Number(inputRef.current.value || 0);

  const plus = (e) => {
    e.preventDefault();
    setResult((prev) => prev + getInputValue());
  }

  const minus = (e) => {
    e.preventDefault();
    setResult((prev) => prev - getInputValue());
  }

  const times = (e) => {
    e.preventDefault();
    setResult((prev) => prev * getInputValue());
  }

  const divide = (e) => {
    e.preventDefault();
    setResult((prev) => prev / getInputValue());
  }

  const resetInput = (e) => {
    e.preventDefault();
    inputRef.current.value = "";
  }

  const resetResult = (e) => {
    e.preventDefault();
    setResult(0);
  };

  const calculateResult = () => {
 if (selectedCoin) {
   setResult(selectedCoin.current_price * getInputValue());
 } else {
   alert("Please select a coin before calculating.");
 }
 
  }
   



  // This function is used to tilt the card based on mouse movement
useEffect(() => {
tiltCardStyle();
}, []);  


// 

  
  return (
    <div className="calculator-wrapper">
    <div className="calculator-card" id="tiltCard">
    <div className="calculator">
        <div className="calculator-header">
        <img className="calculator-icon" src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="calculator icon"></img>
        <h1>Currency Calc</h1></div>
      <div className="calculator-container">
      <form>
       
        <div className="coin-dropdown">

       <CoinDropdown  onCoinSelect={setSelectedCoin} />
          </div>
 
        <input
          ref={inputRef}
          type="number"
          placeholder="Amount of Coins"
        />
        <div className="result-display">
        <p>Result: <span ref={resultRef}>{result}</span></p>
        </div>
        
        <button type="button" className="button-no" onClick={plus}>add</button>
        <button type="button" className="button-no"onClick={minus}>minus</button>
        <button type="button" className="button-no"onClick={times}>*</button>
        <button type="button" className="button-no"onClick={divide}>/</button>
        <button type="button" onClick={resetInput}>C</button>
        <button type="button" onClick={resetResult}>CC</button>
        <button type="button" onClick={calculateResult}>=</button>
      </form>
    </div>
    </div>
    </div>
      </div>
  );
};

  export default Calculator;
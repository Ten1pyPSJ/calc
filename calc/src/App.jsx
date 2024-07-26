import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  subtract,
  multiply,
  divide,
  clear,
  setMemory,
  setOperation,
  calculate,
} from './redux/calkSlice';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [operationSet, setOperationSet] = useState(false);
  const result = useSelector((state) => state.calk.value);
  const dispatch = useDispatch();

  const handleNumberInput = (num) => {
    setInputValue((prevInputValue) => {
      if (!operationSet) {
        const newValue = prevInputValue === '0' ? num : prevInputValue + num;
        return newValue;
      } else {
        return prevInputValue + num;
      }
    });
  };

  const handleOperation = (op) => {
    if (!operationSet) {
      dispatch(setMemory(parseFloat(inputValue)));
      setInputValue(inputValue + op);
    } else {
      setInputValue(result + op);
    }
    dispatch(setOperation(op));
    setOperationSet(true);
  };

  const handleEqual = () => {
    if (operationSet) {
      dispatch(add(parseFloat(inputValue.slice(-1))));
    } else {
      dispatch(add(parseFloat(inputValue)));
    }
    dispatch(calculate());
    setInputValue(result.toString());
    setOperationSet(false);
  };

  const handleClear = () => {
    dispatch(clear());
    setInputValue('');
    setOperationSet(false);
  };

  return (
    <div>
      <div>Результат: {result}</div>
      <input type='text' value={inputValue} readOnly />
      <div>
        <button onClick={() => handleNumberInput('1')}>1</button>
        <button onClick={() => handleNumberInput('2')}>2</button>
        <button onClick={() => handleNumberInput('3')}>3</button>
        <button onClick={() => handleOperation('+')}>+</button>
      </div>
      <div>
        <button onClick={() => handleNumberInput('4')}>4</button>
        <button onClick={() => handleNumberInput('5')}>5</button>
        <button onClick={() => handleNumberInput('6')}>6</button>
        <button onClick={() => handleOperation('-')}>-</button>
      </div>
      <div>
        <button onClick={() => handleNumberInput('7')}>7</button>
        <button onClick={() => handleNumberInput('8')}>8</button>
        <button onClick={() => handleNumberInput('9')}>9</button>
        <button onClick={() => handleOperation('*')}>*</button>
      </div>
      <div>
        <button onClick={() => handleNumberInput('0')}>0</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleOperation('/')}>/</button>
        <button onClick={handleClear}>AC</button>
      </div>
    </div>
  );
}

export default App;

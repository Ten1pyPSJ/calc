import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  memory: null,
  operation: null,
};

export const calkSlice = createSlice({
  name: 'calk',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value += action.payload;
    },
    subtract: (state, action) => {
      state.value -= action.payload;
    },
    multiply: (state, action) => {
      state.value *= action.payload;
    },
    divide: (state, action) => {
      state.value /= action.payload;
    },
    clear: (state) => {
      state.value = 0;
      state.memory = null;
      state.operation = null;
    },
    setMemory: (state, action) => {
      state.memory = action.payload;
    },
    setOperation: (state, action) => {
      state.operation = action.payload;
    },
    calculate: (state) => {
      if (state.operation && state.memory !== null) {
        switch (state.operation) {
          case '+':
            state.value = state.memory + state.value;
            break;
          case '-':
            state.value = state.memory - state.value;
            break;
          case '*':
            state.value = state.memory * state.value;
            break;
          case '/':
            if (state.value !== 0) {
              state.value = state.memory / state.value;
            }
            break;
          default:
            break;
        }
      }
      state.memory = null;
      state.operation = null;
    },
  },
});

export const { add, subtract, multiply, divide, clear, setMemory, setOperation, calculate } =
  calkSlice.actions;

export default calkSlice.reducer;

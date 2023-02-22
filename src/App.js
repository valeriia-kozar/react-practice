import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;

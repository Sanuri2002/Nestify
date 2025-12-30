import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import './App.css';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <SearchForm />
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
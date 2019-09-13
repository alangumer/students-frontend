import React from 'react';
import List from './List';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import './App.css';

export const API_URL = 'http://localhost:3001/';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar bg="light">
        <Navbar.Brand href="#home">Students</Navbar.Brand>
      </Navbar>
      <Container>
        <List />
      </Container>
    </div>
  );
}

export default App;

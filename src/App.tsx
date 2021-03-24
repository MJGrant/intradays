import React from 'react';
import Form from './shared/containers/Form/Form';

import './App.css';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@toyota-research-institute/lakefront'; 

function App() {
  return (
    <div className="space-around">
      <ThemeProvider theme={theme}>
      <header className="app-header">
        <h1>Intradays Chart App 💎</h1>
        <Form />
      </header>
      </ThemeProvider>
    </div>
  );
}

export default App;

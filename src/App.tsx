import React from 'react';
import Form from './shared/containers/Form/Form';

import './App.css';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <div className="Intradays">
      <header className="app-header">
        <h1>Intradays Chart App 💎</h1>
        <Form />
      </header>
    </div>
  );
}

export default App;

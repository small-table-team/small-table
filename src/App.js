// App.jsx
import React from 'react';
import HomePage from './components/HomePage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // אפשר לשנות נושא אחר
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;

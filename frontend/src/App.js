// App.jsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const SplashPageLazy = React.lazy(() => import("./components/SplashPage"));
const HomePageLazy = React.lazy(() => import("./components/HomePage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
         <Route path='/' element={<SplashPageLazy />} />
         <Route path='/HomePage' element={<HomePageLazy />} />
      </Routes>
    </Suspense>
  );
}

export default App;

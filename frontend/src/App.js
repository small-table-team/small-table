import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const SplashPageLazy = React.lazy(() => import("./components/SplashPage"));
const HomePageLazy = React.lazy(() => import("./components/HomePage"));
const CateringHomePageLazy = React.lazy(() => import("./components/CateringHomePage"));
const LoginLazy = React.lazy(() => import("./components/LoginPage"));
const OnboardingLazy = React.lazy(() => import("./components/Onboarding"));
const SignUpLazy = React.lazy(() => import("./components/SignUpPage"));
const AllDishesPageLazy = React.lazy(() => import("./components/AllDishesPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<SplashPageLazy />} />
        <Route path="/HomePage" element={<HomePageLazy />} />
        <Route path="/catering-home" element={<CateringHomePageLazy />} /> {/* דף הבית של בעל הקייטרינג */}
        <Route path="/login" element={<LoginLazy />} />
        <Route path="/Onboarding" element={<OnboardingLazy />} />
        <Route path="/signup" element={<SignUpLazy  />} /> 
        <Route path="/dishes" element={<AllDishesPageLazy />} />
      </Routes>
    </Suspense>
  );
}

export default App;

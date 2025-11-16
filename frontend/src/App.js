import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const SplashPageLazy = React.lazy(() => import("./components/SplashPage"));
const HomePageLazy = React.lazy(() => import("./components/HomePage"));
const CateringHomePageLazy = React.lazy(() => import("./components/CateringHomePage"));
const LoginLazy = React.lazy(() => import("./components/LoginPage"));
const OnboardingLazy = React.lazy(() => import("./components/Onboarding"));
const SignUpLazy = React.lazy(() => import("./components/SignUpPage"));
const AllCateringsPageLazy = React.lazy(() => import("./components/AllCateringsPage"));
const CateringDishesPage = React.lazy(() => import("./components/CateringDishesPage"));
const FirstFilterPage = React.lazy(() => import("./components/FirstFilterPage"));
const DishChecklistPage = React.lazy(() => import("./components/DishChecklistPage"));
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
  <Route path="/AllCaterings" element={<AllCateringsPageLazy />} />
  <Route path="/catering/:cateringId" element={<CateringDishesPage />} />
  <Route path="/dish-checklist/:dishId" element={<DishChecklistPage />} />
  <Route path="/FirstFilterPage" element={<FirstFilterPage />} />
       

      
      </Routes>
    </Suspense>
  );
}

export default App;

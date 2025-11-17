import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Lazy-loaded components
const SplashPage = React.lazy(() => import("./components/SplashPage"));
const HomePage = React.lazy(() => import("./components/HomePage"));
const CateringDashboard = React.lazy(() => import("./components/CateringDashboardPage"));
const LoginPage = React.lazy(() => import("./components/LoginPage"));
const Onboarding = React.lazy(() => import("./components/Onboarding"));
const SignUpPage = React.lazy(() => import("./components/SignUpPage"));
const AllCateringsPage = React.lazy(() => import("./components/AllCateringsPage"));
const CateringDishesPage = React.lazy(() => import("./components/CateringDishesPage"));
const FirstFilterPage = React.lazy(() => import("./components/FirstFilterPage"));
const DishChecklistPage = React.lazy(() => import("./components/DishChecklistPage"));
const CartDrawer = React.lazy(() => import("./components/CartDrawer"));
const NotFoundPage = React.lazy(() => import("./components/NotFoundPage"));
const CheckoutPage = React.lazy(() => import("./components/CheckoutPage")); // דף הצ'ק-אאוט

function App() {
  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/all-caterings" element={<AllCateringsPage />} />
          <Route path="/first-filter" element={<FirstFilterPage />} />

          {/* Customer: View Catering Menus */}
          <Route path="/catering/:cateringId" element={<CateringDishesPage />} />
          <Route path="/dish-checklist/:cateringId/:dishId" element={<DishChecklistPage />} />

          {/* Catering Owner: Dashboard */}
          <Route path="/catering-dashboard" element={<CateringDashboard />} />

          {/* Checkout Page */}
          <Route path="/checkout" element={<CheckoutPage />} />  {/* הוספת הנתיב לצ'ק-אאוט */}

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Cart drawer */}
        <Suspense fallback={null}>
          <CartDrawer />
        </Suspense>
      </Suspense>
    </CartProvider>
  );
}

export default App;

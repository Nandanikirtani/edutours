import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookingFlow from './pages/booking-flow';
import TourPackageDetails from './pages/tour-package-details';
import Login from './pages/login';
import TourCatalog from './pages/tour-catalog';
import UserDashboard from './pages/user-dashboard';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/booking-flow" element={<BookingFlow />} />
        <Route path="/tour-package-details" element={<TourPackageDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tour-catalog" element={<TourCatalog />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PropertiesPage from "./pages/PropertyPage/PropertiesPage";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import PropertyDetailPage from "./pages/PropertyDetailsPage/PropertyDetailPage";
import "./App.css";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import ScheduleViewing from "./pages/PropertyPage/ScheduleViewing/ScheduleViewing";
import RentProperty from "./pages/RentProperty/RentProperty";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import FavoritesPage from "./pages/Favourite/FavouritePage";
import Profile from "./pages/Profile/Profile";
import ScrollToTop from "./ScrollToTop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user){
      setIsLoggedIn(true);
    }
  },[]);

  return (
    <Router>
      <ScrollToTop/>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <PropertiesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          {/* <Route path="/schedule/:id" element={<ScheduleViewing />} /> */}
           <Route path="/dashboard/rent" element={<RentProperty />} />
           <Route path="/favorites" element={<FavoritesPage />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

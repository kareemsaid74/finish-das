import { useContext, useEffect, useState } from "react";
import "./App.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Product from "./screens/Product/Product";
import Category from "./screens/Category/Category";
import UpdateProduct from "./screens/UpdateProduct/UpdateProduct";
import Signin from "./screens/Signin/Signin";
import ProtectedRoutes from '../src/screens/ProtectedRoutes/ProtectedRoutes';  
import { SidebarProvider } from './context/SidebarContext'; 
import { Offline, Online } from "react-detect-offline"; 

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <SidebarProvider>
        <Router>
          <Routes>
            <Route element={<BaseLayout />}>
              {/* Public Routes */}
              <Route path="signin" element={<Signin />} />
              
              {/* Protected Routes */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="Product" 
                element={
                  <ProtectedRoutes>
                    <Product />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="Category" 
                element={
                  <ProtectedRoutes>
                    <Category />
                  </ProtectedRoutes>
                } 
              />
              <Route 
                path="updateProduct" 
                element={
                  <ProtectedRoutes>
                    <UpdateProduct />
                  </ProtectedRoutes>
                } 
              />
              
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
          >
            <img
              className="theme-icon"
              src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
              alt="Theme toggle icon"
            />
          </button>
          
        </Router>

        {/* مؤشر التحميل عند انقطاع الاتصال */}
        <Offline>
          <div className="offline-message">
            <div className="loading-indicator">
              <div className="spinner"></div> {/* مؤشر التحميل */}
            </div>
          </div>
        </Offline>

        <Online>
          {isLoading && (
            <div className="loading-message">
              <div className="spinner"></div> {/* مؤشر التحميل عند التحميل */}
            </div>
          )}
        </Online>

        {/* استجابة لتحميل البيانات أو عند فقدان الاتصال */}
        <Offline onChange={() => setIsLoading(true)} />
        <Online onChange={() => setIsLoading(false)} />
      </SidebarProvider>
    </>
  );
}

export default App;

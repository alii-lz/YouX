import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateApplicationPage from "./pages/CreateApplicationPage";
import UpdateApplicationPage from "./pages/UpdateApplicationPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route
                    path='/create-application'
                    element={<CreateApplicationPage />}
                />
                <Route
                    path='/update-application/:appId'
                    element={<UpdateApplicationPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

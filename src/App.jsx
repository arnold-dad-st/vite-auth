import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import SignIn from "./pages/login/SignIn";
import Album from "./pages/album/album.jsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

const CustomRoutes = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    useNavigate()

    return (
        <Routes>
            <Route
                path="/books"
                element={isLoggedIn ?  <Album /> : <Navigate to="/" />}
            />
            <Route path="/" exact element={<SignIn />} />
        </Routes>
    )
}

const App = () => {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <CustomRoutes />
            </Router>
        </ThemeProvider>
    );
};
export default App;
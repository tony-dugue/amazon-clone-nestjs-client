// Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// theme
import {ThemeProvider} from "@mui/material";
import {theme} from "./shared/utils/theme";

import PrivateRoute from "./features/auth/components/PrivateRoute";

import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import SigninPage from './pages/Signin.page';
import CartPage from "./pages/Cart.page";

import { store } from './store'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute page={<HomePage />} />} />
          <Route path='/cart' element={<PrivateRoute page={<CartPage />} />} />

          <Route path='/register' element={<RegisterPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// TRANSMIT STORE TO CYPRESS
type CypressWindow = Window & typeof globalThis & { Cypress: any, store: any }
const thisWindow = window as CypressWindow

if (thisWindow.Cypress) {
  console.log('CYPRESS WINDOW')
  thisWindow.store = store
}

export default App;

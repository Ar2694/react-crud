import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import HomePage  from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import ForgotPasswordPage from "pages/ForgotPasswordPage";

// App theme
import AppTheme from "shared/themes/AppTheme";

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

export default function App() {

  return (
    <AppTheme>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AppTheme>
  )
}



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import UsersProvider from "./contexts/UsersContext.tsx";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
// import { CookiesProvider } from "react-cookie";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <UsersProvider>
        <App />
      </UsersProvider>
    </AuthProvider>
  </React.StrictMode>,
)

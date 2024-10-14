import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="665733233751-iihaao1vhofef5sdod3s0bfnfabjf2qh.apps.googleusercontent.com">

    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)

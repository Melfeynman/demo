import './styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router'
import App from './App.jsx'
import UpdateMember from './UpdateMember.jsx'
import CreateMember from './CreateMember.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/update' element={<UpdateMember/>}/>
        <Route path='/create' element={<CreateMember/>}/>
      </Routes>
    </StrictMode>
  </HashRouter>
)

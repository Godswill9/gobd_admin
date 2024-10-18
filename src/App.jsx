import { useState } from 'react'
import Chart from './pages/chart'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Individuals from './pages/individuals';
import Messages from './pages/messages';
import Settings from './pages/settings';
import Support from './pages/support';


function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
     <Route path={"/"} element={<Dashboard/>}></Route>
     <Route path={"/individuals"} element={<Individuals/>}></Route>
     <Route path={"/messages"} element={<Messages/>}></Route>
     <Route path={"/settings"} element={<Settings/>}></Route>
     <Route path={"/support"} element={<Support/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App

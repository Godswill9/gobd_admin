import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Individuals from './pages/individuals';
import Messages from './pages/messages';
import Settings from './pages/settings';
import Support from './pages/support';
import IndividualRequest from './pages/individualRequest';


function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
     <Route path={"/"} element={<Dashboard/>}></Route>
     <Route path={"/individuals"} element={<Individuals/>}></Route>
     <Route path={"/individualsRequest"} element={<IndividualRequest/>}></Route>
     <Route path={"/messages"} element={<Messages/>}></Route>
     <Route path={"/settings"} element={<Settings/>}></Route>
     <Route path={"/support"} element={<Support/>}></Route>
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import HomePage from './components/HomePage';
import Introduction from './components/signup/Introduction';
import Guarantee from './components/signup/Guarantee';
import Information from './components/signup/Information';
import Confirmation from './components/signup/Confirmation';
import Payment from './components/signup/Payment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Introduction />} />
          <Route path="/signup/information" element={<Information />} />
          <Route path="/signup/guarantee" element={<Guarantee />} />
          <Route path="/signup/confirmation" element={<Confirmation />} />
          <Route path="/signup/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

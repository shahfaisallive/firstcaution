import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import HomePage from './components/HomePage';
import Introduction from './components/signup/Introduction';
import Guarantee from './components/signup/Guarantee';
import Information from './components/signup/Information';
import Confirmation from './components/signup/Confirmation';
import Payment from './components/signup/Payment';

function App() {
  const [data, setData] = useState();
  const [language, setLanguage] = useState('en');
  const changeLanguage = (lang) => {
    setLanguage(lang)
  }

  const setFormData = (data) => {
    setData(data.en_US)
  }

  useEffect(() => {
    console.log(language)
  }, [language])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage changeLanguage={changeLanguage} language={language} />} />
          <Route path="/signup" element={<Introduction />} />
          <Route path="/signup/information" element={<Information setFormData={setFormData}/>} />
          <Route path="/signup/guarantee" element={<Guarantee data={data}/>} />
          <Route path="/signup/confirmation" element={<Confirmation />} />
          <Route path="/signup/payment" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Content from "./content.json"

// Importing components
import HomePage from './components/HomePage';
import Introduction from './components/signup/Introduction';
import Guarantee from './components/signup/Guarantee';
import Information from './components/signup/Information';
import Confirmation from './components/signup/Confirmation';
import Payment from './components/signup/Payment';

function App() {
  const [data, setData] = useState();
  const [content, setContent] = useState({})
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const setFormData = (data) => {
    setData(data)
    localStorage.setItem("data", JSON.stringify(data))
  }

  useEffect(() => {
    const lang = localStorage.getItem("language")
    if (lang) {
      setLanguage(lang)
      console.log("lang", language)
    }
    if (language == "en") {
      setContent(Content.en)
    } else if (language == "it") {
      setContent(Content.it)
    } else if (language == "de") {
      setContent(Content.de)
    } else if (language == "fr") {
      setContent(Content.fr)
    }
    // console.log(content)
  }, [language, data, content])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage changeLanguage={changeLanguage} language={language} content={content} />} />
          <Route path={`/${language}/signup`} element={<Introduction language={language} content={content} />} />
          <Route path={`${language}/signup/information`} element={<Information setFormData={setFormData} data={data} language={language} content={content} />} />
          <Route path={`${language}/signup/guarantee`} element={<Guarantee data={data} language={language} content={content} />} />
          <Route path={`${language}/signup/confirmation`} element={<Confirmation language={language} content={content}/>} />
          <Route path={`${language}/signup/payment`} element={<Payment language={language} content={content} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

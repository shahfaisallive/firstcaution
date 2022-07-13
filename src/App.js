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
import ConfirmedPage from './components/signup/ConfirmedPage';

function App() {
  const urlParams = new URLSearchParams(window.location.search)
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

    // setUtmSource(urlParams.get('utm_source'))
    // setUtmCompaign(urlParams.get('utm_compaign'))
    // setUtmMedium(urlParams.get('utm_medium'))
    let utmSource = urlParams.get('utm_source')
    let utmCompaign = urlParams.get('utm_campaign')
    let utmMedium = urlParams.get('utm_medium')
    if (utmSource || utmCompaign || utmMedium) {
      localStorage.setItem('utmSource', utmSource);
      localStorage.setItem('utmCompaign', utmCompaign);
      localStorage.setItem('utmMedium', utmMedium);
    }
  }, [language, data, content])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage changeLanguage={changeLanguage} language={language} content={content} />} />
          <Route path={`/${language}/signup`} element={<Introduction language={language} content={content} />} />
          <Route path={`${language}/signup/information`} element={<Information setFormData={setFormData} data={data} language={language} content={content} />} />
          <Route path={`${language}/signup/guarantee`} element={<Guarantee data={data} language={language} content={content} />} />
          <Route path={`${language}/signup/confirmation`} element={<Confirmation language={language} content={content} />} />
          <Route path={`${language}/signup/confirmed`} element={<ConfirmedPage language={language} content={content} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

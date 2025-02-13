import React from 'react'
import "./Sculptures.css"
import i18n from 'i18next'
import { useEffect } from 'react';
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "../locales/en/translation.json"
import tHin from "../locales/hin/translation.json"
import tTam from "../locales/tam/translation.json"
import { Link } from 'react-router-dom'



i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: tEn
        },
        hin: {
          translation: tHin
        },
        tam: {
          translation: tTam
        }
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false, // react already escapes
      },
    })

    const changeLang = (l) => {
      return () => {
        i18n.changeLanguage(l);
        localStorage.setItem('lang', l);
      }
    }
        
    
function Sculptures() {
  const { t } = useTranslation();

  useEffect(() => {
    const currLang = localStorage.getItem('lang');
    i18n.changeLanguage(currLang);
  },[])

  const sculptures = [
    {
      title: "The Seri Rambai Cannon",
      url: "https://sketchfab.com/models/775b01c631de4a8ea1eace42d81a2e75/embed?autospin=1&autostart=1&preload=1",
    },
    {
      title: "The Five Types of Knowledge",
      url: "https://sketchfab.com/models/7d951aa569ad4a32b036a0b4aa423a62/embed?autospin=1&autostart=1&preload=1",
    },
    {
      title: "Trumpet Tibet",
      url: "https://sketchfab.com/models/f9f46a10ede0474cae332e49153ae20b/embed?autostart=1&autospin=1&preload=1&ui_watermark=0",
    },
    {
      title: "Guanyin stone statue",
      url: "https://sketchfab.com/models/c9043daed26b4d23bab02c129fad11f8/embed?autostart=1&autospin=1&preload=1",
    },
    {
      title: "Buddha Stroking the Head Follower",
      url: "https://sketchfab.com/models/6c53d79170bd4f37bf90a4e982dd80a3/embed?autospin=1&autostart=1&preload=1",
    },
    {
      title: "Dancing Ganesha",
      url: "https://sketchfab.com/models/408ac4696cdf4a4d9aec6257f568872b/embed?ui_infos=0&ui_watermark_link=0&ui_watermark=1&autospin=1&autostart=1&preload=1",
    },
  ];
  

  return (
    <div>
     <header className="header" style={{height:"55px"}}>
    <div className="logo"><img src="./static/image.png" alt style={{scale:"0.8"}}/></div>
    <nav className="navigation">
      <ul>
              <li><Link to='/' style={{ fontSize: "16px" }}>{t('Home') }</Link></li>
              <li><Link to='/about' style={{ fontSize: "16px" }}>{t('About')}</Link></li>
              <li><Link  style={{ fontSize: "16px" }}>{ t('More')}</Link>
          <ul style={{width:"270px",height:"150px"}}>
                  <li><Link to='/login' style={{ fontSize: "12px", height: "40px" }}>{ t('Admin Login')}</Link></li>
                  <li><Link to='/event' style={{ fontSize: "12px", height: "40px" }}>{ t('Events')}</Link></li>
                  <li><Link to='/sculptures' style={{ fontSize: "12px", height: "40px" }}>{ t('Sculptures')}</Link></li>
          </ul>
              </li>
              <li><Link to='/tour' style={{ fontSize: "16px" }}>{t('VirtualTour')}</Link></li>
              <li><Link  style={{ fontSize: "16px" }}>{t('Languages') }</Link>
          <ul style={{width:"270px"}}>
            <li><Link  style={{fontSize:"12px",height:"40px"}} onClick=  {(e) => {
                    e.preventDefault();
                    changeLang("en")();
                  }
                  }>English</Link></li>
                  <li><Link  style={{ fontSize: "12px", height: "40px" }} onClick={(e) => {
                    e.preventDefault();
                    changeLang("tam")();
                  }}>ஆதரவு</Link></li>
                  <li><Link style={{ fontSize: "12px", height: "45px" }} onClick={(e) => {
                    e.preventDefault();
                    changeLang("hin")();
                  }
                  }>हिन्दी</Link></li>
          </ul>
        </li>
              <li><Link to='/chatbot' className="glow-button" style={{ fontSize: "16px" }}>{ t('Book Now')}</Link></li>
      </ul>
    </nav>
  </header>
      <div className="chatbot-container">
    <div className="chat-popup">
      <button id="chat-popup-btn"><Link to='/chatbot'><img src="./static/chatbot-icon.png" alt /></Link></button>
    </div>
  </div>
    <div className="sculptures-container">
        <h1 className="page-title" style={{ marginTop: "45px" }}>{t('Explore Our Sculptures') }</h1>
    <div className="sculptures-list">
      {sculptures.map((sculpture, index) => (
        <div key={index} className="sculpture-item">
          <div className="watermark-cover" style={{ height: "35px", width: "35px", zIndex: 10, backgroundColor: "black", position: "absolute", marginTop: "50px", marginLeft:"8px"}}></div>
          <h2>{t(`${sculpture.title}`)}</h2>
          <div className="model-wrapper">
            <iframe
              title={sculpture.title}
              src={sculpture.url}
              allow="autoplay; fullscreen; xr-spatial-tracking"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
  
  
}

export default Sculptures

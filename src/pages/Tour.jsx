import React from 'react'
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

function Tour() {
    const { t } = useTranslation();

  useEffect(() => {
    const currLang = localStorage.getItem('lang');
    i18n.changeLanguage(currLang);
  },[])

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
  
      <div>
   <iframe width="100%" height={700} frameBorder={0} allow="xr-spatial-tracking; gyroscope; accelerometer" allowFullScreen scrolling="no" src="https://kuula.co/share/collection/7Z2SG?logo=1&info=1&fs=1&vr=0&thumbs=1&alpha=0.60" />

   </div>
    </div>
  )
}

export default Tour

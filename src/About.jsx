import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import i18n from 'i18next'
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "./locales/en/translation.json"
import tHin from "./locales/hin/translation.json"
import tTam from "./locales/tam/translation.json"
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



function About() {
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
  <div className="chatbot-container">
    <div className="chat-popup">
      <button id="chat-popup-btn"><Link to='/chatbot'><img src="./static/chatbot-icon.png" alt /></Link></button>
    </div>
  </div>
  <div className="hero-section">
    <div className="hero-image">
      <img src="./static/museum_background.jpeg" alt="Sculpture Background" />
    </div>
    <div className="hero-content">
      <h1>{t('Triveni Museum')}</h1>
                  <p>{ t('Discover the rich heritage and cultural significance of Triveni Museum through a captivating journey of art, history, and innovation. Immerse yourself in the stories of the past and present, beautifully preserved within our walls.')}</p>
    </div>
  </div>
  <div className="history">
              <h1>{ t('History of Triveni Museum')}</h1>
    <ul>
      <li>
        <div className="date">2016</div>
                      <div className="title">{ t('Title 1')}</div>
                      <div className="descr">{ t('Triveni Archaeological Museum is being established by Directorate of Archaeology, Archives and Museums M.P. Government on the occasion of Simhasth 2016')}</div>
      </li>
      <li>
        <div className="date">2017</div>
                      <div className="title">{ t('Title 2')}</div>
                      <div className="descr">{ t('It comprises of 3 galleries named Shaiv, Vaishnava and Shakt.')}</div>
      </li>
      <li>
        <div className="date">2018</div>
                      <div className="title">{ t('Title 3')}</div>
                      <div className="descr">{ t('The Triveni concepts is based on the composition of three cult particular Shaivayan (Shiv), Krishnayan(Vasudev Krishna) and Durgayan (goddess Durga). ')}</div>
      </li>
      <li>
        <div className="date">2019</div>
                      <div className="title">{ t('Title 4')}</div>
                      <div className="descr">{t('The stone sculpture, coins, miniature painting and other material have been displayed in these gallery.') }</div>
      </li>
      <li>
        <div className="date">2022</div>
                      <div className="title">{ t('Title 5')}</div>
                      <div className="descr">{ t('The Mahishasur mardini of Avara (Mandsour) and Kaumari of Bhanpura (Mandsour) are the best instance of Rastrakuta art of 8th century A.D. Other sculptures ')}</div>
      </li>
    </ul>
  </div>
  <section className="signature-aesthetic">
              <h2>{t('Our Signature Aesthetic')}</h2>
    <div className="aesthetic-gallery">
      <img src="https://archaeology.mp.gov.in/portals/0/Triveni-Archaeological-Museum/UJ2.2.JPG" alt="Art 1" />
      <img src="https://archaeology.mp.gov.in/portals/0/Triveni-Archaeological-Museum/UJ2.3.JPG" alt="Art 2" />
      <img src="https://archaeology.mp.gov.in/portals/0/Triveni-Archaeological-Museum/UJ2.4.JPG" alt="Art 3" />
    </div>
  </section>
  {/* Team Section */}
  <div className="container">
              <h2 className="team-heading">{ t('Our Team')}</h2>
    <div className="artboard">
      <div className="card">
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__details">
                              <h4 className="card__name">{ t('John Doe')}</h4>
            <hr className="card__divider" />
                              <p className="card__role">{t('Director of Operations')}</p>
          </div>
        </div>
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__photo">
            <img src="./static/profile_team1.png" alt="John Doe's Photo" className="card__photo-img" />
          </div>
        </div>
      </div>
      <div className="card">
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__details">
                              <h4 className="card__name">{ t('Anjali Mehta')}</h4>
            <hr className="card__divider" />
                              <p className="card__role">{ t('Curator of Collections')}</p>
          </div>
        </div>
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__photo">
            <img src="./static/profile_team3.png" alt="Anjali Mehta's Photo" className="card__photo-img" />
          </div>
        </div>
      </div>
      <div className="card">
        {/* Back Side */}
        <div className="card__side card__side--back">
          <div className="card__details">
                              <h4 className="card__name">{ t('Rajesh Sharma')}</h4>
            <hr className="card__divider" />
                              <p className="card__role">{t('Executive Director')}</p>
          </div>
        </div>
        {/* Front Side */}
        <div className="card__side card__side--front">
          <div className="card__photo">
            <img src="./static/profile_team2.png" alt="Rajesh Sharma's Photo" className="card__photo-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* footer */}
  <footer className="footer">
    <video className="footer_video" muted loop autoPlay src="./static/132000-751915339_small.mp4" type="video/mp4">
    </video>
    <div className="footer-container">
      <div className="footer_inner">
        <div className="c-footer">
          <div className="layout">
            <div className="layout_item w-50">
              <div className="newsletter">
                                      <h3 className="newsletter_title">{ t('Get updates on fun stuff you probably want to know about in your inbox.')}</h3>
                <form action>
                  <input type="text" placeholder={t('Email Address')} />
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
            <div className="layout_item w-25">
              <nav className="c-nav-tool">
                                      <h4 className="c-nav-tool_title">{ t('Menu')}</h4>
                <ul className="c-nav-tool_list">
                  <li>
                                              <Link href="/" className="c-link">{ t('Home')}</Link>
                  </li>
                  <li>
                                              <Link href="/about" className="c-link">{ t('About Us')}</Link>
                  </li>
                  <li>
                                              <Link  className="c-link">{ t('More')}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="layout_item w-25">
              <nav className="c-nav-tool">
                                      <h4 className="c-nav-tool_title">{ t('Support')}</h4>
                <ul className="c-nav-tool_list">
                  <li className="c-nav-tool_item">
                                              <Link  className="c-link">{t('Shipping')} &amp; { t('Returns')}</Link>
                  </li>
                  <li className="c-nav-tool_item">
                                              <Link className="c-link">{t('Help')} &amp; { t('FAQ')}</Link>
                  </li>
                  <li className="c-nav-tool_item">
                                              <Link  className="c-link">{t('Terms')} &amp;
                                                  { t('Conditions')}</Link>
                  </li>
                  <li className="c-nav-tool_item">
                                              <Link className="c-link">{ t('Privacy Policy')}</Link>
                  </li>
                  <li className="c-nav-tool_item">
                                              <Link  className="c-link">{ t('Contact')}</Link>
                  </li>
                  <li className="c-nav-tool_item">
                    <Link  className="c-link">
                                                  { t('Login')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="layout c-2">
            <div className="layout_item w-50">
              <ul className="flex">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 6.654a6.786 6.786 0 0 1 2.596 5.344A6.786 6.786 0 0 1 12 17.34a6.786 6.786 0 0 1-2.596-5.343A6.786 6.786 0 0 1 12 6.654zm-.87-.582A7.783 7.783 0 0 0 8.4 12a7.783 7.783 0 0 0 2.728 5.926 6.798 6.798 0 1 1 .003-11.854zm1.742 11.854A7.783 7.783 0 0 0 15.6 12a7.783 7.783 0 0 0-2.73-5.928 6.798 6.798 0 1 1 .003 11.854z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M1 4h22v2H1V4zm0 14h22v2H1v-2zm18.622-3.086l-.174-.87h-1.949l-.31.863-1.562.003c1.005-2.406 1.75-4.19 2.236-5.348.127-.303.353-.457.685-.455.254.002.669.002 1.245 0L21 14.912l-1.378.003zm-1.684-2.062h1.256l-.47-2.18-.786 2.18zM7.872 9.106l1.57.002-2.427 5.806-1.59-.001c-.537-2.07-.932-3.606-1.184-4.605-.077-.307-.23-.521-.526-.622-.263-.09-.701-.23-1.315-.419v-.16h2.509c.434 0 .687.21.769.64l.62 3.289 1.574-3.93zm3.727.002l-1.24 5.805-1.495-.002 1.24-5.805 1.495.002zM14.631 9c.446 0 1.01.138 1.334.267l-.262 1.204c-.293-.118-.775-.277-1.18-.27-.59.009-.954.256-.954.493 0 .384.632.578 1.284.999.743.48.84.91.831 1.378-.01.971-.831 1.929-2.564 1.929-.791-.012-1.076-.078-1.72-.306l.272-1.256c.656.274.935.361 1.495.361.515 0 .956-.207.96-.568.002-.257-.155-.384-.732-.702-.577-.317-1.385-.756-1.375-1.64C12.033 9.759 13.107 9 14.63 9z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M15 17a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15zM2 2h4v20H2V2z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-6v2h2v-2h1a2.5 2.5 0 0 0 2-4 2.5 2.5 0 0 0-2-4h-1V6h-2v2H8v8h3zm-1-3h4a.5.5 0 1 1 0 1h-4v-1zm0-3h4a.5.5 0 1 1 0 1h-4v-1z" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 1.81.752 3.285-.019.123-.04.24-.062.36-.735 3.773-3.089 5.446-6.956 5.446H8.957c-.63 0-1.174.414-1.354 1.002l-.014-.002-.93 5.894H3.121a.051.051 0 0 1-.05-.06l2.598-16.51A.95.95 0 0 1 6.607 2h5.976c2.183 0 3.716.469 4.523 1.388z" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="layout_item w-25">
              <ul className="flex">
                <li>
                  <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32}>
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="layout_item w-25" style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
              <Link><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={36} height={36}>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z" />
                </svg></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_copyright">
                      <p>© 2024 { t('Matrix Mitr')}</p>
      </div>
    </div>
  </footer>
</div>

  )
}

export default About

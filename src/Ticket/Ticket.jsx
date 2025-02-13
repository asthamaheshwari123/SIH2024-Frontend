import React, { useEffect, useRef } from 'react'; 
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import nodemailer from 'nodemailer';
import './TicketPage.css'; // Import custom CSS for styling
import i18n from 'i18next'
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "../locales/en/translation.json";
import tHin from "../locales/hin/translation.json";
import tTam from "../locales/tam/translation.json";
import { Link } from 'react-router-dom';

i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: tEn },
        hin: { translation: tHin },
        tam: { translation: tTam },
      },
      lng: "en",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });

const changeLang = (l) => {
  return () => {
    i18n.changeLanguage(l);
    localStorage.setItem('lang', l);
  };
};

function Ticket() {
    const { t } = useTranslation();
    const location = useLocation();
    const qrRef = useRef();

    const { order_id, payment_id, name, email, contact, 
        preferredDate, visitTime, numberOfTickets, amount } = location.state;

    useEffect(() => {
        const currLang = localStorage.getItem('lang');
        i18n.changeLanguage(currLang);

        const sendEmailWithPdf = async () => {
            const input = document.getElementById('ticket-content');
            if (input) {
                const canvas = await html2canvas(input);
                const imgData = canvas.toDataURL('image/png');
            //     const pdf = new jsPDF({
            //         orientation: 'portrait',
            //         unit: 'px',
            //         format: [canvas.width, canvas.height],
            //     });
                //   pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4', // A4 page size
                });
                // Scale the image to fit within the A4 size (595x842 is A4 in pixels)
                const pdfWidth = 595; // A4 width in pixels
                const pdfHeight = 842; // A4 height in pixels
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
        
                // Scale the image proportionally to fit inside the page
                const scaleFactor = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
                const scaledWidth = imgWidth * scaleFactor;
                const scaledHeight = imgHeight * scaleFactor;
        
                // Add the image with the scaled width and height
                pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
              pdf.save(`${t('Ticket')}_${name}.pdf`);
                 const pdfData = pdf.output('blob'); // Create PDF as blob
                 const formData = new FormData();
                 formData.append('file', pdfData, 'ticket.pdf');
                 formData.append('name', name);  // userName is the variable holding the user's name
                 formData.append('email', email); 
                 try {
                     const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/sendpdf`, {
                         method: 'POST',
                         body: formData,
                     });
 
                     if (response.ok) {
                         console.log('PDF sent to backend successfully');
                     } else {
                         console.error('Failed to send PDF to backend');
                     }
                 } catch (error) {
                     console.error('Error sending PDF:', error);
                 }
                // Email sending logic using nodemailer
                // const transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //         user: 'triveni3032@gmail.com',
                //         pass: 'ormysqsmamuyhdf'
                //     }
                // });

                // let mailOptions = {
                //     from: 'triveni3032@gmail.com',
                //     to: email,
                //     subject: 'Museum Ticket',
                //     text: `Dear ${name},\n\nPlease find your e-ticket attached.\n\nThank you for your purchase.`,
                //     attachments: [
                //         {
                //             filename: 'ticket.pdf',
                //             content: pdfData,
                //             encoding: 'base64'
                //         }
                //     ]
                // };

                // transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //         console.error('Error sending email:', error);
                //     } else {
                //         console.log('Email sent:', info.response);
                //     }
                // });
            }
        };

        sendEmailWithPdf();
    }, []);

    if (!order_id) {
        return <div>Invalid Access</div>;
    }

    const qrData = `OrderID: ${order_id}, PaymentID: ${payment_id}, Name: ${name}, TicketCount: ${numberOfTickets}`;

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

            <div className="ticket-container" id="ticket-content" style={{marginTop:"5rem"}}>
                <div className="ticket">
                    <div className="ticket-header">
                        <h1>{t('Welcome to the Museum')}</h1>
                        <p>{t('Your E-Ticket')}</p>
                    </div>
                    <div className="ticket-body">
                        <div className="ticket-details">
                            <p><strong>{t('Name')}:</strong> {name}</p>
                            <p><strong>{t('Email')}:</strong> {email}</p>
                            <p><strong>{t('Contact')}:</strong> {contact}</p>
                            <p><strong>{t('Number of Tickets')}:</strong> {numberOfTickets}</p>
                            <p><strong>{t('Date of Visit')}:</strong> {preferredDate}</p>
                            <p><strong>{t('Time of Visit')}:</strong> {visitTime}</p>
                            <p><strong>{t('Total Amount')}:</strong> ₹{amount / 100}</p>
                            <p><strong>{t('Order ID')}:</strong> {order_id}</p>
                            <p><strong>{t('Payment ID')}:</strong> {payment_id}</p>
                        </div>
                        <div className="ticket-qr">
                            <QRCodeSVG
                                value={qrData}
                                size={150}
                                level={"H"}
                                includeMargin={true}
                                ref={qrRef}
                            />
                        </div>
                    </div>
                    <div className="ticket-footer">
                        <p>{t('Thank you for your purchase!')}</p>
                        <p>{t('Please bring this ticket to the entrance.')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;

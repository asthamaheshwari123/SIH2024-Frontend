import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { useNavigate } from 'react-router';
// import { collectData,paymentHandler } from './service/paymentService';
import i18n from 'i18next'
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
        
    

function Chatbot() {
        const { t } = useTranslation();
    
        useEffect(() => {
          const currLang = localStorage.getItem('lang');
          i18n.changeLanguage(currLang);
        },[])
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Welcome to Triveni Museum! How can I assist you today?" }
    ]);
    const [step, setStep] = useState(0);
    const [currentOption, setCurrentOption] = useState("");
    const [ticketDetails, setTicketDetails] = useState({
        name: '',
        ageGroup: '',
        gender: '',
        email: '',
        contact: '',
        numberOfTickets: '',
        preferredDate: '',
        preferredTime: '',
        preferredSlot:''
    });
    const [userChoices, setUserChoices] = useState([]);

    const mainOptions = [
        "Yes, I want to purchase a ticket",
        "Museum Information",
        "Exhibits and Collections",
        "Events and Programs",
        "Accessibility and Visitor Services"
    ];

    const noOptions = [
        "Museum Information",
        "Exhibits and Collections",
        "Events and Programs",
        "Accessibility and Visitor Services"
    ];

    const subOptions = {
        "Museum Information": [
            "Opening Hours",
            "Admission Fees",
            "Location",
            "Parking"
        ],
        "Exhibits and Collections": [
            "Current Exhibitions",
            "Upcoming Exhibitions",
            "Permanent Collection",
            "Interactive Exhibits",
            "Photography Policy"
        ],
        "Events and Programs": [
            "Guided Tours",
            "Workshops and Educational Programs",
            "Special Events",
            "Private Events",
            "Museum Café"
        ],
        "Accessibility and Visitor Services": [
            "Accessibility",
            "Audio Guides",
            "Stroller Policy",
            "Pet Policy",
            "Museum Membership"
        ]
    };

    const answers = {
        "Opening Hours": "The museum is open daily from 10 AM to 6 PM. On Fridays, it stays open until 8 PM. The museum is open on most public holidays except Christmas Day and New Year's Day.",
        "Admission Fees": "Admission fees are $15 for adults, $10 for seniors, and $8 for children under 12. Children under 5 enter for free.",
        "Location": "The museum is located at 123 Main Street, Cityville, State, ZIP Code.",
        "Parking": "Yes, there is a parking lot adjacent to the museum with free parking for visitors.",
        "Current Exhibitions": "Currently, we have the 'Ancient Egypt' exhibition, the 'Modern Art Masters' collection, and the 'Dinosaurs of the Mesozoic' display.",
        "Upcoming Exhibitions": "Yes, the upcoming exhibition 'Renaissance Wonders' will open next month on the 15th.",
        "Permanent Collection": "Yes, our permanent collection includes artworks from the 16th century, artifacts from ancient civilizations, and a natural history section.",
        "Interactive Exhibits": "Yes, we have several interactive exhibits, including a virtual reality experience in the 'Fossil Discoveries' section and hands-on activities in the 'Science Lab' area.",
        "Photography Policy": "Photography is allowed in most areas of the museum, but flash photography and tripods are prohibited. Some special exhibitions may have restrictions.",
        "Guided Tours": "Yes, guided tours are available daily at 11 AM and 2 PM. You can also book private tours in advance.",
        "Workshops and Educational Programs": "Yes, we offer workshops for children and adults, as well as educational programs for school groups. Check our website for the latest schedule.",
        "Special Events": "Yes, the museum hosts special events like 'Night at the Museum,' lecture series, and family days. Visit our events page for more details.",
        "Private Events": "Yes, the museum is available for private events such as weddings, corporate functions, and parties. Please contact our events team for more information.",
        "Museum Café": "Yes, our café offers a selection of sandwiches, salads, and beverages. It's open during museum hours.",
        "Accessibility": "Yes, the museum is fully accessible, with elevators, ramps, and wheelchair-accessible restrooms available.",
        "Audio Guides": "Yes, audio guides are available for rent at the front desk in multiple languages.",
        "Stroller Policy": "Yes, strollers are welcome in the museum, and there are designated areas to park them during your visit.",
        "Pet Policy": "Pets are not allowed in the museum, but service animals are welcome.",
        "Museum Membership": "You can become a member by signing up on our website or at the admissions desk. Memberships come with benefits like free admission, discounts, and special event invitations."
    };

    const ticketQuestions = [
        "What's your name?",
        "What is your age group?",
        "What is your gender?",
        "What is your email address?",
        "What is your contact number?",
        "How many tickets would you like to purchase?",
        "What is your preferred date of visit?",
        "What is your preferred time of visit?",
        "What is your preferred time slot?"
    ];

    const ageGroupOptions = [
        "Child (0-12 years)",
        "Teen (13-19 years)",
        "Adult (20-64 years)",
        "Senior (65+ years)",
    ];
    const slotOptions = [
        "Morning",
        "Afternoon",
        "Evening"
]
    const genderOptions = [
        "Male",
        "Female",
        "Other",
        "Prefer Not to Say",
    ];

    const addMessage = (sender, text) => {
        setMessages(prevMessages => [...prevMessages, { sender, text }]);
    };

    const handleUserInput = (input) => {
        addMessage('user', input);

        // Update userChoices array
        if (step >= 0 && step <= 8) {
            setUserChoices(prevChoices => [...prevChoices, input]);
        }

        switch (step) {
            case 0:
                if (input === "Yes, I want to purchase a ticket") {
                    setStep(1);
                    addMessage('bot', ticketQuestions[0]);
                } else if (input === "No, I want to know something else") {
                    setStep(-1);
                    addMessage('bot', "What would you like to know? Here are the options:");
                    noOptions.forEach(option => addMessage('bot', option));
                } else {
                    addMessage('bot', "Please select one of the options provided.");
                }
                break;

            case -1:
                if (noOptions.includes(input)) {
                    setCurrentOption(input);
                    setStep(-2);
                    addMessage('bot', `${t('Here are the details for')} ${t(`${ input }`)} :`);
                    subOptions[input].forEach(option => addMessage('bot', option));
                } else if (Object.keys(answers).includes(input)) {
                    addMessage('bot', answers[input]);
                    addMessage('bot', "Is there anything else you'd like to know?");
                    setStep(0);
                } else if (subOptions[currentOption]?.includes(input)) {
                    addMessage('bot', answers[input] || "Information not available.");
                    addMessage('bot', "Is there anything else you'd like to know?");
                    setStep(0);
                } else {
                    addMessage('bot', "I'm sorry, I didn't understand that. Could you please choose from the options provided?");
                }
                break;

            case -2:
                if (subOptions[currentOption]?.includes(input)) {
                    addMessage('bot', answers[input] || "Information not available.");
                    addMessage('bot', "Is there anything else you'd like to know?");
                    setStep(0);
                } else {
                    addMessage('bot', "I'm sorry, I didn't understand that. Could you please choose from the options provided?");
                }
                break;

            case 1:
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    name: input
                }));
                setStep(2);
                addMessage('bot', ticketQuestions[1]);
                break;

            case 2:
                if (ageGroupOptions.includes(input)) {
                    setTicketDetails(prevDetails => ({
                        ...prevDetails,
                        ageGroup: input
                    }));
                    setStep(3);
                    addMessage('bot', ticketQuestions[2]);
                } else {
                    addMessage('bot', "Please select a valid age group from the options.");
                }
                break;

            case 3:
                if (genderOptions.includes(input)) {
                    setTicketDetails(prevDetails => ({
                        ...prevDetails,
                        gender: input
                    }));
                    setStep(4);
                    addMessage('bot', ticketQuestions[3]);
                } else {
                    addMessage('bot', "Please select a valid gender from the options.");
                }
                break;

            case 4:
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    email: input
                }));
                setStep(5);
                addMessage('bot', ticketQuestions[4]);
                break;

            case 5:
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    contact: input
                }));
                setStep(6);
                addMessage('bot', ticketQuestions[5]);
                break;

            case 6:
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    numberOfTickets: input
                }));
                setStep(7);
                addMessage('bot', ticketQuestions[6]);
                break;

            case 7:
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    preferredDate: input
                }));
                setStep(8);
                addMessage('bot', ticketQuestions[8]);
                break;

            case 8:
                // setTicketDetails(prevDetails => ({
                //     ...prevDetails,
                //     preferredTime: input
                // }));
                // paymentHandler();
                // // setStep(0);
                // addMessage('bot', "Thank you! We are processing your ticket request.");
            // break;
                if (slotOptions.includes(input)) {
                    setTicketDetails(prevDetails => ({
                        ...prevDetails,
                        preferredSlot: input
                    }))
                
                    paymentHandler();
                  
                    
                    addMessage('bot', "Thank you! We are processing your ticket request.");
                } else {
                    addMessage('bot', "Please select a valid time slot from the options.");
                }
               
                
                break;

            default:
                addMessage('bot', "Something went wrong. Please try again.");
                setStep(0);
        }

        // Console log the updated userChoices array
        
    };

    const handleOptionClick = (option) => {
        handleUserInput(option);
        playSound();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = e.target.elements.userInput.value.trim();
        handleUserInput(input);
        e.target.elements.userInput.value = '';
    };

    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        
    }, [userChoices]);


    // payment  code

    // const collectData = async (e) => {
    //     e.preventDefault();
      
    //     let result = await fetch("http://localhost:5000/saveuser", {
    //       method: "post",
    //       body: JSON.stringify({name:ticketDetails.name, gender:ticketDetails.gender, ageGroup:ticketDetails.ageGroup}),
    //       headers: {
    //         'Content-Type': 'application/json' // Ensure headers are sent
    //       },
    //     });
      
    //     result = await result.json(); // Correct the method to parse JSON
    //     localStorage.setItem("user", JSON.stringify(result));
      
    //     return result; // Return the result to handle it in paymentHandler
    //   };

    const collectData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/saveuser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: ticketDetails.name,
                    gender: ticketDetails.gender,
                    ageGroup: ticketDetails.ageGroup,
                    preferredDate: ticketDetails.preferredDate,
                    preferredSlot:ticketDetails.preferredSlot
                })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log("User data saved successfully:", result);
                return result;
            } else {
                console.error("Failed to save user data:", result);
                alert('Failed to save user data.');
                return null;
            }
        } catch (error) {
            console.error("Error occurred while saving user data:", error);
            alert('Error occurred while saving user data.');
            return null;
        }
    };
    const paymentHandler = async () => {
        // event.preventDefault();
  
        const userRes = await collectData();
        console.log(userRes);
        
        if (!userRes) {
            return; // Stop if data wasn't saved successfully
        }
      
        // Calculate the total amount
        const baseAmount = 10000; // Price per ticket
        const amount = baseAmount *ticketDetails.numberOfTickets ;
        const currency = 'INR';
        const receiptId = '1234567890';
   
        
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId
            })
        });

        const order = await response.json();
      
        const options = {
            key: "", // Razorpay API key
            amount,
            currency,
            name: "Museum Ticket",
            description: "Museum Ticket Purchase",
            image: "https://i.ibb.co/5Y3m33n/test.png",
            order_id: order.id,
            handler: async function (response) {
                const body ={...response,ticketDetails}
        

                const validateResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/validate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                const jsonResponse = await validateResponse.json();
            

                if (jsonResponse.msg === " Transaction is legit!") {
                   console.log(ticketDetails.preferredSlot);
                    navigate("/ticket",
                        {
                           
                        state: {
                            ...ticketDetails,
                            order_id: jsonResponse.orderId,
                            payment_id: response.razorpay_payment_id,
                            amount,
                            preferredTime: ticketDetails.preferredTime,
                            preferredSlot:ticketDetails.preferredSlot
                        }
                        }
                    );
                } else {
                    alert('Transaction failed. Please try again.');
                }
            },
            prefill: {
                name:ticketDetails.name,
                email:ticketDetails.email,
                contact:ticketDetails.contact,
            },
            notes: {
                address: "Museum Address",
            },
            theme: {
                color: "#3399cc",
            },
        };

        // var rzp1 = new window.Razorpay(options);
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();

    }


        const playSound = () => {
        const audio = new Audio('./sound.mp3'); // Add the path to your sound file
        audio.play();
      };
    



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
        <div className='app' > 
            <div className='chatbot' style={{marginTop:"5rem"}}>
                    <h1>{ t('Welcome to Triveni Museum')}</h1>
                <div className='conversation'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <p  >{t(`${msg.text}`)}</p>
                        </div>
                    ))}
                    <div ref={endOfMessagesRef} />
                </div>
                <div className='input-area'>
                    {(step === 0) && (
                        <div className="options">
                            <button onClick={() => handleOptionClick("Yes, I want to purchase a ticket")}>
                                {t('Yes, I want to purchase a ticket')}
                            </button>
                            <button onClick={() => handleOptionClick("No, I want to know something else")}>
                                    { t('No, I want to know something else')}
                            </button>
                        </div>
                    )}
                    {(step === -1 || step === -2) && (
                        <div className="options">
                            {step === -1 ? noOptions.map((option, index) => (
                                <button key={index} onClick={() => handleOptionClick(option)}>
                                    {t(`${option}`)}
                                </button>
                            )) : subOptions[currentOption]?.map((option, index) => (
                                <button key={index} onClick={() => handleOptionClick(option)}>
                                    {t(`${option}`)}
                                </button>
                            ))}
                        </div>
                    )}
                    {step >= 1 && step <= 8 && step !== 2 && step !== 3 && step !== 8  && (
                        <form onSubmit={handleSubmit}>
                            <input
                                    type={step === 7 ? "date" : step === 8 ? "time" : "text"}
                                    name="userInput"
                                    autoComplete="off"
                                    required
                                    placeholder={t("Type your response here...")}
                            />
                                <button type="submit" onClick={playSound}>{t('Send')}</button>
                        </form>
                    )}
                    {(step === 2) && (
                        <div className="options">
                            {ageGroupOptions.map((option, index) => (
                                <button key={index} onClick={() => handleOptionClick(option)}>
                                    {t(`${option}`)}
                                </button>
                            ))}
                        </div>
                    )}
                    {(step === 3) && (
                        <div className="options">
                            {genderOptions.map((option, index) => (
                                <button key={index} onClick={() => handleOptionClick(option)}>
                                    {t(`${option}`)}
                                </button>
                            ))}
                        </div>
                    )}
                    {(step === 8) && (
                        <div className="options">
                            {slotOptions.map((option, index) => (
                                <button key={index} onClick={() => handleOptionClick(option)} >
                                    {t(`${option}`)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            </div>
            </div>
    );
}

export default Chatbot;
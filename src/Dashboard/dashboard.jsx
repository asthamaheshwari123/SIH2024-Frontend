import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";
import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
} from "react-chartjs-2";
import "./dashboard.css";
import i18n from 'i18next'
import { useTranslation, initReactI18next } from "react-i18next";
import tEn from "../locales/en/translation.json"
import tHin from "../locales/hin/translation.json"
import tTam from "../locales/tam/translation.json"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

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
        
    
Chart.register(...registerables);

const Dashboard = () => {
    const navigate = useNavigate();
  
    // Check if the user is authenticated
 
    const [data, setData] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
      const currLang = localStorage.getItem('lang');
      i18n.changeLanguage(currLang);
    },[])


//   const password = "mohan";

//   useEffect(() => {
//     const userPassword = prompt("Please enter the password to access the dashboard:");
//     if (userPassword === password) {
//       setIsAuthorized(true);
//     } else {
//       alert("Incorrect password. Access denied.");
//     }
//   }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(isAuthenticated);
  
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
      return; // Render nothing while redirecting
    }
      Papa.parse("./data02.csv", {
        header: true,
        dynamicTyping: true,
        download: true,
        complete: function (results) {
          setData(results.data);
          console.log("Parsed CSV data:", results.data);
        },
        error: function (error) {
          console.error("Error loading CSV data:", error);
        },
      });
    
  }, []);

  const countOccurrences = (arr) =>
    arr.reduce((acc, curr) => {
      if (curr !== undefined && curr !== null) {
        acc[curr] = (acc[curr] || 0) + 1;
      }
      return acc;
    }, {});

  const calculateWeeklyAverages = (data) => {
    const weekMap = {};

    data.forEach((row) => {
      if (row.Date) {
        const date = new Date(row.Date);
        const weekStart = new Date(
          date.setDate(date.getDate() - date.getDay() + 1)
        );
        const weekKey = weekStart.toISOString().split("T")[0];

        if (!weekMap[weekKey]) {
          weekMap[weekKey] = { count: 0, total: 0 };
        }
        weekMap[weekKey].count += 1;
        weekMap[weekKey].total += row.Number_of_people_per_day;
      }
    });

    const weeks = Object.keys(weekMap);
    const averages = weeks.map((week) =>
      (weekMap[week].total / weekMap[week].count).toFixed(2)
    );

    return { weeks, averages };
  };

  const generateAnalysis = (chartId, data, labels) => {
    let analysisText = "";
    switch (chartId) {
      case "chart1":
        const maxAvg = Math.max(...data);
        const minAvg = Math.min(...data);
        analysisText = `The average number of people per week ranges from ${minAvg} to ${maxAvg}.`;
        break;
      case "chart2":
        const maxDay = labels[data.indexOf(Math.max(...data))];
        analysisText = `The most popular day of the week is ${maxDay}.`;
        break;
      case "chart3":
        const malePercentage = (
          (data[0] / data.reduce((a, b) => a + b)) *
          100
        ).toFixed(2);
        analysisText = `The gender distribution is ${malePercentage}% male and ${
          100 - malePercentage
        }% female.`;
        break;
      case "chart4":
        const maxSlot = labels[data.indexOf(Math.max(...data))];
        analysisText = `The most popular slot is ${maxSlot}.`;
        break;
      case "chart5":
        const maxCategory = labels[data.indexOf(Math.max(...data))];
        analysisText = `The most common question category is ${maxCategory}.`;
        break;
      case "chart6":
        const maxAgeGroup = labels[data.indexOf(Math.max(...data))];
        analysisText = `The most common age group is ${maxAgeGroup}.`;
        break;
      default:
        break;
    }
    return analysisText;
  };

  if (!data) {
    return <p>Loading...</p>;
  }

  const { weeks, averages } = calculateWeeklyAverages(data);

  const charts = [
    {
      id: "chart1",
      title: "Number of People per Day",
      type: "line",
      labels: weeks,
      dataset: averages,
      component: Line,
    },
    {
      id: "chart2",
      title: "Distribution by Weekday",
      type: "bar",
      labels: Object.keys(countOccurrences(data.map((row) => row.Weekday))),
      dataset: Object.values(
        countOccurrences(data.map((row) => row.Weekday))
      ),
      component: Bar,
    },
    {
      id: "chart3",
      title: "Gender Distribution",
      type: "pie",
      labels: Object.keys(countOccurrences(data.map((row) => row.Gender))),
      dataset: Object.values(
        countOccurrences(data.map((row) => row.Gender))
      ),
      component: Pie,
    },
    {
      id: "chart4",
      title: "Distribution by Slot",
      type: "doughnut",
      labels: Object.keys(countOccurrences(data.map((row) => row.Slot))),
      dataset: Object.values(
        countOccurrences(data.map((row) => row.Slot))
      ),
      component: Doughnut,
    },
    {
      id: "chart5",
      title: "Question Category Distribution",
      type: "radar",
      labels: Object.keys(
        countOccurrences(data.map((row) => row.Question_Category))
      ),
      dataset: Object.values(
        countOccurrences(data.map((row) => row.Question_Category))
      ),
      component: Radar,
    },
    {
      id: "chart6",
      title: "Age Group Distribution",
      type: "polarArea",
      labels: Object.keys(
        countOccurrences(data.map((row) => row.Age_Group))
      ),
      dataset: Object.values(
        countOccurrences(data.map((row) => row.Age_Group))
      ),
      component: PolarArea,
    },
  ];    
    return (
        <div className="dashboard-style">
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
     
    <div className="dashboard bg-gray-100 min-h-screen flex flex-col items-center justify-start p-4 page mt-5">
      <header className="mb-8 mt-8">
        <h2 className="text-6xl font-bold text-center text-white shadow-text glass px-10 py-5">
          Admin Dashboard
        </h2>
      </header>

      <div id="content" className="w-full max-w-7xl mx-auto">
        <div className="glass p-8">
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {charts.map((chart) => {
              const analysis = generateAnalysis(
                chart.id,
                chart.dataset,
                chart.labels
              );
              return (
                <div
                  key={chart.id}
                  className="chart-container bg-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    {chart.title}
                  </h3>
                  <chart.component
                    data={{
                      labels: chart.labels,
                      datasets: [
                        {
                          label: chart.title,
                          data: chart.dataset,
                          backgroundColor: "rgba(75, 192, 192, 0.2)",
                          borderColor: "rgba(75, 192, 192, 1)",
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                  <p className="mt-4 text-sm text-gray-600">{analysis}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
            </div>
            </div>
  );
};

export default Dashboard;

import React from "react";
import './App.css';
import Cards from './components/Cards';
import BarChart from './components/BarChart';
import Counturies from './components/Conturies';
import Header from './components/Header';


function App() {

  return (
    <div className="App_container">
     <Header />
     <Cards />
     <Counturies />
     <BarChart />
    </div>
    
  );
}

export default App;

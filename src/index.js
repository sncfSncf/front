import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import JourJ from './pages/JourJ/index'
import Historique from './pages/Historique/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import Header from './components/Header'
import Journal from './pages/Journal'
import Sam5 from './pages/Sam5'
import NF50592 from './pages/50592'
import Synoptique from './pages/Synoptique'
import SYRENNE from './pages/SYRENNE'
import Temps from './pages/Temps'
import Statistique from './pages/Statistiques'
import Authentification from './pages/Authentification'
import Administration from './pages/Administration'
import Users from './pages/Users'
import Footer from './components/Footer'
import { AuthProvider } from './pages/Authentification/AuthContext'
import Aide from './pages/Aide'
import Rapports from './pages/Rapports'
import Testrapport from './pages/Testrapport'

function App() {
  return (
    <Router>
      <AuthProvider >
      <Header />
      <Route exact path="/">
        <Authentification />
      </Route>
      <Route path="/jourJ">
        <JourJ />
      </Route>
      <Route path="/historique">
        <Historique />
      </Route>
      <Route path="/journal">
        <Journal />
      </Route>
      <Route path="/statistique">
        <Statistique />
      </Route>
      <Route path="/rapports">
        <Rapports />
      </Route>
      <Route path="/SAMS005/:dateFichier/:heureFichier/:site">
        <Sam5 />
      </Route>
      <Route path="/syrenne/:dateFichier/:heureFichier/:site">
        <SYRENNE />
      </Route>
      <Route path="/50592/:dateFichier/:heureFichier/:site">
        <NF50592 />
      </Route>
      <Route path="/synoptique">
        <Synoptique />
      </Route>
      <Route path="/temps/:dateFichier/:heureFichier/:site">
        <Temps />
      </Route>
      <Route path="/administration">
        <Administration />
      </Route>
      <Route path="/aide">
        <Aide />
      </Route>
      <Route path="/test">
        <Testrapport />
      </Route>
     
      <Route path="/NewUser/:id?">
        <Users />
      </Route>
      <Footer/>
      </AuthProvider >
    </Router>
   
  )
}

ReactDOM.render(
  
    <App />,
  document.getElementById('root')
)

reportWebVitals()

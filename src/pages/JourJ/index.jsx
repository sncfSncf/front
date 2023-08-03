import '../../App.css'
import React, { useContext } from 'react'
import Tableau from '../../components/Tableaux/tableau_train'
import Site from '../../components/SelectList/sites'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import config from '../../config'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../components/Loading'
import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import PDF from '../../components/PDF/pdfHistorique'
function JourJ() {
  const date = dayjs().format('YYYY-MM-DD')

  const [trains, setTrains] = useState([])
  const [site, setSelectedSite] = React.useState()
  const [showAlert, setShowAlert] = useState(false);
  const [token,setToken]= useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()
  //Recuperation de tous les users existants
 
  useEffect(() => {
    if (!token  ) {
      history.push('/')
    }
  }, [token, history])

  const handleSiteChange = (newSite) => {
    setSelectedSite(newSite)
  }

  const loadTrains = async () => { 
    try {
      if (!site  ) {
        setShowAlert(true);
        return;
      }
      setIsLoading(true);
      
       // http://localhost:8080/data?site=Chevilly&dateFichier=2023-06-24
      const resultat = await axios.get(`${config.API_URLV2}/data?site=${site}&dateFichier=${date}`)

      
      setTrains(resultat.data)
      setIsLoading(false)

      
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsLoading(false)
        setSelectedSite('')
        setTrains([])
        alert("La ressource demandée n'a pas été trouvée.")
        
        
      } else {
        setIsLoading(false)
        setTrains([])
        setSelectedSite('')
        alert('Une erreur s\'est produite lors de la récupération des données.')
        
      }
      
      setShowAlert(false); 
    }
    
  }

  useEffect(() => {
    loadTrains()
  }, [site])

  return (
    <>
   
      <div className="parent historique">
        <div className='filtre historique'>
        <Site onChange={handleSiteChange} />
        </div>
        {isLoading ? (
          <Loading/>
        ):(
          trains.length > 0 &&
          <div className="JourJ">
             <p>{site}</p>
             <div style={{ display: 'inline-block', position: 'absolute', right: '0px', margin: 'auto', top: '10px',color:'#fff'}}>
                <PDF data={trains} periode={[date, date]} site={site} />
                <Button variant="primary" onClick={loadTrains}><RefreshIcon /> Rafraîchir</Button>
              </div>
            <Tableau trains={trains} />
          </div>
        )
}
        
      </div>
    </>
  )
}

export default JourJ

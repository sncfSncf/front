import '../../styles/styles.css'
import * as React from 'react'
import dayjs from 'dayjs'
import Tableau from '../../components/Tableaux/tableau_train'
import Site from '../../components/SelectList/sites'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RangeDatePicker from '../../components/Calender'
import RefreshIcon from '@mui/icons-material/Refresh'
import PDF from '../../components/PDF/pdfHistorique'
import { Button } from '@mui/material'
import config from '../../config'
import { useHistory } from 'react-router-dom'
import Loading from '../../components/Loading'


function Historique() {
  const [site, setSelectedSite] = useState('')
  const [trains, setTrains] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const token = localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(false);
  
  const history = useHistory()
  //Recuperation de tous les users existants
  useEffect(() => {
    if (!token  ) {
      history.push('/')
    }
  }, [token, history])


  const handleDateChange = (ranges) => {
    setStartDate(dayjs(ranges.selection.startDate).format('YYYY-MM-DD'))

    setEndDate(dayjs(ranges.selection.endDate).format('YYYY-MM-DD'))
  }

  const handleSiteChange = (newSite) => {
    setSelectedSite(newSite)
    console.log(site)
  }

  const loadTrains = async () => {
    try {
      // Vérifier si les filtres ont été sélectionnés avant de charger les trains
      if (!site || !startDate || !endDate) {
        setShowAlert(true);
        return;
      }
      setIsLoading(true);
      setShowAlert(false)
      //Récupération des trains d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(`${config.API_URL}/dataBetween?site=${site}&startDateFichier=${startDate}&FinDateFichier=${endDate}`)

      setTrains(resultat.data)
      setIsLoading(false);
      console.log(trains)
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 404) {
        alert("La ressource demandée n'a pas été trouvée.")
      } else {
        setIsLoading(false);
        alert('Une erreur s\'est produite lors de la récupération des données.')
      }
      setTrains([])
      setShowAlert(false); // mettre à jour l'état pour masquer l'alerte
    }
  }

  useEffect(() => {
    loadTrains()
  }, [site, startDate, endDate])
  console.log(trains)
 






  return (
    <>
      <div className="parent historique">
        <div className="filtre historique">
          <RangeDatePicker onChange={handleDateChange} />
          <Site onChange={handleSiteChange} />
          {showAlert && <p>Les filtres doivent être sélectionnés.</p>}
        </div>
        {isLoading ? (
          <Loading/>
        ):(
        trains.length > 0 && (
        <div className="tableau" style={{ position: 'relative' }}>
         
            <p>{site}
              <div style={{ display: 'inline-block', position: 'absolute', right: '0px', margin: 'auto', top: '10px' }}>
                <Button variant="primary" onClick={loadTrains}><RefreshIcon /> Raffraichir</Button>
                <PDF data={trains} periode={[startDate, endDate]} site={site} />
              </div>
            </p>
          
          <Tableau trains={trains} />
        </div>
        )
        )}
      </div>
    </>
  )
}

export default Historique

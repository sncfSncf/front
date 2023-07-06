import React, { useEffect, useState,useRef } from 'react'
import Site from '../../components/SelectList/sites'
import styles from '../../styles/styles.css'
import Resultats from '../../components/SelectList/resultats'
import Footer from '../../components/Footer'
import { Button, InputLabel } from '@mui/material'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import PDFRapport from '../../components/PDF/pdfRapport'
import RangeDatePicker from '../../components/Calender'
import RefreshIcon from '@mui/icons-material/Refresh'
import Toolbar from '../../components/Toolbar'
import Tableau from '../../components/Tableaux/tableau_train'
import config from '../../config'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Journal() {
  const [site, setSelectedSite] = useState('')
  const [trains, setTrains] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const optionSAM = ['NOK', 'OK', 'uniquement SAM']
  const [resultSAM, setResultSAM] = useState('')
  const option50592 = ['NOK', 'OK', 'uniquement 50592']
  const [result50592, setResult50592] = useState('')
  const [disabled50, setDisabled50] = useState(false)
  const [disabledSam, setDisabledSam] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [categorie, setCategorie] = useState([])
  const history = useHistory()
  const [typesMR, setTypesMR] = useState('')
  const [infos, setInfos] = useState([])
  const [CEPerturbe, setCEPerturbe] = useState([])

  const [pdfData, setPdfData] = useState(null)
  const [capteurs,setCapteurs]=useState([])


  const myRef = useRef()



  // Recuperation de tous les users existants
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history.push('/')
    }
  }, [history])

  const handleDateChange = (ranges) => {
    setStartDate(dayjs(ranges.selection.startDate).format('YYYY-MM-DD'))
    setEndDate(dayjs(ranges.selection.endDate).format('YYYY-MM-DD'))
  }

  const handleSiteChange = (newSite) => {
    setSelectedSite(newSite)
  }

  const handleResultSAMChange = (newRes) => {
    if (newRes === 'OK' || newRes === 'NOK') setResultSAM(newRes)
    else setResultSAM('uniquement sam')
  }

  const handleResult50592Change = (newRes) => {
    setResult50592(newRes)

    if (newRes === 'OK' || newRes === 'NOK') setResult50592(newRes)
    else setResult50592('uniquement 50592')
  }

  

  const loadTrains = async () => {
    console.log("debug","result50592 resultSAM",result50592 ,resultSAM)
    try {
      if (!site || !startDate || !endDate) {
        setShowAlert(true)
        return
      }
      setShowAlert(false)

      const resultat = await axios.get(
        `${config.API_URL}/dataBetween?site=${site}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setTrains(resultat.data)
      

      if (result50592 !== '' || resultSAM !== '') {
        let trainsWithFilters

        // Traitement uniquement SAM
        if (resultSAM.includes('uniquement')) {
          trainsWithFilters = resultat.data.filter(
            (train) => train.statutSAM === 'OK' || train.statutSAM === 'NOK'
          )
          setDisabled50(true)
        } else if (result50592.includes('uniquement')) {
          trainsWithFilters = resultat.data.filter(
            (train) => train.statut50592 === 'OK' || train.statut50592 === 'NOK'
          )
          setDisabledSam(true)
        } else {
          trainsWithFilters = resultat.data.filter(
            (train) =>
              train.statut50592 === result50592 && train.statutSAM === resultSAM
          )
          setDisabled50(false)
          setDisabledSam(false)
        }

        setTrains(trainsWithFilters)
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("La ressource demandée n'a pas été trouvée.")
      } else {
        alert("Une erreur s'est produite lors de la récupération des données.")
      }
      setShowAlert(false) // mettre à jour l'état pour masquer l'alerte
      setTrains([])
    }
  }
  const refresh = () => {
    myRef.current.childMethod() 

  };


  const loadCapteurs = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/allcapteurs`)
      if (response.status === 200) {
        const data = response.data
        setCapteurs(data)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }
  const loadCEPerturbe = async ()=>{
    try {
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenRapport?site=${site}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setCEPerturbe(resultat.data[resultat.data.length-1])
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    loadCapteurs()
  }, [])
  const loadCategories = async () => {
    try {
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenrMr?site=${site}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setCategorie(resultat.data)
      const typesMRArray = resultat.data.map((obj) => obj.typeMR)
      const typesMRString = typesMRArray.join(',')
      setTypesMR(typesMRString)
    } catch (error) {
      console.error(error)
    }
  }
  const loadInfos = async () => {
    try {
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenstatistique?site=${site}&typemr=${typesMR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setInfos(resultat.data)
      console.log("logger","infos",resultat.data,        `${config.API_URL}/dataBetweenstatistique?site=${site}&typemr=${typesMR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    loadTrains()
  }, [site, startDate, endDate])
  useEffect(() => {
    loadInfos()
  }, [resultSAM, result50592])

  useEffect(() => {
    loadCategories()
   
    loadCEPerturbe()
  }, [site, startDate, endDate])

  return (
    <>
      <div className="parent historique">
        <div className="filtre historique">
          <RangeDatePicker onChange={handleDateChange} />
          <Site className="site" onChange={handleSiteChange} />
          {showAlert && <p>Les filtres doivent être sélectionnés.</p>}
        </div>
        <div className="resultat">
          <div className="journal" style={{ position: 'relative',marginRight:'30px' }}>
            <p>
              Journal
              <div
                style={{
                  display: 'inline-block',
                  position: 'absolute',
                  right: '15px',
                  margin: 'auto',
                  top: '10px',
                }}
              >
                <Button variant="primary" onClick={refresh}>
                  <RefreshIcon /> Rafaîchir
                </Button>

                {
                  <PDFRapport 
                  customData={[infos, categorie,CEPerturbe]}
                  periodeL={[startDate, endDate]}
                  siteSelectionne={site}
                />
                }
              </div>
            </p>
            <div>
              <Toolbar />
              
             
            </div>
            <Tableau trains={trains} onSearchSamChange={handleResultSAMChange} onSearch50592Change={handleResult50592Change} ref={myRef}  />
          </div>
          
          </div>
        </div>
      
    </>
  )
}
export default Journal

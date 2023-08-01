import '../../styles/styles.css'
import * as React from 'react'
import dayjs from 'dayjs'
import Site from '../../components/SelectList/sites'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RangeDatePicker from '../../components/Calender'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
  Button,
  Hidden,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import Chart from 'chart.js/auto'
import ToolbarRapport from '../../components/Toolbar'
import Resultats from '../../components/SelectList/resultats'
import config from '../../config'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import PDFStatistique from '../../components/PDF/PDFStatistique'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import html2pdf from 'html2pdf.js'
import logo from '../../exemples/images/logoSNCF.png'
import { Height } from '@material-ui/icons'
import StatsChart from './StatsChart'
import Select, { components } from 'react-select'
import Loading from '../../components/Loading'

function Statistique() {
  const [showToolbar, setShowToolbar] = useState(false)

  const [myChartData50592NOK, setmyChartData50592NOK] = useState([])
  const [myChartData50592NOKIndex, setMyChartData50592NOKIndex] = useState([])
  const [myChartData50592OK, setmyChartData50592OK] = useState(null)
  const [myChartDataSamNOK, setmyChartDataSamNOK] = useState([])
  const [myChartDataSamNOKIndex, setMyChartDataSamNOKIndex] = useState([])
  const [myChartDataSamOK, setmyChartDataSamOK] = useState(null)
  const [myChartTotal, setmyChartTotal] = useState('')
  const [newTotal, setnewTotal] = useState(false)
  const [showOkChart, setshowOkChart] = useState(false)
  const [infos, setInfos] = useState([])
  const [chargement, setChargement] = useState([])
  const [site, setSelectedSite] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // const [site, setSelectedSite] = useState('Chevilly')
  // const [startDate, setStartDate] = useState('2023-03-28')
  // const [endDate, setEndDate] = useState('2023-06-27')
  const [BE, setBE] = useState('')
  const [BL, setBL] = useState('')
  const [convertedData, setConvertedData] = useState(null)

  const [MR, setMR] = useState([])
  const [resultSAM, setResultSAM] = useState('')
  const [result50592, setResult50592] = useState('')
  const [typemr, setTypemr] = useState([])
  const [disabled50, setDisabled50] = useState(false)
  const [disabledSam, setDisabledSam] = useState(false)
  const [optionBE_CE, setOptionBE_CE] = useState([])
  const optionSAM = [
    { label: 'NOK', value: 'NOK' },
    { label: 'OK', value: 'OK' },
  ]
  const option50592 = [
    { label: 'NOK', value: 'NOK' },
    { label: 'OK', value: 'OK' },
  ]
  /* const optionSAMSingle= ["OK","NOK"]
  const option50592Single = ["OK","NOK"]*/
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const optionBE = ['', 'D39', 'D39-bis', 'D50_bis', 'D50']
  /*let capteurs = null
  let pourcentage50592 = []
  let nbrPassage50592 = []
  let nbrPassageSAM = []
  let evs = null
  let pourcentageSAM = []
*/
  const handleResult50592ChangeSingle = (newRes) => {
    if (newRes === 'uniquement 50592') {
      setResultSAM('')
      //handleResult50592Change(resultSAM)
      setDisabledSam(true)
    } else {
      setDisabledSam(false)
    }
    setResult50592(newRes)
  }

  const handleResultSAMChangeSingle = (newRes) => {
    if (newRes === 'uniquement sam') {
      setResult50592('')
      // handleResult50592Change(result50592)
      setDisabled50(true)
    } else {
      setDisabled50(false)
    }
    setResultSAM(newRes)
    console.log(resultSAM)
  }

  const handleDateChange = (ranges) => {
    setStartDate(dayjs(ranges.selection.startDate).format('YYYY-MM-DD'))

    setEndDate(dayjs(ranges.selection.endDate).format('YYYY-MM-DD'))
  }
  const InputOption = ({
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }) => {
    const [isActive, setIsActive] = useState(false)
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)
    const onMouseLeave = () => setIsActive(false)

    // styles
    let bg = 'transparent'
    if (isFocused) bg = '#eee'
    if (isActive) bg = '#B2D4FF'

    const style = {
      alignItems: 'center',
      backgroundColor: bg,
      color: 'inherit',
      display: 'flex ',
    }

    // prop assignment
    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    }

    return (
      <components.Option
        {...rest}
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
      >
        <input type="checkbox" checked={isSelected} />
        <span style={{ marginLeft: '5px' }}></span>
        {children}
      </components.Option>
    )
  }
  const handleSiteChange = (newSite) => {
    setSelectedSite(newSite)
    console.log(site)
  }

  const handleBEChange = (newRes) => {
    setBE(newRes)
    console.log(BE)
  }
  const handleBLChange = (newRes) => {
    setBL(newRes)
    console.log(BL)
  }
  const handleMRChange = (event) => {
    event.sort()
    if (event?.length > 0) {
      setmyChartTotal(null)
    } else {
    }
    setMR(event)
  }

  const handleResultSAMChange = (newRes) => {
    if (newRes.length > 1) {
      setmyChartTotal(null)
      // setResult50592('uniquement 50592')
      setResultSAM('uniquement sam')
      setDisabledSam(true)
    } else if (newRes.length === 1) {
      setmyChartTotal(null)
      setResultSAM(newRes[0])
      setDisabledSam(false)
    } else {
      setResultSAM('')
    }
  }

  // const handleResultSAMChange = (newRes) => {
  //   if(newRes.length>1){
  //     setResult50592('uniquement 50592')
  //     setDisabledSam(true)

  //   }
  //   else{
  //     setResult50592(newRes[0])
  //     setDisabledSam(false)

  //   }

  const handleResult50592Change = (newRes) => {
    if (newRes.length > 1) {
      setmyChartTotal(null)
      setResult50592('uniquement 50592')
      setDisabledSam(true)
    } else if (newRes.length === 1) {
      setmyChartTotal(null)
      setResult50592(newRes[0])
      setDisabledSam(false)
    } else {
      setResult50592('')
    }
  }

  /*useEffect(() => {
      if(infos?.CompteursSam005?.Nombre&&resultSAM===''&&result50592===''&&MR.length===0){
        console.debug("1",{totalSam:infos.CompteursSam005.Nombre,total50592:infos.Compteurs50592.Nombre})
  // alert(infos.CompteursSam005.Nombre) 
      setmyChartTotal({totalSam:infos.CompteursSam005.Nombre,total50592:infos.Compteurs50592.Nombre})
      }
     
      }, [startDate,endDate,site,result50592,resultSAM,MR])*/

  const loadInfos = async () => {
    setIsLoading(true)
    try {
      setmyChartData50592NOK([])
      setmyChartData50592OK(null)
      setmyChartDataSamNOK([])
      setmyChartDataSamOK(null)
      setMyChartData50592NOKIndex([])
      setMyChartDataSamNOKIndex([])

      //Récupération des infos d'une date séléctionnée par l'utilisateur
      setChargement(true)
      //
      const resultat = await axios.get(
        `${config.API_URLV2}/Stats?site=${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setChargement(false)
      console.log(
        `${config.API_URLV2}/Stats?site=${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )

      setInfos(resultat?.data)
      setIsLoading(false)

      console.debug(
        '0',
        `${config.API_URLV2}/Stats?site=${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      if (resultSAM === '' && result50592 === '' && MR.length === 0) {
        setmyChartTotal({
          totalSam: resultat?.data.CompteursSam005.Nombre,
          total50592: resultat?.data.Compteurs50592.Nombre,
        })
      }

      console.debug('2', myChartTotal)
    } catch (error) {
      setChargement(false)
      console.error('axiosError', error)
      setIsLoading(false)
    }
  }
  //Récupération des types mr
  const loadTypeMr = async () => {
    try {
      setChargement(true)

      const resultat = await axios.get(`${config.API_URL}/typemr`)
      setChargement(false)
      setTypemr(
        resultat?.data.map((mr) => {
          return { value: mr, label: mr }
        })
      )
    } catch (error) {
      setChargement(false)
      console.error(error)
    }
  }

  //Récupération des CE
  const loadCE = async () => {
    try {
      setChargement(true)

      const resultat = await axios.get(`${config.API_URL}/capteurs`)
      setChargement(false)
      setOptionBE_CE(resultat?.data)
    } catch (error) {
      setChargement(false)
    }
  }
  const handleScroll = () => {
    window.scrollTo(0, window.innerHeight) // Scrolls to the bottom of the page
  }

  const handleDownloadPdf = () => {
    setShowToolbar(true) // Change the value of showToolbar after the PDF is saved
    const element = document.getElementById('pdf-content')

    handleScroll()
    html2pdf()
      .set({
        filename: 'pdf-statistique.pdf',
        pagebreak: { mode: 'avoid-all', before: '#page2el' },
        jsPDF: {
          orientation: 'landscape',
        },
        html2canvas: {
          scale: 2, // Adjust the scale as needed for better quality
        },
      })
      .from(element)
      .save()
      .then(() => {
        setShowToolbar(false) // Change the value of showToolbar after the PDF is saved
      })
  }

  const createChart = async () => {
    if (infos) {
      //OKChart50592

      if (result50592 === 'uniquement 50592' || result50592 === 'OK') {
        const chartData = {
          datasets: [],
          labels: [],
          nbrPassages: [],
        }
        if (infos.VueParTypeMR.length !== 0) {
          infos.VueParTypeMR?.forEach((item) => {
            let mrKey = item.TypeDeTrain
            let pourcentageMr = item.PassagesSam005.PourcentageOK
            let nbrPassages = item.PassagesSam005.NombreOK

            if (!mrKey) {
              mrKey = 'le poucentage des 50592 ok'
              pourcentageMr = infos.Compteurs50592.PourcentageOK
              nbrPassages = infos.Compteurs50592.NombreOK
            }
            if (pourcentageMr) {
              chartData.labels.push(mrKey)
              chartData.datasets.push(pourcentageMr)
              chartData.nbrPassages.push(nbrPassages)
              // chartData.set(mrKey, chartData);
            }
          })
        } else {
          let mrKey = 'le poucentage des 50592 ok'
          let pourcentageMr = infos.Compteurs50592.PourcentageOK
          let nbrPassages = infos.Compteurs50592.NombreOK

          if (pourcentageMr) {
            chartData.labels.push(mrKey)
            chartData.datasets.push(pourcentageMr)
            chartData.nbrPassages.push(nbrPassages)
            // chartData.set(mrKey, chartData);
          }
        }

        console.log('nombrepassage', chartData)

        setmyChartData50592OK(chartData)
        // console.log("finale",chartData)
      }
      //NOKChart50592
      if (result50592 === 'uniquement 50592' || result50592 === 'NOK') {
        const myChartData = []
        const chartTitles = []
        setDisabled50(false)
        if (infos.VueParTypeMR.length !== 0) {
          infos.VueParTypeMR?.forEach((item) => {
            let mrKey = item.TypeDeTrain
            let nbrPassages
            // le traitement est deja dans le html
            let pourcentageCapteur =
              item.Depassements50592.DepassementsPourcentage
            // alert(JSON.stringify(pourcentageCapteur))
            //            if(MR.length!==0){
            //             nbrPassages = item['nombre de train passé 50592 nok']
            //            }
            // else{
            // nbrPassages = Object.entries(item.Depassements50592.DepassementsNombre).map(([label, value])=>value)
            nbrPassages = item.Passages50592.NombreNOK
            // alert(JSON.stringify(nbrPassages))
            // if(result50592===''){
            //   nbrPassages = item['nombre de train passé (50592 nok)']

            // }
            // }
            // if (!mrKey) {
            //   mrKey = 'Total'
            //   // alert(nbrPassages)

            //   // pourcentageMr = item["le poucentage des 50592 (50592 ok)"];
            // }

            if (pourcentageCapteur) {
              const chartData = {
                datasets: [],
                labels: [],
                nbrPassages: nbrPassages,
              }

              let pourcentageCapteurFiltered = JSON.parse(
                JSON.stringify(pourcentageCapteur)
              )
              const filter = []
              if (BL) {
                filter.push(BL)
              }
              if (BE) {
                filter.push(BE)
              }
              if (filter.length > 0) {
                // alert(JSON.stringify(BE))
                Object.keys(pourcentageCapteurFiltered).forEach((key) => {
                  if (!filter.find((cpt) => cpt === key)) {
                    delete pourcentageCapteurFiltered[key]
                  }
                })
              }

              Object.entries(pourcentageCapteurFiltered).forEach(
                ([label, value]) => {
                  chartData?.labels.push(label)
                  chartData.datasets.push(value)
                }
              )
              // chartData.set(mrKey, chartData);
              myChartData.push(chartData)
              chartTitles.push(mrKey)
              console.debug('debug50NOK', myChartData, chartTitles)
            }
          })
        } else {
          let mrKey = 'NOK'
          let nbrPassages = infos.Compteurs50592.NombreNOK
          // le traitement est deja dans le html
          let pourcentageCapteur =
            infos.Depassements50592.DepassementsPourcentage

          if (pourcentageCapteur) {
            const chartData = {
              datasets: [],
              labels: [],
              nbrPassages: nbrPassages,
            }

            let pourcentageCapteurFiltered = JSON.parse(
              JSON.stringify(pourcentageCapteur)
            )
            const filter = []
            if (BL) {
              filter.push(BL)
            }
            if (BE) {
              filter.push(BE)
            }
            if (filter.length > 0) {
              // alert(JSON.stringify(BE))
              Object.keys(pourcentageCapteurFiltered).forEach((key) => {
                if (!filter.find((cpt) => cpt === key)) {
                  delete pourcentageCapteurFiltered[key]
                }
              })
            }

            Object.entries(pourcentageCapteurFiltered).forEach(
              ([label, value]) => {
                chartData?.labels.push(label)
                chartData.datasets.push(value)
              }
            )
            // chartData.set(mrKey, chartData);
            myChartData.push(chartData)
            chartTitles.push(mrKey)
            console.debug('debug50NOK', myChartData, chartTitles)
          }
        }
        setmyChartData50592NOK(myChartData)
        setMyChartData50592NOKIndex(chartTitles)
      }

      //SAM
      if (resultSAM === 'uniquement sam' || resultSAM === 'OK') {
        const chartData = {
          datasets: [],
          labels: [],
          nbrPassages: [],
        }
        if (infos.VueParTypeMR.length !== 0) {
          infos.VueParTypeMR?.forEach((item) => {
            chartData.labels.push(item.TypeDeTrain)
            chartData.datasets.push(item.PassagesSam005.PourcentageOK)
            chartData.nbrPassages.push(item.PassagesSam005.NombreOK)

            // chartData.set(mrKey, chartData);
          })
        } else {
          chartData.labels.push('SAM OK')
          chartData.datasets.push(infos.CompteursSam005.PourcentageOK)
          chartData.nbrPassages.push(infos.CompteursSam005.NombreOK)
        }
        setmyChartDataSamOK(chartData)
      }
      //NOKChartSam
      console.debug('NOKChartSam', resultSAM)

      if (resultSAM === 'uniquement sam' || resultSAM === 'NOK') {
        console.debug('NOKChartSam')

        const myChartData = []
        const chartTitles = []
        // alert(JSON.stringify(infos.VueParTypeMR))
        console.debug('SAMNNOK', infos)

        if (infos.VueParTypeMR.length !== 0) {
          infos.VueParTypeMR?.forEach((item) => {
            chartTitles.push(item.TypeDeTrain)
            const chartData = {
              datasets: [],
              labels: [],
              nbrPassages: 0,
            }
            chartData.nbrPassages = item.PerturbationsSam005.Nombre
            // let pourcentageCapteur

            Object.entries(
              item.PerturbationsSam005.PerturbationsPourcentage
            ).forEach(([label, value], index) => {
              chartData?.labels.push(label)
              chartData.datasets.push(value)
            })
            myChartData.push(chartData)
            // nbrPassagesList.push(nbrPassages)

            // chartData.set(mrKey, chartData);
          })
        } else {
          chartTitles.push('NOK')
          const chartData = {
            datasets: [],
            labels: [],
            nbrPassages: 0,
          }
          chartData.nbrPassages = infos.PerturbationsSam005.Nombre
          // let pourcentageCapteur

          Object.entries(
            infos.PerturbationsSam005.PerturbationsPourcentage
          ).forEach(([label, value], index) => {
            chartData?.labels.push(label)
            chartData.datasets.push(value)
          })
          myChartData.push(chartData)
          // nbrPassagesList.push(nbrPassages)

          // chartData.set(mrKey, chartData);
        }

        setmyChartDataSamNOK(myChartData)
        setMyChartDataSamNOKIndex(chartTitles)
      }
    }
  }

  useEffect(() => {
    loadTypeMr()
    loadCE()
  }, [])
   useEffect(() => {
    if (!token) {
      history.push('/')
    }
  }, [token, history])
  useEffect(() => {
    loadInfos()
  }, [site, startDate, endDate, MR, result50592, resultSAM, BE, BL])
  useEffect(() => {
    createChart()
  }, [infos])

  return (
    <>
      <div className="parent historique">
        <div className="filtre historique">
          <RangeDatePicker onChange={handleDateChange} />
          <Site className="site" onChange={handleSiteChange} />
        </div>
        <div
          className="statistique"
          style={{ position: 'relative', width: '100%' }}
        >
          <p>
            Journal - Statistique - Rapport
            <div
              style={{
                display: 'inline-block',
                position: 'absolute',
                right: '0px',
                margin: 'auto',
                top: '10px',
              }}
            >
              <Button variant="primary" onClick={handleDownloadPdf}>
                <FileDownloadIcon style={{ marginTop: '5px' }} />
                Exporter
              </Button>

              <Button variant="primary" onClick={loadInfos}>
                <RefreshIcon /> Rafaîchir
              </Button>
            </div>
          </p>
          <div id="pdf-content">
            <div>
              <div className="row">
                <div
                  className="col-left"
                  style={!showToolbar ? { marginTop: '-20px' } : {}}
                >
                  {showToolbar && (
                    <ul style={{ marginLeft: '30px', marginBottom: '50px' }}>
                      <li>
                        {' '}
                        {startDate} - {endDate}
                      </li>
                      <br />
                      <li> Site : {site} </li>
                      <br />
                      <li> Type Mr : {MR.join(',')} </li>
                      <br />
                      <li> Résultat 50592 : {result50592} </li>
                      <br />
                      <li> Résultat SAM S005 : {resultSAM}</li> <br />
                      <li>
                        {' '}
                        Résultats 50592 – Bande étroite - autre CE : {BL}
                      </li>{' '}
                      <br />
                      <li> Option D39-D50 : {BE}</li> <br />
                    </ul>
                  )}
                </div>

                <div className="col-right">
                  {showToolbar && (
                    <img
                      src={logo}
                      alt="logo sncf"
                      style={{ height: '40%', width: '70%' }}
                    />
                  )}
                </div>
              </div>

              {!showToolbar && (
                <>
                  <ToolbarRapport />
                  <div style={{ padding: '60px', marginTop: '-15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        border: '2px solid transparent',
                        boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.3)',
                        transition: 'box-shadow 0.3s',
                        padding: '10px',
                        marginTop: '-15px',
                        backgroundColor: '#0088ce',
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '-4px',
                          textAlign: 'center',
                        }}
                      >
                        <InputLabel
                          style={{
                            fontWeight: 'bold',
                            padding: '5px',
                            marginBottom: '-5px',
                          }}
                        >
                          Type Matériel Roulant
                        </InputLabel>

                        {/* <select
                         style={{ padding: '5px' }}
                         multiple
                         onChange={handleMRChange}
                       >
                         {typemr.map((option) => (
                           <option key={option} value={option}>
                             {option}
                           </option>
                         ))}
                       </select> */}

                        <div style={{ width: '80%' }}>
                          <Select
                            defaultValue={[]}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            onChange={(options) => {
                              handleMRChange(options.map((opt) => opt.value))
                            }}
                            //  onChange={handleMRChange}

                            components={{
                              Option: InputOption,
                            }}
                            options={typemr}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <InputLabel style={{ fontWeight: 'bold' }}>
                          Résultat 50592
                        </InputLabel>

                        {/* {MR.length===0&& <Resultats
                  onChange={handleResult50592ChangeSingle}
                  options={option50592Single}
                  disabled={disabled50}
                />
      } */}

                        {
                          <div style={{ width: '80%' }}>
                            <Select
                              defaultValue={[]}
                              isMulti
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              onChange={(options) => {
                                handleResult50592Change(
                                  options.map((opt) => opt.value)
                                )
                              }}
                              //  onChange={handleMRChange}

                              components={{
                                Option: InputOption,
                              }}
                              options={option50592}
                            />
                          </div>
                        }

                        {/* <Resultats
                         onChange={handleResult50592Change}
                         options={option50592}
                         disabled={disabled50}
                         style={{ width: '100%' }}
                       /> */}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <InputLabel style={{ fontWeight: 'bold' }}>
                          Résultat SAM S005
                        </InputLabel>

                        {/* {MR.length===0&& <Resultats
                  onChange={handleResultSAMChangeSingle}
                  options={optionSAMSingle}
                  disabled={disabled50}
                />
      } */}
                        {
                          <div style={{ width: '80%' }}>
                            <Select
                              defaultValue={[]}
                              isMulti
                              closeMenuOnSelect={false}
                              hideSelectedOptions={false}
                              onChange={(options) => {
                                handleResultSAMChange(
                                  options.map((opt) => opt.value)
                                )
                              }}
                              //  onChange={handleMRChange}

                              components={{
                                Option: InputOption,
                              }}
                              options={optionSAM}
                            />
                          </div>
                        }
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <InputLabel style={{ fontWeight: 'bold' }}>
                          Option D39-D50
                        </InputLabel>
                        <Resultats
                          onChange={handleBEChange}
                          options={optionBE}
                          disabled={disabled50}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <InputLabel style={{ fontWeight: 'bold' }}>
                          Bande étroite - autre CE
                        </InputLabel>
                        <Resultats
                          onChange={handleBLChange}
                          options={optionBE_CE}
                          disabled={disabled50}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {myChartTotal && (
              <Table
                style={{
                  width: 'auto',
                  maxWidth: '90%',
                  position: 'relative',
                  marginLeft: '5%',
                  transformStyle: 'preserve-3d',
                  borderSpacing: '0',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                  fontWeight: 'bold',
                  color: 'black',
                  margin: '0 auto', // Ajout de cette ligne pour centrer le tableau horizontalement
                }}
              >
                <TableHead style={{ fontWeight: 'bold', color: 'black' }}>
                  <TableRow>
                    <TableCell
                      style={{ fontWeight: 'bold', color: 'black' }}
                      colSpan={2}
                    >
                      Total Sam S005
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: 'bold', color: 'black' }}
                      colSpan={2}
                    >
                      Total 50592
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ top: '40%' }}>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        textAlign: 'center',
                      }}
                      colSpan={2}
                    >
                      {myChartTotal.totalSam}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        textAlign: 'center',
                      }}
                      colSpan={2}
                    >
                      {myChartTotal.total50592}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}

            {chargement ? (
              <Loading />
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
                >
                  {myChartData50592NOK?.length > 0 &&
                    myChartData50592NOK.map((nokData, idx) => {
                      return (
                        <div
                          style={{
                            flexBasis: '700px',
                            padding: '10px',
                            width: '40%',
                            border: '10px bold red',
                          }}
                        >
                          {/* <h1>{MR[idx]}</h1> */}
                          <div
                            style={{
                              width: '100%',
                              height: 'auto',
                              transform: 'scale(0.868)',
                             // marginTop: '-15%',
                            }}
                          >
                            <StatsChart
                              data={nokData}
                              chartType="bar"
                              title={myChartData50592NOKIndex[idx] + '(50592)'}
                            />
                          </div>
                        </div>
                      )
                    })}

                  {myChartDataSamNOK?.length > 0 &&
                    myChartDataSamNOK.map((nokData, idx) => {
                      return (
                        <div
                          style={{
                            flexBasis: '40%',
                            padding: '30px',
                            width: '40%',
                          }}
                        >
                          {/* <h1>{MR[idx]}</h1> */}
                          <div
                            style={{
                              width: '500px',
                              height: 'auto',
                              //transform: 'scale(0.85)',
                            }}
                          >
                            <StatsChart
                              data={nokData}
                              chartType="bar"
                              title={myChartDataSamNOKIndex[idx] + '(Sam S005)'}
                            />
                          </div>
                        </div>
                      )
                    })}

                  {myChartData50592OK !== null && (
                    <div
                      style={{
                        flexBasis: '40%',
                        padding: '10px',
                        width: '40%',
                      }}
                    >
                      {/* <h1>{MR[idx]}</h1> */}
                      <div
                        style={{
                          width: '800px',
                          height: '100%',
                          paddingTop: '110px',
                        }}
                      >
                        <StatsChart
                          data={myChartData50592OK}
                          chartType="bar"
                          title="Le poucentage de chaque type matériel roulant (50592)"
                        />
                      </div>
                    </div>
                  )}

                  {myChartDataSamOK !== null && (
                    <div
                      style={{
                        flexBasis: '40%',
                        padding: '10px',
                        width: '40%',
                      }}
                    >
                      {/* <h1>{MR[idx]}</h1> */}
                      <div
                        style={{
                          width: '450px',
                          height: '100%',
                          paddingTop: '110px',
                        }}
                      >
                        <StatsChart
                          data={myChartDataSamOK}
                          chartType="bar"
                          title="Le poucentage de chaque type matériel roulant (Sam)"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="tableau-stat"
                  id="page2el"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    perspective: '1000px',
                    paddingBottom: '50px',
                  }}
                >
                  {myChartDataSamOK !== null &&
                    (resultSAM === 'OK' || resultSAM === 'uniquement sam') &&
                    myChartDataSamOK.datasets !== null &&
                    myChartDataSamOK.datasets.length > 0 && (
                      <Table
                        style={{
                          width: 'auto',
                          maxWidth: '90%',
                          position: 'relative',
                          marginLeft: '5%',
                          transformStyle: 'preserve-3d',
                          borderSpacing: '0',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colSpan={3}
                            >
                              SAM OK
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Type de train
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              {' '}
                              Nb passage
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Pourcentage de sam S005 Ok
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {myChartDataSamOK!==null&&  JSON.stringify(myChartDataSamOK)} */}
                          {myChartDataSamOK !== null &&
                            myChartDataSamOK.datasets.map((dt, idx) => {
                              return (
                                <TableRow>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {myChartDataSamOK?.labels[idx]}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {myChartDataSamOK?.nbrPassages[idx]}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {dt}%
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    )}

                  {myChartData50592OK !== null &&
                    (result50592 === 'OK' ||
                      result50592 === 'uniquement 50592') &&
                    myChartData50592OK.labels !== null &&
                    myChartData50592OK.labels?.length > 0 && (
                      <Table
                        style={{
                          marginTop: '2%',
                          marginLeft: '5%',
                          marginBottom: '5%',
                          width: 'auto',
                          maxWidth: '90%',
                          position: 'relative',
                          transformStyle: 'preserve-3d',
                          borderSpacing: '0',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colSpan={3}
                            >
                              50592 OK
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Type de train
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              {' '}
                              Nb passage
                            </TableCell>

                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Pourcentage 50592 Ok
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {myChartData50592OK !== null &&
                            myChartData50592OK.datasets.map((dt, idx) => {
                              return (
                                <TableRow>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {myChartData50592OK?.labels[idx]}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {myChartData50592OK.nbrPassages[idx]}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {dt}%
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    )}

                  {(resultSAM === 'NOK' || resultSAM === 'uniquement sam') &&
                    myChartDataSamNOK !== null &&
                    myChartDataSamNOK?.length && (
                      <Table
                        style={{
                          width: 'auto',
                          maxWidth: '90%',
                          position: 'relative',
                          marginLeft: '5%',
                          transformStyle: 'preserve-3d',
                          borderSpacing: '0',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        <TableHead
                          style={{ fontWeight: 'bold', color: 'black' }}
                        >
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colSpan={2}
                            >
                              Syrenne
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colspan={8}
                            >
                              Capteurs
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Type de train
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              {' '}
                              Nb passage
                            </TableCell>
                            {myChartDataSamNOK?.length > 0 &&
                              myChartDataSamNOK[0]?.labels?.map(
                                (capteur, index) => (
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {capteur.replace('_', ' ')}
                                  </TableCell>
                                )
                              )}
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ marginBottom: '900px' }}>
                          {myChartDataSamNOKIndex !== null &&
                            myChartDataSamNOKIndex?.length > 0 &&
                            myChartDataSamNOKIndex.map((el, index) => {
                              return (
                                <TableRow>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {el}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: 'black',
                                    }}
                                  >
                                    {myChartDataSamNOK[index]?.nbrPassages}
                                  </TableCell>

                                  {myChartDataSamNOK[index]?.datasets.map(
                                    (el2, index2) => {
                                      return (
                                        <>
                                          <TableCell
                                            style={{
                                              fontWeight: 'bold',
                                              color: 'black',
                                            }}
                                          >
                                            {el2 + '%'}
                                          </TableCell>
                                        </>
                                      )
                                    }
                                  )}
                                </TableRow>
                              )
                            })}
                        </TableBody>
                      </Table>
                    )}

                  {(result50592 === 'NOK' ||
                    result50592 === 'uniquement 50592') &&
                    myChartData50592NOK !== null &&
                    myChartData50592NOK?.length > 0 && (
                      <Table
                        style={{
                          marginTop: '2%',
                          marginLeft: '5%',
                          marginBottom: '5%',
                          width: 'auto',
                          maxWidth: '90%',
                          position: 'relative',
                          transformStyle: 'preserve-3d',
                          borderSpacing: '0',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        <TableHead
                          style={{ fontWeight: 'bold', color: 'black' }}
                        >
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              rowSpan={4}
                              colSpan={2}
                            >
                              Syrenne
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colspan={12}
                            >
                              50592
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colspan={12}
                            >
                              Pourcentages de dépassements par type de compteur
                              d'essieux et par type de train
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                              colspan={12}
                            >
                              Amplitude de dépassement &gt; 0 dB de la limite
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colspan={12}>BF</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              Type de train
                            </TableCell>
                            <TableCell
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              {' '}
                              Nb passage
                              {/* {myChartData50592NOK?.length > 0 && JSON.stringify(myChartData50592NOK[0]?.labels)} */}
                            </TableCell>
                            {myChartData50592NOK?.length > 0 &&
                              myChartData50592NOK[0]?.labels?.map(
                                (capteur, index) => (
                                  <TableCell
                                    style={{
                                      fontWeight: 'bold',
                                      color: '#5c5454',
                                    }}
                                  >
                                    {capteur.replace('_', ' ')}
                                  </TableCell>
                                )
                              )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {myChartData50592NOKIndex.map((el, index) => {
                            return (
                              <TableRow>
                                <TableCell
                                  style={{ fontWeight: 'bold', color: 'black' }}
                                >
                                  {el}
                                </TableCell>
                                <TableCell
                                  style={{ fontWeight: 'bold', color: 'black' }}
                                >
                                  {myChartData50592NOK[index]?.nbrPassages}
                                </TableCell>

                                {myChartData50592NOK[index].datasets.map(
                                  (el2, index2) => {
                                    return (
                                      <>
                                        <TableCell
                                          style={{
                                            fontWeight: 'bold',
                                            color: 'black',
                                          }}
                                        >
                                          {el2}%
                                        </TableCell>
                                      </>
                                    )
                                  }
                                )}
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default Statistique

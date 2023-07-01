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

function Statistique() {
  const [showToolbar, setShowToolbar] = useState(false)

  const [site, setSelectedSite] = useState('Chevilly')
  const [myChartData50592NOK, setmyChartData50592NOK] = useState([])
  const [myChartData50592NOKIndex, setMyChartData50592NOKIndex] = useState([])
  const [myChartData50592OK, setmyChartData50592OK] = useState(null)
  const [myChartDataSamNOK, setmyChartDataSamNOK] = useState([])
  const [myChartDataSamNOKIndex, setMyChartDataSamNOKIndex] = useState([])
  const [myChartDataSamOK, setmyChartDataSamOK] = useState(null)
  const [showOkChart, setshowOkChart] = useState(false)
  const [infos, setInfos] = useState([])
  const [startDate, setStartDate] = useState('2023-03-28')
  const [endDate, setEndDate] = useState('2023-06-27')
  const [BE, setBE] = useState('')
  const [BL, setBL] = useState('')
  const [convertedData, setConvertedData] = useState(null);

  const [MR, setMR] = useState([])
  const [resultSAM, setResultSAM] = useState('')
  const [result50592, setResult50592] = useState('')
  const [typemr, setTypemr] = useState([])
  const [disabled50, setDisabled50] = useState(false)
  const [disabledSam, setDisabledSam] = useState(false)
  const [optionBE_CE, setOptionBE_CE] = useState([])
  const optionSAM = ['', 'NOK', 'OK', 'uniquement sam']
  const option50592 = ['', 'NOK', 'OK', 'uniquement 50592']
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const optionBE = ['', 'D39', 'D39-bis', 'D50_bis', 'D50']
  let capteurs = null
  let pourcentage50592 = []
  let nbrPassage50592 = []
  let nbrPassageSAM = []
  let evs = null
  let pourcentageSAM =  []


  const handleDateChange = (ranges) => {
    setStartDate(dayjs(ranges.selection.startDate).format('YYYY-MM-DD'))

    setEndDate(dayjs(ranges.selection.endDate).format('YYYY-MM-DD'))
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
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value)
    selectedValues.sort();
    setMR(selectedValues)
  }




  const handleResultSAMChange = (newRes) => {
    if (newRes === 'uniquement sam') {
      setResult50592('')
      // handleResult50592Change(result50592)
      setDisabled50(true)
    } else {
      setDisabled50(false)
    }
    setResultSAM(newRes)
  }

  const handleResult50592Change = (newRes) => {
    if (newRes === 'uniquement 50592') {
      setResultSAM('')
      //handleResult50592Change(resultSAM)
      setDisabledSam(true)
    } else {
      setDisabledSam(false)
    }
    setResult50592(newRes)
  }
 
  const loadInfos = async () => {
    setIsLoading(true)
    try {
      setmyChartData50592NOK([])
      setmyChartData50592OK(null)
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenstatistique?site=${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
    
      setInfos(resultat?.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  //Récupération des types mr
  const loadTypeMr = async () => {
    try {
      const resultat = await axios.get(`${config.API_URL}/typemr`)

      setTypemr(resultat?.data)
    } catch (error) {
      console.error(error)
    }
  }
  //Récupération des CE
  const loadCE = async () => {
    try {
      const resultat = await axios.get(`${config.API_URL}/capteurs`)
      setOptionBE_CE(resultat?.data)
    } catch (error) {}
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
     
    //  convertedData = {
    //   labels: data.labels,
    //   datasets: data.datasets.map((dataset) => ({
    //     label: dataset.label,
    //     data: dataset.data,
    //     backgroundColor: dataset.backgroundColor,
    //   })),
    // };
 if(infos){
  // `${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}
      //OKChart50592

if(result50592 ==='uniquement 50592' || (result50592==='OK'&& resultSAM !=='uniquement sam' )){


  const chartData = {
    datasets: [],
    labels: []
  };
  infos?.forEach(item => {
    const mrKey = item["mr (50592 ok)"];
    const pourcentageMr = item["le poucentage de chaque type mr (50592 ok)"];
  
    if (mrKey && pourcentageMr) {
      
  
      chartData.labels.push(mrKey);
      chartData.datasets.push(pourcentageMr);

      // chartData.set(mrKey, chartData);
    }
  });
  

setmyChartData50592OK(chartData)
}
    //NOKChart50592
if( result50592 ==='uniquement 50592' || (result50592==='NOK'&& resultSAM !=='uniquement sam' ))
{


  const myChartData=[] 
  const chartTitles=[] 

  infos?.forEach(item => {
    const mrKey = item["mr(50592 nok)"];
    const pourcentageCapteur = item["le pourcentage de chaque capteur"];
  
    if (mrKey && pourcentageCapteur) {
      const chartData = {
        datasets: [],
        labels: []
      };
  
      Object.entries(pourcentageCapteur).forEach(([label, value]) => {
        chartData.labels.push(label);
        chartData.datasets.push(value);
      });
  
      // chartData.set(mrKey, chartData);
      myChartData.push(chartData);
      chartTitles.push(mrKey)
    }
  });
  

setmyChartData50592NOK(myChartData)
setMyChartData50592NOKIndex(chartTitles)
}




//SAM
if(result50592 ==='uniquement sam' || (resultSAM==='OK'&& result50592 !=='uniquement 50592' )){


  const chartData = {
    datasets: [],
    labels: []
  };
  infos?.forEach(item => {
    const mrKey = item["mr(sam ok)"];
    const pourcentageMr = item["pourcentage de chaque type mr sam ok"];
  
    if (mrKey && pourcentageMr) {
      
  
      chartData.labels.push(mrKey);
      chartData.datasets.push(pourcentageMr);

      // chartData.set(mrKey, chartData);
    }
  });
  

setmyChartDataSamOK(chartData)
}
    //NOKChartSam
if( resultSAM ==='uniquement sam' || (resultSAM==='NOK'&& result50592 !=='uniquement 50592' ))
{


  const myChartData=[] 
  const chartTitles=[] 

  infos?.forEach(item => {
    const mrKey = item["mr(sam nok)"];
    const pourcentageCapteur = item["index occultation et le total de fois de perturbation dans tous les trains"];
  
    if (mrKey && pourcentageCapteur) {
      const chartData = {
        datasets: [],
        labels: []
      };
  
      Object.entries(pourcentageCapteur).forEach(([label, value]) => {
        chartData.labels.push("EV"+label);
        chartData.datasets.push(value);
      });
  
      // chartData.set(mrKey, chartData);
      myChartData.push(chartData);
      chartTitles.push(mrKey)
    }
  });
  

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
        <div className="statistique" style={{ position: 'relative',width:'100%' }}>
          <p>
            Journal
            <div
              style={{
                display: 'inline-block',
                position: 'absolute',
                right: '0px',
                margin: 'auto',
                top: '10px' 
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
                <div className="col-left" style={!showToolbar ? { marginTop: '-20px' } : {}}>
                  {showToolbar && (
                    <ul style={{marginLeft:'30px',marginBottom:'50px'}}>
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
                  {showToolbar && <img src={logo} alt="logo sncf" style={{height:'40%',width:'70%'}} />}
                </div>
              </div>

              {!showToolbar && (
                <>
                  <ToolbarRapport  />
                  <div style={{padding:'60px',marginTop:'-15px'}}>
  <div     style={{
    display: 'flex',
    width: '100%',
    border: '2px solid transparent',
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.3)',
    transition: 'box-shadow 0.3s',padding:'10px',marginTop:'-15px'
  }}>
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputLabel style={{ fontWeight: 'bold' }}>Type Mr</InputLabel>
      {/* <MultiSelect onChange={handleMRChange}  options={typemr} style={{ width: '100%',border:'none' }} /> */}
      <select multiple onChange={handleMRChange}>
      {/* <select multiple value={selectedOptions} onChange={handleSelectChange}> */}
        {typemr.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputLabel style={{ fontWeight: 'bold' }}>Résultat 50592</InputLabel>
    
      <div>
     
      
    </div>
      <Resultats
        onChange={handleResult50592Change}
        options={option50592}
        disabled={disabled50}
        style={{ width: '100%' }}
      />
    </div>
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputLabel style={{ fontWeight: 'bold' }}>Résultat SAM S005</InputLabel>
      <div style={{ width: '100%' }}>
        <Resultats
          onChange={handleResultSAMChange}
          options={optionSAM}
          disabled={disabledSam}
          style={{ width: '100%' }}
        />
      </div>
    </div>
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputLabel style={{ fontWeight: 'bold' }}>Option D39-D50</InputLabel>
      <Resultats
        onChange={handleBEChange}
        options={optionBE}
        disabled={disabled50}
        style={{ width: '100%' }}
      />
    </div>
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <InputLabel style={{ fontWeight: 'bold' }}>Bande étroite - autre CE</InputLabel>
      <Resultats
        onChange={handleBLChange}
        options={optionBE_CE}
        disabled={disabled50}
        style={{  width: '100%' }}
      />
    </div>
  </div>
</div>

                </>
              )}
            </div>
           
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {myChartData50592NOK?.length > 0 &&
    myChartData50592NOK.map((nokData, idx) => {
      return (
        <div style={{ flexBasis: '50%', padding: '10px', width: '50%' }}>
          {/* <h1>{MR[idx]}</h1> */}
          <div style={{ width: '100%', height: 'auto', transform: 'scale(0.85)',marginTop : '-15%'   }}>
            <StatsChart data={nokData} chartType="pie" title={myChartData50592NOKIndex[idx]} />
          </div>
        </div>
      );
    })}
  {myChartData50592OK!==null &&   <div style={{ flexBasis: '50%', padding: '10px', width: '50%' }}>
          {/* <h1>{MR[idx]}</h1> */}
          <div style={{ width: '100%', height: '100%', marginTop : '8%'   }}>
            <StatsChart data={myChartData50592OK} chartType="bar" title="Le poucentage de chaque type mr" />
          </div>
        </div>
        }



</div>


{/* SAM */}
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
  {myChartDataSamNOK?.length > 0 &&
    myChartDataSamNOK.map((nokData, idx) => {
      return (
        <div style={{ flexBasis: '50%', padding: '10px', width: '50%' }}>
          {/* <h1>{MR[idx]}</h1> */}
          <div style={{ width: '100%', height: 'auto', transform: 'scale(0.85)',marginTop : '-15%'   }}>
            <StatsChart data={nokData} chartType="pie" title={myChartDataSamNOKIndex[idx]} />
          </div>
        </div>
      );
    })}
  {myChartDataSamOK!==null &&   <div style={{ flexBasis: '50%', padding: '10px', width: '50%' }}>
          {/* <h1>{MR[idx]}</h1> */}
          <div style={{ width: '100%', height: '100%', marginTop : '5%'   }}>
            <StatsChart data={myChartDataSamOK} chartType="bar" title="Le poucentage de chaque type mr" />
          </div>
        </div>
        }



</div>


            {/* <div className="tableau-stat" id="page2el">
              {resultSAM !== '' && pourcentageSAM !== null && (
                <Table
                  style={{
                    width: 'auto',
                    maxWidth: '40%',
                    position: 'relative',
                    margin: '20px auto',
                  }}
                >
                  {resultSAM === 'OK' ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>SAM OK</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type de train</TableCell>
                          <TableCell> Nb passage</TableCell>

                          <TableCell>Pourcentage de sam s005 Ok</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableCell>{MR}</TableCell>
                        <TableCell>{nbrPassageSAM}</TableCell>
                        <TableCell>{pourcentageSAM}</TableCell>
                      </TableBody>
                    </>
                  ) : (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>Syrenne</TableCell>
                          <TableCell colspan={8}>Capteurs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type de train</TableCell>
                          <TableCell> Nb passage</TableCell>
                          {evs?.map((ev, index) => (
                            <TableCell>{Number(ev) + 1}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableCell>{MR}</TableCell>
                        <TableCell>{nbrPassageSAM}</TableCell>
                        {pourcentageSAM?.map((pourcentage, index) => (
                          <TableCell>{pourcentage}</TableCell>
                        ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              )}
              {result50592 !== '' && pourcentage50592 !== null && (
                <Table
                  style={{
                    width: '50%',
                    position: 'relative',
                    margin: '20px auto',
                  }}
                >
                  {result50592 === 'OK' ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={3}>50592 OK</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type de train</TableCell>
                          <TableCell> Nb passage</TableCell>

                          <TableCell>Pourcentage 50592 Ok</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                     {
                      MR.map((el,index)=>{
                        return (
                          <TableRow>
                          <TableCell>{el}</TableCell>
                            <TableCell>{nbrPassage50592[index]}</TableCell>
                            <TableCell>{pourcentage50592[index]}</TableCell>
                        </TableRow>
                        )

                      })

                     }

                     
                      </TableBody>
                    </>
                  ) : (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell rowSpan={4} colSpan={2}>
                            Syrenne
                          </TableCell>
                          <TableCell colspan={12}>50238</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colspan={12}>
                            Pourcentages de dépassements par type de compteur
                            d'essieux et par type de train
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colspan={12}>
                            Amplitude de dépassement &gt; 0 dB de la limite
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colspan={12}>BF</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Type de train</TableCell>
                          <TableCell> Nb passage</TableCell>
                          {capteurs?.map((capteur, index) => (
                            <TableCell>{capteur.replace('_', ' ')}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {
                      MR.map((el,index)=>{
                        return (
                          <TableRow>
                          <TableCell>{el}</TableCell>
                            <TableCell>{nbrPassage50592[index]}</TableCell>
                            <TableCell>{pourcentage50592[index]}</TableCell>
                        </TableRow>
                        )

                      })

                     }
                     

                        
                        {pourcentage50592?.map((pourcentage, index) => (
                          <TableCell>{pourcentage}</TableCell>
                        ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              )}
            </div> */}
          </div>
        </div>
      </div>
      
    </>
  )
}
export default Statistique

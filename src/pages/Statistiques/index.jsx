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

function Statistique() {
  const [showToolbar, setShowToolbar] = useState(false)

  const [site, setSelectedSite] = useState('')
  const [infos, setInfos] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [BE, setBE] = useState('')
  const [BL, setBL] = useState('')
  const [MR, setMR] = useState('')
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
  let pourcentage50592 = null
  let nbrPassage50592 = null
  let nbrPassageSAM = null
  let evs = null
  let pourcentageSAM = null

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
  const handleMRChange = (newRes) => {
    setMR(newRes)
    console.log(MR)
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
    console.log(resultSAM)
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
  const tableau = () => {
    if (result50592 === 'NOK' || result50592 === 'uniquement 50592') {
      for (let i = 0; i < infos.length; i++) {
        if (BE) {
          console.log('juuuuuuste', BE)
        }
        if (infos[i]['le poucentage de chaque capteur']) {
          capteurs = Object.keys(infos[i]['le poucentage de chaque capteur'])
          pourcentage50592 = Object.values(
            infos[i]['le poucentage de chaque capteur']
          )
        }
        if (infos[i]['nombre de train passé(50592 nok)']) {
          nbrPassage50592 = infos[i]['nombre de train passé(50592 nok)']
        }
      }
    }
    if (result50592 === 'OK') {
      for (let i = 0; i < infos.length; i++) {
        if (infos[i]['nombre de train passé(50592 ok )']) {
          nbrPassage50592 = infos[i]['nombre de train passé(50592 ok )']
        }
        if (infos[i]['le poucentage de chaque type mr (50592 ok)']) {
          pourcentage50592 =
            infos[i]['le poucentage de chaque type mr (50592 ok)']
        }
      }
    }
    if (resultSAM === 'NOK' || resultSAM === 'uniquement sam') {
      for (let i = 0; i < infos.length; i++) {
        if (infos[i]["pourcentage de perturbation par index d'un type mr"]) {
          evs = Object.keys(
            infos[i]["pourcentage de perturbation par index d'un type mr"]
          )
          pourcentageSAM = Object.values(
            infos[i]["pourcentage de perturbation par index d'un type mr"]
          )
        }
        if (infos[i]['nombre de train passé (sam nok)']) {
          nbrPassageSAM = infos[i]['nombre de train passé (sam nok)']
        }
      }
    }
    if (resultSAM === 'OK') {
      for (let i = 0; i < infos.length; i++) {
        if (infos[i]['nombre de train passé (sam ok)']) {
          nbrPassageSAM = infos[i]['nombre de train passé (sam ok)']
        }
        if (infos[i]['pourcentage de chaque type mr sam ok']) {
          pourcentageSAM =
            infos[i]['pourcentage de chaque type mr sam ok'] + '%'
        }
      }
    }
  }
  tableau()
  const loadInfos = async () => {
    setIsLoading(true)
    try {
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenstatistique?site=${site}&typemr=${MR}&statutsam=${resultSAM}&statut50592=${result50592}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
      )
      setInfos(resultat.data)
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

      setTypemr(resultat.data)
    } catch (error) {
      console.error(error)
    }
  }
  //Récupération des CE
  const loadCE = async () => {
    try {
      const resultat = await axios.get(`${config.API_URL}/capteurs`)
      setOptionBE_CE(resultat.data)
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
    const ctx50592 = document.getElementById('chart-50592').getContext('2d')
    const ctxSAM = document.getElementById('chart-sam').getContext('2d')
    const canvas50592 = Chart.getChart(ctx50592)
    const canvasSAM = Chart.getChart(ctxSAM)
    const dataSAM = {
      labels: [], // Les étiquettes pour l'axe X
      datasets: [
        {
          label: `% trains SAM par type MR`,
          data: [], // Le pourcentage de trains SAM par type MR
          backgroundColor: '#00ff00',
        },
      ],
    }
    const data50592 = {
      labels: [], // Les étiquettes pour l'axe X
      datasets: [
        {
          label: `% trains 50592 par type MR`,
          data: [], // Le pourcentage de trains SAM par type MR
          backgroundColor: '#00ff00',
        },
      ],
    }
    const data50592OK = {
      labels: [], // Les étiquettes pour l'axe X
      datasets: [
        {
          label: `% trains 50592 par type MR`,
          data: [], // Le pourcentage de trains SAM par type MR
          backgroundColor: '#00ff00',
        },
      ],
    }
    const dataSAMNOK = {
      labels: [], // Les étiquettes pour l'axe X
      datasets: [
        {
          label: `% trains SAM par EV`,
          data: [], // Le pourcentage de trains SAM par type MR
          backgroundColor: [], // Tableau vide pour les couleurs
        },
      ],
    }
    //recuperation type mr
    const optionsSAMOK = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '% trains SAM par type MR',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Type MR',
          },
        },
      },
    }
    const optionsSAMNOK = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: '% trains SAM par EV',
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    }
    const options50592 = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '% trains SAM par type MR',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Capteurs',
          },
        },
      },
    }
    if (canvas50592) {
      canvas50592.destroy()
    }
    if (canvasSAM) {
      canvasSAM.destroy()
    }

    if (infos.length === 0) {
      return
    } else {
      for (let i = 0; i < infos.length; i++) {
        const ctxSAM = document.getElementById('chart-sam').getContext('2d')

        if (resultSAM !== 'uniquement sam' && result50592) {
          let trains50592
          if (result50592 === 'OK') {
            if (infos[i]['le poucentage de chaque type mr (50592 ok)']) {
              data50592.labels.push(infos[i]['mr (50592 ok)'])
              data50592.datasets[0].data.push(pourcentage50592)
              new Chart(ctx50592, {
                type: 'bar',
                data: data50592,
                options: options50592,
                width: '600px',
              })
            }
          }
          if (result50592 === 'NOK') {
            if (infos[i]['le poucentage de chaque capteur']) {
              trains50592 = infos[i]['le poucentage de chaque capteur']

              for (const [label, value] of Object.entries(trains50592)) {
                if (BE || BL) {
                  if (BE === label || BL === label) {
                    data50592.labels.push(label)
                    data50592.datasets[0].data.push(value)
                  }
                } else {
                  data50592.labels.push(label)
                  data50592.datasets[0].data.push(value)
                }
              }
              new Chart(ctx50592, {
                type: 'bar',
                data: data50592,
                options: options50592,
                width: '600px',
              })
            }
          }

          if (result50592 === 'uniquement 50592') {
            trains50592 = infos[i]['le poucentage de chaque capteur']
            for (const [label, value] of Object.entries(trains50592)) {
              data50592.labels.push(label)
              data50592.datasets[0].data.push(value)
            }
            new Chart(ctx50592, {
              type: 'bar',
              data: data50592,
              options: options50592,
              width: '600px',
            })
            data50592OK.labels.push(infos[i]['mr (50592 ok)'])
            data50592OK.datasets[0].data.push(
              infos[i]['le poucentage de chaque type mr (50592 ok)']
            )

            const ctxSAM = document.getElementById('chart-sam').getContext('2d')
            new Chart(ctxSAM, {
              type: 'bar',
              data: data50592OK,
              options: optionsSAMOK,
              responsive: true,
              maintainAspectRatio: false,
            })
          }
        }
        if (result50592 !== 'uniquement 50592' && resultSAM) {
          if (resultSAM === 'OK') {
            const trainsSAMOK = infos[i]['mr(sam ok)']
            dataSAM.datasets[0].data.push(
              infos[i]['pourcentage de chaque type mr sam ok']
            )
            dataSAM.labels.push(trainsSAMOK)

            new Chart(ctxSAM, {
              type: 'bar',
              data: dataSAM,
              options: optionsSAMOK,
              responsive: true,
              maintainAspectRatio: false,
            })
          }
          if (resultSAM === 'NOK') {
            if (
              infos[i]["pourcentage de perturbation par index d'un type mr"]
            ) {
              console.log('SAMNOK ')
              const trainsSAMNOK =
                infos[i]["pourcentage de perturbation par index d'un type mr"]
              const colors = [
                '#0088ce',
                '#009aa6',
                '#e05206',
                '#6e1e78',
                '#a1006b',
                '#d2e100',
                '#d52b1e',
                '#675c53',
              ] // Liste des couleurs à utiliser
              let index = 0
              let j = 0 // Variable pour suivre l'index de couleur actuel
              for (const [label, value] of Object.entries(trainsSAMNOK)) {
                dataSAMNOK.labels.push(`EV${j + 1}`)
                dataSAMNOK.datasets[0].data.push(value)
                dataSAMNOK.datasets[0].backgroundColor.push(colors[index]) // Attribuer une couleur à la donnée
                index = (index + 1) % colors.length // Passer à la couleur suivante
                j += 1
              }
              new Chart(ctxSAM, {
                type: 'pie',
                data: dataSAMNOK,
                options: optionsSAMNOK,
                responsive: true,
                maintainAspectRatio: false,
              })
              console.log(infos.length)
            }
          }
          if (resultSAM === 'uniquement sam') {
            if (
              infos[i]["pourcentage de perturbation par index d'un type mr"] ||
              infos[i]['pourcentage de chaque type mr sam ok']
            ) {
              if (
                infos[i]["pourcentage de perturbation par index d'un type mr"]
              ) {
                const trainsSAMNOK =
                  infos[i]["pourcentage de perturbation par index d'un type mr"]
                const colors = [
                  '#0088ce',
                  '#009aa6',
                  '#e05206',
                  '#6e1e78',
                  '#a1006b',
                  '#d2e100',
                  '#d52b1e',
                  '#675c53',
                ] // Liste des couleurs à utiliser
                let index = 0
                let j = 0 // Variable pour suivre l'index de couleur actuel

                for (const [label, value] of Object.entries(trainsSAMNOK)) {
                  dataSAMNOK.labels.push(`EV${j + 1}`)
                  dataSAMNOK.datasets[0].data.push(value)
                  dataSAMNOK.datasets[0].backgroundColor.push(colors[index]) // Attribuer une couleur à la donnée
                  index = (index + 1) % colors.length // Passer à la couleur suivante
                  j += 1
                }

                new Chart(ctxSAM, {
                  type: 'pie',
                  data: dataSAMNOK,
                  options: optionsSAMNOK,
                  responsive: true,
                  maintainAspectRatio: false,
                })
              }
              const ctx50592 = document
                .getElementById('chart-50592')
                .getContext('2d')
              const trainsSAMOK = infos[i]['mr(sam ok)']
              dataSAM.labels.push(trainsSAMOK)
              dataSAM.datasets[0].data.push(
                infos[i]['pourcentage de chaque type mr sam ok']
              )

              new Chart(ctx50592, {
                type: 'bar',
                data: dataSAM,
                options: optionsSAMOK,
                responsive: true,
                maintainAspectRatio: false,
              })
            }
          }
        }
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
    console.log(infos)
  }, [site, startDate, endDate, MR, result50592, resultSAM, BE, BL])
  useEffect(() => {
    createChart()
  }, [infos])

  return (
    <>
      <div className="parent historique">
        <div className="filtre historique">
          <RangeDatePicker onChange={handleDateChange} />
        </div>
        <div className="statistique" style={{ position: 'relative' }}>
          <p>
            Journal
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
                <RefreshIcon /> Raffraichir
              </Button>
            </div>
          </p>
          <div id="pdf-content">
            <div>
              <div className="row">
                <div className="col-left">
                  {showToolbar && (
                    <ul>
                      <li>
                        {' '}
                        {startDate} - {endDate}
                      </li>
                      <br />
                      <li> Site : {site} </li>
                      <br />
                      <li> Type Mr : {MR} </li>
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
                  <ToolbarRapport />
                  <div className="filtreS">
                    <Site className="site" onChange={handleSiteChange} />
                    <div className="fS">
                      <InputLabel>Type Mr </InputLabel>
                      <Resultats onChange={handleMRChange} options={typemr} />
                      <InputLabel>Résultat 50592 </InputLabel>
                      <Resultats
                        onChange={handleResult50592Change}
                        options={option50592}
                        disabled={disabled50}
                      />
                      <InputLabel>Résultat SAM S005</InputLabel>
                      <Resultats
                        onChange={handleResultSAMChange}
                        options={optionSAM}
                        disabled={disabledSam}
                      />
                      <InputLabel>Option D39-D50 </InputLabel>
                      <Resultats
                        onChange={handleBEChange}
                        options={optionBE}
                        disabled={disabled50}
                      />
                      <InputLabel>
                        Résultats 50592 – Bande étroite - autre CE
                      </InputLabel>
                      <Resultats
                        onChange={handleBLChange}
                        options={optionBE_CE}
                        disabled={disabled50}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              className="graphiques"
              style={{ display: 'flex', width:'100%',justifyContent:'spaceAround',margin:'30px'}}
            >
              <canvas className="chart" id="chart-sam"></canvas>
              <canvas className="chart" id="chart-50592"></canvas>
            </div>
            <div className="tableau-stat" id="page2el">
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
                        <TableCell>{MR}</TableCell>
                        <TableCell>{nbrPassage50592}</TableCell>
                        <TableCell>{pourcentage50592}</TableCell>
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
                        <TableCell>{MR}</TableCell>
                        <TableCell>{nbrPassage50592}</TableCell>
                        {pourcentage50592?.map((pourcentage, index) => (
                          <TableCell>{pourcentage}</TableCell>
                        ))}
                      </TableBody>
                    </>
                  )}
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}
export default Statistique

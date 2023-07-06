import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import dayjs from 'dayjs'
import autoTable from 'jspdf-autotable'
import image from '../../exemples/images/sites.jpg'
import sncflogo from '../../exemples/images/sncfreseau.jpeg'
import imagePdf from '../../exemples/images/imagePDF.png'
import axios from 'axios'
import config from '../../config'
export default function PDFRapport({ customData, periodeL, siteSelectionne}) {
  const [pdfDocument, setPdfDocument] = useState(null)
  const [pdfDocumentQuarter, setPdfDocumentQuarter] = useState(null)
  const [pdfDocumentAnnual, setPdfDocumentAnnual] = useState(null)
  const [dated, dateF] = periodeL
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  let customPDF = 0

  //const [capteurs,setCapteurs]=useState([])
  const generatePdf = async (data, periode, site,type,filename) => {

    let startY = 30
    let infoSamOK=[]
    let Info50592OK=[]
    let infoSamNOK=[]
    let Info50592NOK=[]
    const doc = new jsPDF()
    console.log("aaaaaa",data)
    let  [infos, categorie,CEPerturbe,capteurs,isCustom] = data

if(infos)
{
  infoSamNOK=infos.filter(c=>c.hasOwnProperty('mr(sam nok)'))
  infoSamOK=infos.filter(c=>c.hasOwnProperty('mr(sam ok)'))

}    else
    infos=[]
if(type!==3)
{
  Info50592NOK=capteurs.filter(c=>c.hasOwnProperty('mr(50592 nok)'))
  Info50592OK=capteurs.filter(c=>c.hasOwnProperty('mr (50592 ok)'))


}
else{
  Info50592NOK=infos.filter(c=>c.hasOwnProperty('mr(50592 nok)'))
  Info50592OK=infos.filter(c=>c.hasOwnProperty('mr (50592 ok)'))

}


    let y = startY
    const sections = [
      {
        titre: 'Objet',
        contenu: [
          {
            p: `Le département DGII GE SF Produits dispose d’un site de test des Compteurs d’Essieux (Ou DER : Détecteurs Electronique de Roues) à ${site}`,
          },
          {
            p: 'Dans le cadre de la comparaison des deux méthodes de mesures respectives à l’interopérabilité et à la méthode nationale ; permettant de vérifier la compatibilité entre un Matériel Roulant et les Compteurs d’Essieux (ou des détecteurs), une instrumentation du site a été réalisée afin de disposer d’un système d’enregistrement autonome et continu sur ces différentes chaines.',
          },
          { p: 'Les objectifs sont multiples sur ce site d’essais :' },
          {
            Listes: [
              {
                l: 'Comparer les deux méthodes de mesures (interopérable et SAM S005),',
              },
              {
                l: 'Réaliser les essais d’admission vis-à-vis des DER type D39/D50 (SAM S005)',
              },

              {
                l: 'Obtenir un REX EV d’autres types,',
              },
              {
                l: 'Investiguer sur divers phénomène (CEM…),',
              },
              {
                l: 'Engranger des données utiles à de futures études',
              },
              {
                l: 'Expérimenter et/ou mettre en endurance de nouveaux systèmes de détection…',
              },
            ],
          },
        ],
      },
      {
        titre: 'Abréviations et textes de référence',
        contenu: [
          {
            acro: 'DGII GE SF',
            explication:
              'Direction Générale et Industrielle, département Génie Electrique, division Signalisation Ferroviaire.',
          },
          {
            acro: 'DGII IP3M AME',
            explication:
              'Direction Générale et Industrielle, département Intégration, Projets Multi-Métiers & Mesure, Agence Mesure & Essais.',
          },
          { acro: 'TSV ', explication: 'TéléSurVeillance' },
          { acro: 'DER', explication: 'Détecteur Électronique de Roues' },
          { acro: 'CE ', explication: 'Compteur d’Essieux' },
          { acro: 'PK ', explication: 'Point Kilométrique' },
          { acro: 'EV ', explication: 'Ensemble à la Voie (Capteur),' },
          {
            acro: 'SAM ',
            explication: 'Spécification D’admission de Matériel roulant',
          },
          {
            acro: 'CEM ',
            explication: 'Compatibilité ÉlectroMagnétiques',
          },
          {
            acro: 'RFN',
            explication: ' Réseau Ferré National',
          },
          {
            acro: 'SYRENE',
            explication: 'Système de Reconnaissance des Numéros d’Engins',
          },
          {
            acro: 'FFT',
            explication: 'Fast Fourier Transform',
          },
          {
            acro: 'mV',
            explication: 'milli-Volts',
          },
          {
            acro: 'µS',
            explication: 'Microseconde',
          },
          {
            acro: 'Urepos',
            explication:
              'Tension de référence du signal SAM S005 lorsqu’aucune atténuation du signal n’est détectée. ',
          },
          {
            acro: 'NF EN 50592',
            explication:
              "Norme Française - Applications ferroviaires - Essais du matériel roulant pour la compatibilité électromagnétique avec les compteurs d'essieux",
          },
          {
            acro: 'SAM S005',
            explication:
              'Protocole de vérification de la compatibilité des matériels roulants avec les détecteurs électroniques de roues ',
          },
          {
            acro: 'CLC/TS 50238-3',
            explication:
              'Railway applications - Compatibility between rolling stock and train detection systems - Part 3: Compatibility with axle counters',
          },
          {
            acro: 'ERA/ERTMS/033281',
            explication:
              'INTERFACES BETWEEN CONTROL-COMMAND AND SIGNALLING TRACKSIDE AND OTHER SUBSYSTEMS',
          },
        ],
      },

      {
        titre: 'Prestation',
        contenu: [
          {
            p: 'Les capteurs, décrits dans les parties suivantes, sont installés en voie. Plusieurs zones, en fonction du type de capteurs et du type d’analyse sont prévues :',
            Listes: [
              {
                l: "Capteurs de déclenchement pour détecter le passage d'un train et lancer les acquisitions.",
              },
              {
                l: 'Système de reconnaissance SYRENE pour relever le numéro d’engin (Information à venir récupérer sur un serveur existant).',
              },

              {
                l: 'DER liés à l’analyse SAM 005 (Méthode nationale).',
              },
              {
                l: 'Capteurs liés à l’analyse 50592 (Méthode interopérabilité).',
              },
              {
                l: 'Capteur de courant dans le rail.',
              },
              {
                l: 'Conditions environnementales : infos météo,',
              },
            ],
          },
          {
            p: 'Réserve : autres types de Compteurs d’Essieux en fonction de demandes spécifiques.',
          },
          {
            p: `Le schéma suivant reprend l’implémentation globale des capteurs dans la zone d’essai de ${site}`,
          },
          { image: image },
        ],
      },
      {
        titre: 'Contenu du livrable ',
        contenu: [
          {
            p: `Ce rapport de synthèse produit trimestriellement – accessible directement sur l’IHM comprend les éléments synthétiques et statistiques sur les événements observés sur le site de ${site} : `,
            Listes: [
              {
                l: 'par type/famille de trains,',
              },
              {
                l: 'nombre de circulations sur la période,',
              },

              {
                l: 'nombre d’alertes détectées',
              },
              {
                l: 'type d’alerte détectées (SAM S005, 50592)',
              },
              {
                l: 'type de CE impactés. ',
              },
            ],
          },
        ],
      },
      {
        titre: 'Résultats - Type/famille de trains  ',
        contenu: [
          {
            p: `Les trains pris en compte dans ce rapport sur la campagne d'essai à poste fixe de ${site} sont ceux identifiés par le système SYRENE. Les caractéristiques de l’échantillon de trains testés sont reportés dans le tableau ci-dessous :`,
            
            Table: [
              (categorie.length>0 ?({
                Headers: [
                  '',
                  'catégorie',
                  'Type de train',
                  'Nombre de passage',
                ],
                Body: categorie?.map((section, index) => [
                  index + 1,
                  section.category,
                  section.typeMR,
                  section.count,
                ]),
              }):(
                {p:'Les trains affichés n\'ont pas de type MR'}
              ))
              
            ],
          },
        ],
      },
      {
        titre: 'Résultats – Alertes SAM S005 (NOK) ',
        contenu: [
          (infoSamNOK.length>0 ?(
            {
              Table: [
                {
                  Headers: [
                    ' ',
                    'type mr',
                    'Nombre de train passé',
                    'Nombre de train passé perturbé',
                    'pourcentage de perturbation de chaque capteur ',
                  ],
                  Body: infoSamNOK?.map((section, index) => [
                    index + 1,
                    section['mr(sam nok)'],
                    section['nombre de train passé (sam nok)'],
                    section['nombre de train passé sam nok'],
                    Object.entries(section['pourcentage de perturbation par index d\'un type mr']).map(([key, value]) => `EV${Number(key)+1}: ${value}`).join('\n'),
                  ]),
                },
              ],
            }
          ):({
            p: 'informations indisponibles'
          }))
        ],
      },
  
      {
        titre: 'Résultats – Alertes 50592 (NOK)',
        contenu: [
          (Info50592NOK.length>0 ?(
            {
              Table: [
                {
                  Headers: [
                    ' ',
                    'type mr',
                    'Nombre de train passé',
                    'Nombre de train passé perturbé',
                    'pourcentage de perturbation de chaque occultation ',
                  ],
                  Body: Info50592NOK?.map((section, index) => [
                    index + 1,
                    section['mr(50592 nok)'],
                    section['nombre de train passé(50592 nok)'],
                    section['nombre de train passé 50592 nok'],
                    Object.entries(section['le pourcentage de chaque capteur']).map(([key, value]) => `${key}: ${value}`).join('\n'),
                  ]),
                },
              ],
            }
          ):({
            p: 'informations indisponibles'
          }))
        ],
      },
    ]

if(infoSamOK.length>0){
  sections.push(   {
    titre: 'Résultats – Alertes SAM S005 (OK) ',
    contenu: [
      (infoSamOK.length>0 ?(
        {
          Table: [
            {
              Headers: [
                ' ',
                'type mr',
                'Nombre de train passé',
                'Nombre de train passé perturbé',
                'pourcentage de perturbation de chaque capteur',
              ],
              Body: infoSamOK?.map((section, index) => [
                index + 1,
                section['mr(sam ok)'],
                section['nombre de train passé (sam ok)'],
                section['nombre de train passé avec sam ok'],
                section['pourcentage de chaque type mr sam ok'],
              ]),
            },
          ],
        }
      ):({
        p: 'informations indisponibles'
      }))
    ],
  })
}
if(Info50592OK.length>0){
  sections.push({
    titre: 'Résultats – Alertes 50592 (OK)',
    contenu: [
      (Info50592OK.length>0 ?(
        {
          Table: [
            {
              Headers: [
                ' ',
                'type mr',
                'Nombre de train passé',
                'Nombre de train passé perturbé',
                'poucentage de chaque type mr ',
              ],
              Body: Info50592OK?.map((section, index) => [
                index + 1,
                section['mr (50592 ok)'],
                section['nombre de train passé(50592 ok )'],
                section['nombre de train passé 50592 ok'],
                Object.entries(section['le poucentage de chaque type mr (50592 ok)']).map(([key, value]) => `${key}: ${value}`).join('\n'),
              ]),
            },
          ],
        }
      ):({
        p: 'informations indisponibles'
      }))
    ],
  })
}

    const pageGarde = [
      { Titre: 'SNCF Réseau' },
      {
        Titre: 'DIRECTION GÉNÉRALE INDUSTRIELLE & INGÉNIERIE',
        sousTitre1: 'Département Intégration Projet Multi-Métiers et Mesure ',
        sousTitre2: 'Agence Mesure et Essais IP3M (DGII IP3M AME)',
        sousTitre3: '9 quai de Seine ',
      },
      { sousTitre3: '93584 SAINT-OUEN CEDEX' },
      {
        sousTitre3: 'Tél : +33 (0)1 49 45 76 50 – Fax : +33 (0)1 49 45 76 59',
        image: imagePdf,
      },
      {
        p: 'Les résultats présentés dans ce rapport d’essai ne se rapportent qu’aux objets soumis à l’essai, suivant les indications indiquées dans son contenu.',
      },
      {
        p: 'Sa reproduction n’est autorisée que sous sa forme intégrale. Seule la version signée électroniquement fait foi',
      },
    ]



    const addHeader = () => {
      doc.setFont('arial', 'bold')
      doc.setFontSize(10)
      doc.setTextColor('gray')
      doc.text(`Rapport de la Période : ${periode}`, 120, 10)
    }
    const resetFont = () => {
      doc.setFont('Arial', 'normal')
      doc.setFontSize(12)
      doc.setTextColor('black')
    }
    const Heading = (titre, index) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      doc.setTextColor('Orange')
      doc.text(`${index}.${titre}`, 20, 20)
    }
    const PiedDePage = async (contenu) => {
      const y = pageHeight - 20
      doc.setLineWidth(0.2)
      doc.setDrawColor(0, 0, 0) // Couleur du trait (noir)
      doc.line(20, y, pageWidth - 20, y)
      const yOffset = 3
      let currentY = y + yOffset

      doc.setFont('Arial', 'normal')
      doc.setFontSize(8)
      doc.setTextColor('Gray')

      for (const item of contenu) {
        if (item.Titre) {
          doc.text(item.Titre, 20, currentY)
          currentY += yOffset
        }
        if (item.sousTitre1) {
          doc.text(item.sousTitre1, 20, currentY)
          currentY += yOffset
        }
        if (item.sousTitre2) {
          doc.text(item.sousTitre2, 20, currentY)
          currentY += yOffset
        }
      }

      doc.setFont('Arial', 'normal')
      doc.setFontSize(8)
      doc.setTextColor('gray')
      const pageCount = doc.getNumberOfPages()
      doc.text(`Page ${pageCount - 2}`, pageWidth / 2, pageHeight - 10)

      doc.addImage(sncflogo, pageWidth - 25, pageHeight - 25, 20, 20)
    }

    const PageDeGarde = async (contenu) => {
      doc.setPage(1)
      doc.setTextColor('#ff6600')//255,102,0
      for (const item of contenu) {
        if (item.p) {
          doc.setFontSize(11)
          doc.setTextColor('black')
          const lines = doc.splitTextToSize(item.p, pageWidth - 40)
          lines.forEach((line, i) => {
            doc.text(line, 20, y + i * 5)
          })
          y += lines.length * 2 + 10
        }
        if (item.Titre) {
          doc.setFont('arial', 'normal')
          doc.setFontSize(20)
          doc.text(item.Titre, 20, y)
          y += 10
        }
        if (item.sousTitre1) {
          doc.setFontSize(14)
          doc.text(item.sousTitre1, 20, y)
          y += 5
        }
        if (item.sousTitre2) {
          doc.setFont('arial', 'normal')
          doc.setFontSize(11)
          doc.text(item.sousTitre2, 20, y)
          y += 5
        }
        if (item.sousTitre3) {
          doc.setFontSize(9)
          doc.text(item.sousTitre3, 20, y)
          y += 5
        }
        if (item.image) {
          y += 15
          const img = new Image()
          img.src = item.image
         
          const loadedImg = await new Promise((resolve) => {
            img.onload = function () {
              resolve(img)
            }
          })

         
          doc.addImage(loadedImg, 'JPEG', 20, y, 150, 60)
          y += 80
        }
      }
    }

    doc.addPage()
    const addSection = async (index, titre, contenu) => {
      doc.addPage()
      addHeader()
      Heading(titre, index)

      resetFont()
      y = startY

      for (const item of contenu) {
        if (item.p) {
          const lines = doc.splitTextToSize(item.p, pageWidth - 40)
          lines.forEach((line, i) => {
            doc.text(line, 20, y + i * 10)
          })
          y += lines.length * 10 + 10
        }

        if (item.Listes) {
          item.Listes.forEach((liste) => {
            const lines = doc.splitTextToSize(liste.l, pageWidth - 40)
            lines.forEach((line, i) => {
              doc.setFontSize(12)
              doc.setFont('helvetica', 'normal')
              if (i === 0) {
                doc.text('• ' + line, 30, y)
              } else {
                doc.text(line, 30, y)
              }
              y += 10
            })
          })
        }
        if (item.acro) {
          let def
          doc.setFontSize(12)
          doc.setFont('helvetica', 'normal')
          def = `${item.acro}:${item.explication}`
          const lines = doc.splitTextToSize(def, pageWidth - 40)
          lines.forEach((line, i) => {
            if (i === 0) {
              doc.text(`• ${line}`, 30, y)
            } else {
              doc.text(`${line}`, 30, y)
            }
            y += 10
          })
        }

        if (item.image) {
          const img = new Image()
          img.src = item.image
        
          const loadedImg = await new Promise((resolve) => {
            img.onload = function () {
              resolve(img)
              
            }
          })
          doc.addImage(loadedImg, 'JPEG', 20, y, pageWidth - 40, 30)
          doc.setPage(doc.getNumberOfPages())
          y += 30
        }
        if (item.Table) {
          const tableHeaders = item.Table[0].Headers
          const tableBody = item.Table[0].Body

          doc.autoTable({
            head: [tableHeaders],
            body: tableBody,
            startY: y + 5,
          })

          y = doc.lastAutoTable.finalY + 8
        }

        if (y > pageHeight - 50) {
          await PiedDePage(pageGarde)
          doc.addPage()
          addHeader()
          await PiedDePage(pageGarde)
          y = startY
          resetFont()
          y += 10
        }
      }
      await PiedDePage(pageGarde)
    }
    const generateTableOfContents = (headings) => {
      doc.setPage(2)
      doc.setFillColor(255, 0, 0)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      doc.text('Sommaire', 20, 20)

      // Créer un tableau pour le sommaire
      const tableData = []
      headings.forEach((heading, index) => {
        const text = `${index + 1}. ${heading.titre}`
        const page = heading.page
        tableData.push([text, page])
      })

      // Imprimer le tableau de contenu
      autoTable(doc, {
        startY: 30,
        head: [['Titre', 'Page']],
        body: tableData,
        margin: { top: 10 },
        styles: {
          overflow: 'linebreak',
          columnWidth: 'wrap',
          font: 'helvetica',
          fontSize: 12,
          halign: 'left',
        },
      })
    }
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    const headings = []
    await PageDeGarde(pageGarde)
    console.log("logger","sections.length",sections.length);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const titre = section.titre
      const page = i + 1 // La première page est la page 1
      await addSection(i + 1, titre, section.contenu)
      headings.push({ titre, page })
    }
    generateTableOfContents(headings)
if(type===1){
  try {
    const formData = new FormData();
    formData.append('pdfFile', doc.output('blob'), filename); // Ajoutez le fichier PDF à l'objet FormData  
    // le stocker dans le dossier output
    const resultatEnvoi = await  axios.post(`${config.API_URL}/upload`, formData)
    // alert(resultatEnvoi.data)
    console.log("resultatEnvoi",resultatEnvoi.data,filename)

  } catch (error) {
    console.log("resultatEnvoi",error)
  }
  
}else if(type===2){
  try {
    const formData = new FormData();
    formData.append('pdfFile', doc.output('blob'), filename); // Ajoutez le fichier PDF à l'objet FormData  
    // le stocker dans le dossier output
    const resultatEnvoi = await  axios.post(`${config.API_URL}/upload`, formData)
    // alert(resultatEnvoi.data)
    console.log("resultatEnvoi",resultatEnvoi.data,filename)

  } catch (error) {
    console.log("resultatEnvoi",error)
  }
}

else{
  try {
    const formData = new FormData();
    formData.append('pdfFile', doc.output('blob'), filename); // Ajoutez le fichier PDF à l'objet FormData  
    // le stocker dans le dossier output
    const resultatEnvoi = await  axios.post(`${config.API_URL}/upload`, formData)
    // alert(resultatEnvoi.data)
    console.log("resultatEnvoi",resultatEnvoi.data,filename)

  } catch (error) {
    console.log("resultatEnvoi",error)
  }
}
  }
  const handleDownloadPdf = async (filename, data, periode, site) => {
    customPDF+=1
    await generatePdf(data, periodeL, siteSelectionne,3,`(${customPDF})Rapport à la demande de la période ${periodeL[0]}-${periodeL[1]}.pdf`)
  }

  const generationReportTrimestrielPrecedent = async () => {
    console.log("logger","generationReportTrimestrielPrecedent");

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    
    const previousQuarterStart = new Date(currentYear, Math.floor((currentMonth - 3) / 3) * 3, 1);
    const previousQuarterEnd = new Date(currentYear, Math.floor((currentMonth - 3) / 3) * 3 + 3, 0);

    const formattedStartDate=formatDate(previousQuarterStart)
    const formattedEndDate=formatDate(previousQuarterEnd)
    const { Mydata, MyPeriode, siteDefault } = await getData(formattedStartDate, formattedEndDate)


      await generatePdf(Mydata, MyPeriode, siteDefault,1,        `${getLastQuarter()}_Rapport trimestriel_${formatDateLocale(previousQuarterStart)}_${formatDateLocale(previousQuarterEnd)}.pdf`,
      )

    
     
    
  }
  
  
const formatDateLocale = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate.replace(/\//g, '-');

};

  const formatDate = (date) => {
    console.log("formatDate",date)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const generationReportAnnuelPrecedent = async () => {
    console.log("logger","generationReportAnnuelPrecedent");

    const currentDate = dayjs()
    const currentYear = currentDate.year()

    const previousYear = currentYear-1
    const startDate = `${previousYear}-01-01`
    const endDate = `${previousYear}-12-31`
    const { Mydata, MyPeriode, siteDefault } = await getData(startDate, endDate)
      await generatePdf(Mydata, MyPeriode, siteDefault,2, `${getLastYear()}Rapport annuel${startDate}-${endDate}.pdf`,
      Mydata,
      MyPeriode,
      siteDefault
    )
       
  }
/*
  // Fonction pour générer le rapport trimestriel
  const generateReport = async () => {
    try {
      await generationReportTrimestrielPrecedent();
      console.log('Rapport trimestriel généré avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération du rapport trimestriel :', error);
    }
  };
  
  // Planifiez l'exécution de la génération du rapport selon votre condition (premier jour ouvré du trimestre)
  const scheduleReportGeneration = () => {
    // Obtenez la date actuelle
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDate = now.getDate();
    const currentDay = now.getDay();
  
    // Vérifiez si la condition pour générer le rapport est remplie
    if (
      (currentMonth === 1 || currentMonth === 6 || currentMonth === 7 || currentMonth === 10) &&
      (currentDate === 1 || (currentDate === 2 && currentDay === 1)) // Premier jour ouvré du trimestre
    ) {
      // Générez le rapport
      generateReport();
    }
  };
  
  // Planifiez l'exécution de la génération du rapport à une fréquence donnée (par exemple, toutes les 24 heures)
  const scheduleInterval = setInterval(scheduleReportGeneration, 24 * 60 * 60 * 1000);
  
  // Exécutez la génération du rapport au démarrage du worker
  scheduleReportGeneration();
  
  // Gérez les erreurs et les terminaisons
  process.on('uncaughtException', (error) => {
    console.error('Erreur non capturée dans le worker :', error);
  });
  
  process.on('SIGINT', () => {
    clearInterval(scheduleInterval);
    console.log('Arrêt du worker');
  });*/

  const getLastQuarter = ()=> {
    let quarter =""
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so adding 1
  if(currentMonth<3)
    {
      quarter = 4+"__"+(currentYear-1)
    }
    else if(currentMonth>=3&&currentMonth<6){
      quarter = 1+"__"+(currentYear)
  
    }
    else if(currentMonth>=6&&currentMonth<9){
      quarter = 2+"__"+(currentYear)
  
    }
    else if(currentMonth>=9&&currentMonth<12){
      quarter = 3+"__"+(currentYear)
  
    }
    return quarter
  }

  
  const getLastYear = ()=> {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return "_"+(currentYear-1)+"_"
  }
  const loadPdf = async () => {

    try {
      const response = await axios.get(`${config.API_URL}/download`)
      if (response.status === 200) {

        if (
          !response.data?.find((rapport) =>
            rapport.name.includes(getLastQuarter())
          )
        ) {
         await generationReportTrimestrielPrecedent()        }
        if (
          !response.data?.find((rapport) =>
            rapport.name.includes(getLastYear())
          )
        ) {
         await generationReportAnnuelPrecedent()
              }

              customPDF = response.filter(rapport =>rapport.name.includes("demande")).length
      }
      else{

       await generationReportTrimestrielPrecedent()        
       await generationReportAnnuelPrecedent()


      }
      
    } catch (error) {
      console.log('Error:', error)

     await generationReportTrimestrielPrecedent()        
     await generationReportAnnuelPrecedent()
    }
  }
useEffect(()=>{
  loadPdf()
},[])





 
  
  return (
    <Button
      variant="primary"
      onClick={() =>
        handleDownloadPdf(
          `Rapport à la demande de la période${periodeL}.pdf`,
          customData,
          periodeL,
          siteSelectionne
        )
      }
    >
      <FileDownloadIcon style={{ marginTop: '5px' }} />
      Exporter
    </Button>
  )

  async function getData(dateDebut, dateFin) {
    const siteDefault = 'Chevilly'

    let [infos, categorie, CEPerturbe, capteurs, typemr] = ["", "", "", "", ""]


  

    try {
      console.log("logger", "dateDebut", dateDebut, `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

      const resultatCat = await axios.get(
        `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )
      const typesMRArray = resultatCat.data.map(obj => obj.typeMR)
      typemr = typesMRArray.join(",")
      console.log("logger", "typemr", typemr, `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

      categorie = (resultatCat.data) // Assurez-vous de définir correctement setCategorie avec la fonction pour mettre à jour l'état
      console.log("logger", "categorie", categorie)
    } catch (error) {
      console.error(error)
    }
    try {
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typemr}&statutsam=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`

      )

  
  
      

      infos = (resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
      console.log("logger", "infos", infos, `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typemr}&statutsam=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

    } catch (error) {
      console.error(error)
    }
    try {
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenRapport?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

      CEPerturbe = (resultat.data[resultat.data.length - 1])
      console.log("logger", "CEPerturbe", CEPerturbe)

    } catch (error) {
      console.error(error)
    }


        try {
        const resultat = await axios.get(
          `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typemr}&statut50592=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
          
        )
        capteurs=(resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
      } catch (error) {
        console.error(error)
      }
      
    

    const Mydata = [infos, categorie, CEPerturbe,capteurs]

    const MyPeriode = [dateDebut, dateFin]
    return { Mydata, MyPeriode, siteDefault }
  }
}
import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import dayjs from 'dayjs'
import autoTable from 'jspdf-autotable'
import sites from '../../exemples/images/sites.jpg'
import sncflogo from '../../exemples/images/sncfreseau.jpeg'
import imagePDF1 from '../../exemples/images/imagePDF.png'
import entete from '../../exemples/images/i00.jpg'
import entete2 from '../../exemples/images/i0.jpg'
import imageFixe from '../../exemples/images/imageFixe.png'
import imageHeader from '../../exemples/images/imageHeader.png'
import description from '../../exemples/images/i0.jpg'
import axios from 'axios'
import config from '../../config'
import Loading from '../../components/Loading'

export default function PDFRapport({ customData, periodeL, siteSelectionne,filtres}) {
  const [pdfDocument, setPdfDocument] = useState(null)
  const [pdfDocumentQuarter, setPdfDocumentQuarter] = useState(null)
  const [pdfDocumentAnnual, setPdfDocumentAnnual] = useState(null)
  const [dated, dateF] = periodeL
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [chargement,setChargement] = useState(false)
  let customPDF = 0

  //const [capteurs,setCapteurs]=useState([])
  const generatePdf = async (data, periode, site,type,filename) => {

    let startY = 30
    let infoSamOK=[]
    let Info50592OK=[]
    let infoSamNOK=[]
    let Info50592NOK=[]
    const doc = new jsPDF()
    let  [infos, categorie,CEPerturbe,capteurs,isCustom] = data
    console.debug("infos",infos)

if(infos)
{
  infoSamNOK=infos.VueParTypeMR.filter(c=>c.PassagesSam005.NombreNOK>0)
  infoSamOK=infos.VueParTypeMR.filter(c=>c.PassagesSam005.NombreOK>0)
    Info50592NOK=infos.VueParTypeMR.filter(c=>c.Passages50592.NombreNOK>0)
    Info50592OK=infos.VueParTypeMR.filter(c=>c.Passages50592.NombreOK>0)
    console.debug("infoSamNOK",infoSamNOK)
    console.debug("Info50592NOK",Info50592NOK)
    console.debug("infoSamOK",infoSamOK)
    console.debug("Info50592OK",Info50592OK)

}  
else
infos=[]





    let y = startY
    const sections = [
      {
        titre: 'Objet',
        contenu: [
          {
             p: `Le département DGII GE SF Produits dispose d’un site de test des Compteurs d’Essieux (Ou DER : Détecteurs Electronique de Roues) à ${site}.\n\nDans le cadre de la comparaison des deux méthodes de mesures respectives à l’interopérabilité et à la méthode nationale ; permettant de vérifier la compatibilité entre un Matériel Roulant et les Compteurs d’Essieux (ou des détecteurs), une instrumentation du site a été réalisée afin de disposer d’un système d’enregistrement autonome et continu sur ces différentes chaines.\n\nDans le cadre de la comparaison des deux méthodes de mesures respectives à l’interopérabilité et à la méthode nationale ; permettant de vérifier la compatibilité entre un Matériel Roulant et les Compteurs d’Essieux (ou des détecteurs), une instrumentation du site a été réalisée afin de disposer d’un système d’enregistrement autonome et continu sur ces différentes chaines.\n\n Les objectifs sont multiples sur ce site d'essais: `,
          },
          {
            //  p: 'Dans le cadre de la comparaison des deux méthodes de mesures respectives à l’interopérabilité et à la méthode nationale ; permettant de vérifier la compatibilité entre un Matériel Roulant et les Compteurs d’Essieux (ou des détecteurs), une instrumentation du site a été réalisée afin de disposer d’un système d’enregistrement autonome et continu sur ces différentes chaines.',
          },
          //  { p: 'Les objectifs sont multiples sur ce site d’essais :' },
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
            acro: 'DGII GE SF ',
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
            xx: `Le schéma suivant reprend l’implémentation globale des capteurs dans la zone d’essai de ${site}`,
          },
          
          
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
                  // Body: infoSamNOK?.map((section, index) => [
                  //   index + 1,
                  //   section['mr(sam nok)'],
                  //   section['nombre de train passé (sam nok)'],
                  //   section['nombre de train passé sam nok'],
                  //   Object.entries(section['pourcentage de perturbation par index d\'un type mr']).map(([key, value]) => `EV${Number(key)+1}: ${value}`).join('\n'),
                  Body: infoSamNOK?.map((section, index) => [
                    index + 1,
                    section.TypeDeTrain,
                    section.PassagesSam005.Nombre,
                    section.PassagesSam005.NombreNOK,
                    Object.entries(section.PerturbationsSam005.PerturbationsPourcentage).map(([key, value]) => `${key}: ${value}`).join('\n'),

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
                    section.TypeDeTrain,
                    section.Passages50592.Nombre,
                    section.Passages50592.NombreNOK,
                    Object.entries(section.Depassements50592.DepassementsPourcentage).map(([key, value]) => `${key}: ${value}`).join('\n'),
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
                // 'pourcentage de perturbation de chaque capteur',
              ],
              // Body: infoSamOK?.map((section, index) => [
              //   index + 1,
              //   section['mr(sam ok)'],
              //   section['nombre de train passé (sam ok)'],
              //   section['nombre de train passé avec sam ok'],
              //   section['pourcentage de chaque type mr sam ok'],
              // ]),
              Body: infoSamOK?.map((section, index) => [
                index + 1,
                section.TypeDeTrain,
                section.PassagesSam005.Nombre,
                section.PassagesSam005.NombreOK,
                // Object.entries(section.PerturbationsSam005.PerturbationsPourcentage).map(([key, value]) => `${key}: ${value}`).join('\n'),

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
                // 'poucentage de chaque type mr ',
              ],
              // Body: Info50592OK?.map((section, index) => [
              //   index + 1,
              //   section['mr (50592 ok)'],
              //   section['nombre de train passé(50592 ok )'],
              //   section['nombre de train passé 50592 ok'],
              //   Object.entries(section['le poucentage de chaque type mr (50592 ok)']).map(([key, value]) => `${key}: ${value}`).join('\n'),
              // ]),
              Body: Info50592OK?.map((section, index) => [
                index + 1,
                section.TypeDeTrain,
                section.Passages50592.Nombre,
                section.Passages50592.NombreOK,
                // Object.entries(section.Depassements50592.DepassementsPourcentage).map(([key, value]) => `${key}: ${value}`).join('\n'),
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
      
      {
        // Titre: 'DIRECTION GÉNÉRALE INDUSTRIELLE & INGÉNIERIE',
        // sousTitre1: 'Département Intégration Projet Multi-Métiers et Mesure ',
        // sousTitre2: 'Agence Mesure et Essais IP3M (DGII IP3M AME)',
        // sousTitre3: '9 quai de Seine ',
      },
      
      {
        // p: 'Les résultats présentés dans ce rapport d’essai ne se rapportent qu’aux objets soumis à l’essai, suivant les indications indiquées dans son contenu.',
      },
      {
        // p: 'Sa reproduction n’est autorisée que sous sa forme intégrale. Seule la version signée électroniquement fait foi',
      },
    ]



    const addHeader = () => {
      doc.setFont('arial', 'bold')
      doc.setFontSize(10)
      doc.setTextColor('gray')
      doc.text(`Rapport de la Période : ${periode}`, 110, 10)
    }
    const resetFont = () => {
      doc.setFont('Arial', 'normal')
      doc.setFontSize(12)
      doc.setTextColor('black')
    }
    const Heading = (titre, index) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor('Orange');
      doc.text(`${index}.${titre}`, 20, 20);
    
      const imageHeaderWidth = 25;
      const imageHeaderHeight = 30;
      const imageHeaderX = pageWidth - imageHeaderWidth;
      const imageHeaderY = 0;
    
      doc.addImage(imageHeader, 'png', imageHeaderX, imageHeaderY, imageHeaderWidth, imageHeaderHeight);
    };
    
    const PiedDePage = async (contenu) => {
      const y = pageHeight - 20;
    
      const imageWidth = pageWidth * 0.99;
      const imageHeight = 20;
      const imageX = 0;
      const imageY = pageHeight - imageHeight;
    
      doc.addImage(imageFixe, 'png', imageX, imageY, imageWidth, imageHeight);
    
      const paginationWidth = 14;
      const paginationHeight = 20;
      const paginationX = 2;
      const paginationY = pageHeight - paginationHeight;
    
      let currentY = imageY - 5;
      let yOffset = 3;
    
      for (const item of contenu) {
        if (currentY < startY) {
          doc.addPage();
          currentY = pageHeight - 20;
          addHeader();
          doc.addImage(imageFixe, 'png', imageX, imageY, imageWidth, imageHeight);
          currentY -= 5;
        }
    
        if (item.Titre) {
          doc.text(item.Titre, 20, currentY);
          currentY += yOffset;
        }
        if (item.sousTitre1) {
          doc.text(item.sousTitre1, 20, currentY);
          currentY += yOffset;
        }
        if (item.sousTitre2) {
          doc.text(item.sousTitre2, 20, currentY);
          currentY += yOffset;
        }
    
        // Ajoutez ici votre logique de contenu supplémentaire
    
        currentY += yOffset;
      }

      doc.setFillColor('#FF6600'); // Couleur du remplissage (noir)
      doc.rect(paginationX, paginationY, paginationWidth, paginationHeight, 'F'); // Dessine le rectangle noir
      doc.setFontSize(8);
      doc.setTextColor('#000000'); // Couleur du texte (noir)
      const pageCount = doc.getNumberOfPages();
      doc.text(`Page ${pageCount }`, paginationX + 2, paginationY + 8); // Affiche le numéro de page dans le rectangle
    };
    
    
    
    
    const PageDeGarde = async (contenu) => {
      doc.setPage(1);
      doc.setTextColor('#ff6600'); // 255,102,0
      const imageWidth = doc.internal.pageSize.getWidth();
      const imageHeight = 150;
      const imageX = 0;
      const imageY = 0;
    
      doc.addImage(entete, 'JPG', imageX, imageY, imageWidth, imageHeight);
    
      let y = imageHeight + 10; // Initialisation de la position verticale pour le texte
    
      doc.setFontSize(12);
      doc.setTextColor('black');
      const text = "Les résultats présentés dans ce rapport d’essai ne se rapportent qu’aux objets soumis à l’essai, suivant les indications indiquées dans son contenu.\n\nSa reproduction n’est autorisée que sous sa forme intégrale. Seule la version signée électroniquement fait foi";
      const textLines = doc.splitTextToSize(text, pageWidth - 40);
      textLines.forEach((line, i) => {
        doc.text(line, 20, y + i * 5);
      });
      y += textLines.length * 5 + 15; // Mise à jour de la position verticale après le texte et le saut de ligne
    
      const nouvelleImageWidth = doc.internal.pageSize.getWidth();
      const nouvelleImageHeight = 55;
      const nouvelleImageX = 0;
      const nouvelleImageY = y - 5; // Espace de 5 pixels entre le texte et la nouvelle image
    
      doc.addImage(entete2, 'JPG', nouvelleImageX, nouvelleImageY, nouvelleImageWidth, nouvelleImageHeight);
    
      const imagePDFWidth = doc.internal.pageSize.getWidth();
      const imagePDFHeight = 20;
      const imagePDFX = 0;
      const imagePDFY = doc.internal.pageSize.getHeight() - imagePDFHeight;
    
      doc.addImage(imagePDF1, 'png', imagePDFX, imagePDFY, imagePDFWidth, imagePDFHeight);
    };
    

    doc.addPage()
    const addSection = async (index, titre, contenu) => {
    
      doc.addPage()
      addHeader()
      Heading(titre, index)

      resetFont()
      y = startY

      for (const item of contenu) {
        const paragraphWidth = pageWidth * 0.85; 
        // if (item.p) {
        //   const lines = doc.splitTextToSize(item.p, paragraphWidth); // Largeur maximale de 80 pour chaque ligne

        //   const lineHeight = 8; // Nouvelle valeur pour l'interligne
        //   lines.forEach((line, i) => {
        //     doc.setFont('helvetica', 'normal');
        //     doc.setFontSize(12);
        //     doc.text(line, 20, y + i * lineHeight); // Utilisation de la nouvelle valeur de l'interligne
        //   });
        //   y += lines.length * lineHeight; // Utilisation de la nouvelle valeur de l'interligne
        // }
        if (item.p) {
          const textLines = doc.splitTextToSize(item.p, paragraphWidth);
          const lineHeight = 8; // Nouvelle valeur pour l'interligne
        
          textLines.forEach((line, i) => {
            const characters = line.split('');
            let xPos = 20;
        
            characters.forEach((character, j) => {
              doc.text(character, xPos, y + i * lineHeight);
              xPos += doc.getTextWidth(character);
            });
          });
        
          y += textLines.length * lineHeight; // Utilisation de la nouvelle valeur de l'interligne
        }


        if (item.xx) {
          const text = `Le schéma suivant reprend l’implémentation globale des capteurs dans la zone d’essai de ${site}`;
          const image = sites; // Remplacez "yourImage" par votre image
      
          doc.addPage(); // Ajouter une nouvelle page
            // Changer l'orientation de la page en mode paysage
          
      
          // Afficher le texte
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(text, 20, startY);
      
          // Afficher l'image
          const blockHeight = 100; // Hauteur de l'image
          doc.addImage(image, 'JPEG', 20, startY + 15, pageWidth - 40, blockHeight);
          doc.setPage(doc.getNumberOfPages());
      
          y = startY + blockHeight;
        }
        
        
        if (item.Listes) {
          item.Listes.forEach((liste) => {
            const lines = doc.splitTextToSize(liste.l, pageWidth - 40);
            const lineHeight = 8; // Nouvelle valeur pour l'interligne
        
            lines.forEach((line, i) => {
              doc.setFontSize(12);
              if (i === 0) {
                doc.text('• ' + line, 30, y);
              } else {
                doc.text(line, 30, y);
              }
              y += lineHeight; // Utilisation de la nouvelle valeur de l'interligne
            });
          });
        }
        
        if (item.acro) {
          let def;
          doc.setFont('helvetica', 'normal');
          def = `${item.acro}:${item.explication}`;
          const lines = doc.splitTextToSize(def, pageWidth - 40);
          const lineHeight = 8; // Nouvelle valeur pour l'interligne
        
          lines.forEach((line, i) => {
            const parts = line.split(':');
            const acro = parts[0];
            const explication = parts.slice(1).join(':'); // Reconstruire la partie d'explication après les ":"
        
            const acroWidth = doc.getTextWidth(acro + ' : '); // Ajouter un espace avant le ":"
            const explicationWidth = doc.getTextWidth(' ' + explication); // Ajouter un espace après le ":"
        
            doc.setFont('helvetica', 'bold');
            doc.text(acro + ' : ', 30, y);
        
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12); // Rétablir la taille de police si nécessaire
            doc.text(explication, 30 + acroWidth, y);
        
            y += lineHeight; // Utilisation de la nouvelle valeur de l'interligne
          });
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
      const startPage = 2; // Définir la page de départ à la page 3
      let currentPage = startPage;
    
      doc.setPage(startPage);
      doc.setFillColor(255, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Sommaire', 20, 20);
    
      // Créer un tableau pour le sommaire
      const tableData = [];
      headings.forEach((heading, index) => {
        const text = `${index }. ${heading.titre}`;
        let page;
      
        if (index === 2) {
          page = `${currentPage+1} - ${currentPage + 2}`; // Attribuer les pages 5 et 6 au titre numéro 3
          currentPage += 2; // Incrémenter la numérotation des pages de 2
        } else {
          page = (currentPage+1).toString(); // Attribuer la page actuelle au titre
          currentPage += 1; // Incrémenter la numérotation des pages de 1
        }
      
        tableData.push([text, page]);
      });
      
    
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
      });
    };
    
    
    
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
    if(dateF){
      setChargement(true)
    } const resultatEnvoi = await axios.post(`${config.API_URLV2}/file/upload`, formData)
    setChargement(false)

    // alert(resultatEnvoi.data)
    console.log("resultatEnvoi",resultatEnvoi.data,filename)

  } catch (error) {
          setChargement(false)

    console.log("resultatEnvoi",error)
  }
  
}else if(type===2){
  try {
    const formData = new FormData();
    formData.append('pdfFile', doc.output('blob'), filename); // Ajoutez le fichier PDF à l'objet FormData  
    // le stocker dans le dossier output
    if(dateF){
      setChargement(true)
    }
    const resultatEnvoi = await axios.post(`${config.API_URLV2}/file/upload`, formData)
    setChargement(false)

    // alert(resultatEnvoi.data)
    console.log("resultatEnvoi",resultatEnvoi.data,filename)

  } catch (error) {
          setChargement(false)

    console.log("resultatEnvoi",error)
  }
}

else{
  try {
    const formData = new FormData();
    formData.append('pdfFile', doc.output('blob'), filename); // Ajoutez le fichier PDF à l'objet FormData  
    // le stocker dans le dossier output
    if(dateF){
      setChargement(true)
    }
    const resultatEnvoi = await  axios.post(`${config.API_URLV2}/file/upload`, formData)
    setChargement(false)

    // alert(resultatEnvoi.data)

    try {
      if(dateF){
        setChargement(true)
      }
      const response = await axios.get(`${config.API_URL}/download`)
      setChargement(false)

      if (response.status === 200) {
        const myFile = response.data.find(pdf=>pdf.name===filename)
        if(myFile)
{
  chargerPdf(myFile.content)

}        
      }
    } catch (error) {
            setChargement(false)

      console.log('Error:', error)
    }

  } catch (error) {
          setChargement(false)

    console.log("resultatEnvoi",error)
  }
}


}

  const chargerPdf = (content) => {
    const decodedContent = atob(content)
    const byteArray = new Uint8Array(decodedContent.length)
    for (let i = 0; i < decodedContent.length; i++) {
      byteArray[i] = decodedContent.charCodeAt(i)
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
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
            setChargement(false)

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
      if(dateF){
        setChargement(true)
      }
      const response = await axios.get(`${config.API_URL}/download`)
      setChargement(false)

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
            setChargement(false)

      console.log('Error:', error)

     await generationReportTrimestrielPrecedent()        
     await generationReportAnnuelPrecedent()
    }
  }
useEffect(()=>{
  loadPdf()
},[])





 
  
  return (

    <>
   {chargement?( <div style={{marginRight:"400px"}}><Loading/></div>):(  <Button
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
    </Button>   )}

 
    </>
  
  )

  async function getData(dateDebut, dateFin) {
    const siteDefault = 'Chevilly'

    let [infos, categorie, CEPerturbe, capteurs, typemr] = ["", "", "", "", ""]


  

    try {
      console.log("logger", "dateDebut", dateDebut, `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )
      if(dateF){
        setChargement(true)
      }

      const resultatCat = await axios.get(
        `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )
      setChargement(false)

      const typesMRArray = resultatCat.data.map(obj => obj.typeMR)
      typemr = typesMRArray.join(",")
      console.log("logger", "typemr", typemr, `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

      categorie = (resultatCat.data) // Assurez-vous de définir correctement setCategorie avec la fonction pour mettre à jour l'état
      console.log("logger", "categorie", categorie)
    } catch (error) {
            setChargement(false)

      console.error(error)
    }
    try {
      if(dateF){
        setChargement(true)
      }
      const resultat = await axios.get(
        `${config.API_URLV2}/Stats?site=${siteDefault}&typemr=${typemr}&statutsam=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`

      )
      setChargement(false)


  
  
      

      infos = (resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
      console.log("logger", "infos", infos, `${config.API_URLV2}/Stats?site=${siteDefault}&typemr=${typemr}&statutsam=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )

    } catch (error) {
            setChargement(false)

      console.error(error)
    }
    try {
      //Récupération des infos d'une date séléctionnée par l'utilisateur
      if(dateF){
        setChargement(true)
      }
      const resultat = await axios.get(
        `${config.API_URL}/dataBetweenRapport?site=${siteDefault}&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
      )
      setChargement(false)


      CEPerturbe = (resultat.data[resultat.data.length - 1])
      console.log("logger", "CEPerturbe", CEPerturbe)

    } catch (error) {
            setChargement(false)

      console.error(error)
    }


        try {
          if(dateF){
            setChargement(true)
          }
        const resultat = await axios.get(
          `${config.API_URLV2}/Stats?site=${siteDefault}&typemr=${typemr}&statut50592=NOK&startDateFichier=${(dateDebut)}&FinDateFichier=${(dateFin)}`
          
        )
        setChargement(false)

        capteurs=(resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
      } catch (error) {
              setChargement(false)

        console.error(error)
      }
      
    

    const Mydata = [infos, categorie, CEPerturbe,capteurs]

    const MyPeriode = [dateDebut, dateFin]
    return { Mydata, MyPeriode, siteDefault }
  }
}
import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios'
import config from '../../config'
import dayjs from 'dayjs'
import Tableau from '../../components/Tableaux/tableau_train'

function ConvertPdf({ data, periodeL, siteSelectionne,capteurs}) {
 const [dated, dateF] = ['2023-03-27','2023-06-27']
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [infos, setInfos] = useState([])
  const [categorie, setCategorie] = useState([])
  const [startTrim, setStartTrim] = useState('')
  const [EndTrim, setEndTrim] = useState('')
  const [typesMR, setTypesMR] = useState("")
  const [CEPerturbe,setCEPerturbe]=useState([])

  const [images, setImages] = useState([
    'i1.jpg',
    'i2.jpg',
    'i3.jpg',
    'i4.jpg',
    'i5.jpg',
    'i6.jpg',
    'i7.jpg',
    'i8.jpg',
    'i9.jpg',
  ]);


  const containerRef = useRef(null);

  const downloadPdf = async () => {
    const options = {
      margin: 0,
      marginTop:'-10px',
      filename: 'images.pdf',
      image: { type: 'jpg', quality: 1.0 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4' },
    };

    const element = containerRef.current;

    
    const content = `
    ${images
      .map((image, index) => {
        return `
        <style>
        table {
          border-collapse: collapse;
          width: 80%;
          justify-content: center;

        }
      
        th, td {
          padding: 8px;
          text-align: center;
          border: 1px solid black;
        }
</style>
          <div style="position: relative;">
            <img src="${process.env.PUBLIC_URL}/documents/${image}" alt="Image ${index}" style="max-width: 100%; height: auto;">
            ${index === 6 || index === 7
              ? `
                  ${index === 6 ? (
                    ` 
                    
                    <div style="position: absolute; top: -48%;  transform: translate(-50%, -50%);">
                    <table style="width: 180%;left:60%";>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Catégorie</th>
                          <th>Type de Train</th>
                          <th>Nombre de Passage</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${categorie
                        .map((row, index) => {
                          return `
                            <tr key=${index}>
                              <td>${index}</td>
                              <td>${row.category}</td>
                              <td>${row.typeMR}</td>
                              <td>${row.count}</td>
                            </tr>
                          `;
                        })
                        .join('')}
                    </tbody>
                    </table>
                    </div>
                    `
                  ) : ''}
                  ${index === 7 ? (
                    `                <div style="position: absolute; top: -62%;  transform: translate(-50%, -50%);">

                    <table style="width: 80%;left:60%;">
                      <thead>
                        <tr>
                          <th></th>
                          <th>type mr</th>
                          <th>Nombre de train passé</th>
                          <th>Nombre de train passé perturbé</th>
                          <th>pourcentage de perturbation de chaque capteur</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${infos.slice(0, -1).map((section, index) => {
                          return `
                          <tr key=${index}>
                          <td>${index + 1}</td>
                          <td>${section['mr(sam nok)']}</td>
                          <td>${section['nombre de train passé (sam nok)']}</td>
                          <td>${section['nombre de train passé sam nok']}</td>
                          <td>${Object.entries(section['pourcentage de perturbation par index d\'un type mr']).map(([key, value]) => `EV${Number(key)+1}: ${value}`).join('<br>')}</td>

                        </tr>
                        
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                    </div>

                    `
                  ) : ''}
                </div>
              `
              : ''
            }
          </div>
        `;
      })
      .join('')}
  `;
  

  
  
  
  
  
  
  

    
    element.innerHTML = content;

    await html2pdf().set(options).from(element).save();
  };

 
  const generationReportTrimestrielPrecedent = async () => {
    const currentDate = dayjs()
    const currentMonth = currentDate.month() + 1
    const currentYear = currentDate.year()
    const siteDefault = 'Chevilly'
  
    // Check if it's the beginning of a quarter (January, April, July, October)
    if (
      currentMonth === 1 ||
      currentMonth === 6 ||
      currentMonth === 7 ||
      currentMonth === 10
    ) {
      const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear
      const previousQuarterStartMonth =
        currentMonth - 3 > 0 ? currentMonth - 3 : currentMonth + 9
      const previousQuarterStartYear =
        previousQuarterStartMonth > 1 ? currentYear : previousYear - 1
      const startOfPreviousQuarter = dayjs(
        `${previousQuarterStartYear}-${previousQuarterStartMonth
          .toString()
          .padStart(2, '0')}-01`
      )
      const endOfPreviousQuarter = startOfPreviousQuarter
        .add(2, 'month')
        .endOf('month')
      const startDate = startOfPreviousQuarter.format('YYYY-MM-DD')
      const endDate = endOfPreviousQuarter.format('YYYY-MM-DD')
      setStartTrim(startDate)
      setEndTrim(endDate)
      try {
        const resultatCat = await axios.get(
          `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
        )
        const typesMRArray = resultatCat.data.map(obj => obj.typeMR);
      const typesMRString = typesMRArray.join(",");
       setTypesMR(typesMRString)
        setCategorie(resultatCat.data) // Assurez-vous de définir correctement setCategorie avec la fonction pour mettre à jour l'état
      } catch (error) {
        console.error(error)
      }
      try {
        const resultat = await axios.get(
          `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typesMR}&statutsam=NOK&startDateFichier=${startDate}&FinDateFichier=${endDate}`
          
        )
        setInfos(resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
    
      } catch (error) {
        console.error(error)
      }
      try {
        //Récupération des infos d'une date séléctionnée par l'utilisateur
        const resultat = await axios.get(
          `${config.API_URL}/dataBetweenRapport?site=${siteDefault}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
        )
        setCEPerturbe(resultat.data[resultat.data.length-1])
      } catch (error) {
        console.error(error)
      }
      const Mydata = [infos, categorie,CEPerturbe,capteurs]
      const MyPeriode = [startDate, endDate]
      // await generatePdf(Mydata, MyPeriode, siteDefault)
      // await handleDownloadPdf(
      //   `Rapport trimestriel__${startTrim}_${EndTrim}.pdf`,
      //   Mydata,
      //   MyPeriode,
      //   siteDefault
      // )
     
    }
  }
  
  
  // const generationReportAnnuelPrecedent = async () => {
  //   const currentDate = dayjs()
  //   const currentYear = currentDate.year()
  //   const siteDefault = 'Chevilly'
  
  //   // Check if it's the beginning of the year (January)
  //   if (currentDate.month() === 5) {
  //     const previousYear = currentYear - 1
  //     const startDate = `${previousYear}-01-01`
  //     const endDate = `${previousYear}-12-31`
  //     setStartTrim(startDate)
  //     setEndTrim(endDate)
  //     try {
  //       const resultatCat = await axios.get(
  //         `${config.API_URL}/dataBetweenrMr?site=${siteDefault}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
  //       )
  //       const typesMRArray = resultatCat.data.map(obj => obj.typeMR);
  //     const typesMRString = typesMRArray.join(",");
  //      setTypesMR(typesMRString)
  //       setCategorie(resultatCat.data) 
  //     } catch (error) {
  //       console.error(error)
  //     }
  //     // recupèration des infos 
  //     try {
  //       const resultat = await axios.get(
  //         `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typesMR}&statutsam=NOK&startDateFichier=${startDate}&FinDateFichier=${endDate}`
          
  //       )
  //       setInfos(resultat.data)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //     //recuperation de 50592 nok page 24/25 cdc 
  //     try {
  //       const resultat = await axios.get(
  //         `${config.API_URL}/dataBetweenRapport?site=${siteDefault}&startDateFichier=${startDate}&FinDateFichier=${endDate}`
  //       )
  //       setCEPerturbe(resultat.data[resultat.data.length-1])
  //     } catch (error) {
  //       console.error(error)
  //     }
  //     const Mydata = [infos, categorie,CEPerturbe,capteurs]
  //     const MyPeriode = [startDate, endDate]
  //     // await generatePdf(Mydata, MyPeriode, siteDefault)
  //     // await handleDownloadPdf(
  //     //   `Rapport annuel_${startDate}_${endDate}.pdf`,
  //     //   Mydata,
  //     //   MyPeriode,
  //     //   siteDefault
  //     // )
      
  //   }
  // }


  //Create Table
  useEffect(() => {
   
    generationReportTrimestrielPrecedent();

    // alert(JSON.stringify(table1))
  }, [categorie]);


  



  return (
    <div>
      {images.length > 0 && (
        <button
          className="download-button"
          onClick={downloadPdf}
          style={{
            position: 'fixed',
            top: '10px',
            left: '10px',
            backgroundColor: 'red',
            color: 'white',
            padding: '5px 10px',
            border: 'none',
            zIndex: 9999,
          }}
        >
          Download PDF
        </button>
      )}
      <div ref={containerRef}></div>
    </div>

 
  );

}




export default ConvertPdf;

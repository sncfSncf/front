import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import axios from 'axios'
import config from '../../config'
import dayjs from 'dayjs'

function ConvertPdf({ data, periodeL, siteSelectionne,capteurs}) {
  const [infos, setInfos] = useState([])
  const [infos50592, setInfos50592] = useState([])
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
    'i8.jpg'
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
         
          ${index===4?(` <div style="position: absolute; top: 10%;left: 49.5%; transform: rotate(90deg);">

          <p style="color:blue;font-size: 18px; margin-top:-20px">trimestriel T1 :01.01  au 31.03.202X</p>
        </div>`):''}

                ${index >0&&index!==4?(` <div style="position: absolute; top: 3.9%;left: 49.5%; transform: translate(-50%, -50%);">

                <p style="color:blue;font-size: 18px; margin-top:-20px">trimestriel T1 :01.01  au 31.03.202X</p>
              </div>`):''}
            <img src="${process.env.PUBLIC_URL}/documents/${image}" alt="Image ${index}" style="max-width: 99%; height: auto;">
            ${index === 5 || index === 6 || index === 7 || index === 0 
              ? `
                  ${index === 0 ? (
                    ` 
                    <div style="position: absolute; top: 69%;left: 65%; transform: translate(-50%, -50%);">

                    <p style="color:blue;font-size: 18px; margin-top:-5px">${siteSelectionne}</p>
                  </div>

                  <div style="position: absolute; top: 74%;left: 60%; transform: translate(-50%, -50%);">

                  <p style="color:blue;font-size: 18px; margin-top:-20px">trimestriel T1 :01.01  au 31.03.202X</p>
                </div>
                    `  ) : ''}
                    ${index === 5 ? (
                    ` 
                    
                    <div style="position: absolute; top: 48%;  transform: translate(-50%, -50%);">
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
                  ${index === 6 ? (
                    `                <div style="position: absolute; top: 35%;  transform: translate(-50%, -50%);">

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
                          <td>${Object.entries(section['pourcentage de perturbation par index d\'un type mr']).map(([key, value]) => 
                          `<div style="font-size: 12px">EV${Number(key)+1}: ${value}</div>`).join('')}</td>

                        </tr>
                        
                          `;
                        }).join('')}
                      </tbody>
                    </table>
                    </div>

                    `
                  ) : ''}
                  ${index === 7 ? (
                    `                <div style="position: absolute; top: 50%;  transform: translate(-50%, -50%);">

                    <table style="width: 80%;left:60%;">
                      <thead>
                        <tr>
                          <th></th>
                          <th>type mr</th>
                          <th>Nombre de train passé</th>
                          <th>Nombre de train passé perturbé</th>
                          <th>pourcentage de perturbation de chaque occultation</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${infos50592.slice(0, -1).map((section, index) => {
                          return `
                          <tr key=${index}>
                          <td>${index + 1}</td>
                          <td>${section['mr(50592 nok)']}</td>
                          <td>${section['nombre de train passé(50592 nok)']}</td>
                          <td>${section['nombre de train passé 50592 nok']}</td>
                          <td>
            ${Object.entries(section['le pourcentage de chaque capteur'])
              .map(([key, value]) => `<div style="font-size: 12px">${key}: ${value}</div>`)
              .join('')}
                          </td>

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

    try {
    //   const pdf = await html2pdf().set(options).from(element).toPdf().save('myfile.pdf');
      
    //  const blob = new Blob([pdf], { type: 'application/pdf' });
   
     html2pdf().set(options).from(element).toPdf().get('pdf').then(function (pdfObj) {


      const blob = pdfObj.output('blob');
      const formData = new FormData();
      //  formData.append('pdfFile', blob, "filename");
      formData.append('pdfFile', blob, 'Rapport annuel_2022-01-01_2022-12-31.pdf');
  
     
        axios.post(`${config.API_URL}/upload`, formData);
  

    })






    //  html2pdf().set(options).from(element).toPdf().get('pdf').then(function (pdfObj) {


    //   const blob = pdfObj.output('blob');
    //   const formData = new FormData();
    //   //  formData.append('pdfFile', blob, "filename");
    //   formData.append('pdfFile', blob, 'document.pdf');
  
     
    //     axios.post(`${config.API_URL}/upload`, formData);
  

    // })


    //  const formData = new FormData();
    //  formData.append('pdfFile', blob, "filename");
   
    //  const response = await axios.post(`${config.API_URL}/upload`, formData);
    //  const resultatEnvoi = response.data;
    //  alert(resultatEnvoi);
   } catch (error) {
     alert(error);
   }
    
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
        const resultat = await axios.get(
          `${config.API_URL}/dataBetweenstatistique?site=${siteDefault}&typemr=${typesMR}&statut50592=NOK&startDateFichier=${startDate}&FinDateFichier=${endDate}`
          
        )
        setInfos50592(resultat.data) // Assurez-vous de définir correctement setResult avec la fonction pour mettre à jour l'état
    
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
     
     
    }
  }
  
  
  

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

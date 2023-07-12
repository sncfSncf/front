import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import config from '../../config';

import { ReactComponent as CrossIcon } from '../../assets/cross-svgrepo-com.svg';
import html2pdf from 'html2pdf.js'
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
import FileDownloadIcon from '@mui/icons-material/FileDownload'

export default function NF50592() {
  
  const { dateFichier, heureFichier, site } = useParams();
  const [showToolbar, setShowToolbar] = useState(false)

  const [urlDossier, setUrlDossier] = useState('');

  const [imageSrcs, setImageSrcs] = useState([]);

  const handleDownloadPdf = () => {
    setShowToolbar(true) // Change the value of showToolbar after the PDF is saved
    const element = document.getElementById('pdf-content')

    // handleScroll()
    html2pdf()
      .set({
        filename: 'pdf-statistique.pdf',
        // pagebreak: { mode: 'avoid-all', before: '#page2el' },
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


  

  useEffect(() => {

    const fetchImages = async () => {

      try {

        const response = await fetch(

          `${config.API_URL}/urls?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`

        );
        const result = await response.json();

        console.log(result)

        setUrlDossier(result[0].url50592)


        const imageSrcs = [];
        // Iteration selon les images existants dans le dossier 

        for (let i = 0; i < result[0].images50592.length; i++) {

          const imageContentBase64 = result[0].images50592[i].content;
        
          // Décodez la chaîne base64 en une chaîne binaire

          const binaryString = window.atob(imageContentBase64);
         // Convertissez la chaîne binaire en un tableau de nombres entiers non signés

          const bytes = new Uint8Array(binaryString.length);

          for (let j = 0; j < binaryString.length; j++) {

            bytes[j] = binaryString.charCodeAt(j);

          }
          // Créer un objet Blob à partir du tableau de nombres entiers non signés

          const blob = new Blob([bytes], { type: 'image/png' });
          // Generation d'url blob pour l'image

          const imageUrl = URL.createObjectURL(blob);
          console.log(imageUrl)
          imageSrcs.push(imageUrl);
        }

        setImageSrcs(imageSrcs);

      } catch (error) {

        console.error(error);

        setImageSrcs([]);

      }

    };

    fetchImages();

  }, [dateFichier, heureFichier, site, urlDossier]);
const handleClose = ()=>{
  window.close()
}
  return (

    <div  className="parents " style={{marginLeft:'-0.5%'}}>
      <Button  style={{cursor:"pointer", position: "absolute", right: 80, top: -30 ,width: "40px", height: "40px",color:'red'}} variant="primary" onClick={handleDownloadPdf}>
                <FileDownloadIcon style={{ marginTop: '5px' }} />
                Exporter
              </Button>
  <CrossIcon onClick={handleClose} style={{cursor:"pointer", position: "absolute", right: 0, top: -30 ,width: "40px", height: "40px",color:'red'}} />


      <div  id="pdf-content"  style={{  alignItems: 'center', justifyContent: 'center', display: 'flex'}}> 
      {imageSrcs.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {imageSrcs.slice(0, 3).map((src, index) => (
        <img
          src={src}
          style={{ width: '100%', display: 'block', margin: '5px 0px' }}
          alt={`img-${index}`}
          key={index}
        />
      ))}
    </div>
  ) : (
    <p>Aucune image trouvée</p>
  )}
  {imageSrcs.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {imageSrcs.slice(3, 6).map((src, index) => (
        <img
          src={src}
          style={{ width: '100%', display: 'block', margin: '5px 0px' }}
          alt={`img-${index + 3}`}
          key={index + 3}
        />
      ))}
    </div>
  ) : null}
      </div>
  
</div>


  );

}

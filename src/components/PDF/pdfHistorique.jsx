import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload'


export default function PDF({ data,periode,site}) {
  const [startDate,endDate]=periode
  const [pdfDocument, setPdfDocument] = useState(null);
  


  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text(`Période du ${startDate} au ${endDate} sur le site ${site}`, 20, 20);
    doc.autoTable({
      head: [['Date Fichier', 'Numero de train',' TYPE MR','Vitesse moyenne',' Resultat Sam S005/50592','Environnement']],
      body: data.map((section, index) => [
        (section.dateFichier !== null && section.dateFichier !== undefined)
          ? section.dateFichier + '-' + section.heureFichier
          : (section.datesam !== null && section.datesam !== undefined)
            ? section.datesam + '-' + section.heuresam
            : section.date50592 + '-' + section.heure50592,
        section.numTrain || '-',
        section.mr || '-',
        section.vitesse_moy || '-',
        ((section.statutSAM !== null && section.statutSAM !== undefined) ? section.statutSAM : 'HS') + '-' +
          ((section.statut50592 !== null && section.statut50592 !== undefined) ? section.statut50592 : 'HS'),
        (section.meteo?.Humidite_rel || '-') + '-' + (section.meteo?.PressionAtmo_hPa || '-') + '-' + (section.meteo?.Temperature_degC || '-')
      ]),
      startY: 50
    });
    
    setPdfDocument(doc);
  };

  const handleDownloadPdf = () => {
    generatePdf()
    if (pdfDocument) {
      const blobUrl = pdfDocument.output('bloburl')
        const windowReference = window.open(blobUrl, periode)
        if (windowReference) {
          windowReference.focus()
        }
    }
  };

  return (
   
    <Button variant="primary" onClick={handleDownloadPdf}>
      <FileDownloadIcon style={{marginTop: '5px'}}/>
      Exporter
      </Button>
    
    
  );
}

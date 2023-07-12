import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


export default function PDF({ data, periode, site }) {
  const [startDate, endDate] = periode;

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Période du ${startDate} au ${endDate} sur le site ${site} \n\nObservés sur la période : ${data.length}`, 20, 20);
//'TYPE MR',
    doc.autoTable({
     
      head: [['Index', 'Heure de passage ', 'Numero de train',  'Vitesse moyenne', 'Resultat Sam S005 | 50592', 'Environnement']],
      body: data.map((section, index) => [
        { content: index + 1, styles: { halign: 'center' } },
        { content: (section.dateFichier !== null && section.dateFichier !== undefined)
            ? section.dateFichier + '-' + section.heureFichier
            : (section.datesam !== null && section.datesam !== undefined)
              ? section.datesam + '-' + section.heuresam
              : section.date50592 + '-' + section.heure50592, styles: { halign: 'center' } },
        { content: section.numTrain || '/', styles: { halign: 'center' } },
       // { content: section.mr || '/', styles: { halign: 'center' } },
        { content: section.vitesse_moy ? section.vitesse_moy + ' km/h' : '-', styles: { halign: 'center' } },


        {
         content: ((section.statutSAM !== null && section.statutSAM !== undefined) ? section.statutSAM : 'HS') + ' | ' +
               ((section.statut50592 !== null && section.statut50592 !== undefined) ? section.statut50592 : 'HS'),
      
          
          },


        {
          content:(section.meteo?.Temperature_degC || '-') + ' °C | '+ (section.meteo?.Humidite_rel || '-') + '% | ' + (section.meteo?.PressionAtmo_hPa || '-') + ' A ' ,
          styles: { halign: 'center' }
        }
      ]),
      startY: 50,
      styles: {
        cellPadding: 4,
        valign: 'middle',
        halign: 'center',
          cellPadding: 2, // Réduire le padding de la cellule
          fontSize: 8, // Réduire la taille de la police
          columnWidth: 'auto', // Largeur automatique pour chaque colonne
          bodyStyles: { minCellWidth: '10' } // Largeur minimale de chaque cellule
      }
      
    });

    const blobUrl = doc.output('bloburl');
    const windowReference = window.open(blobUrl, periode);

    if (windowReference) {
      windowReference.focus();
    }
  };

  return (
    <Button variant="primary" onClick={handleDownloadPdf}>
      <FileDownloadIcon style={{ marginTop: '5px' }} />
      Exporter
    </Button>
  );
}

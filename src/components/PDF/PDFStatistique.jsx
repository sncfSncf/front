import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload'


export default function PDFStatistique({periode,site}) {
  const [pdfDocument, setPdfDocument] = useState(null);
  


  const generatePdf = () => {
    const doc = new jsPDF();
    doc.text(`Période :  ${periode} sur le site ${site}`, 20, 20);
    setPdfDocument(doc);
  };

  const handleDownloadPdf = () => {
    generatePdf()
    if (pdfDocument) {
      pdfDocument.save(`${periode}.pdf`);
    }
  };

  return (
   
    <Button variant="primary" onClick={handleDownloadPdf}>
      <FileDownloadIcon style={{marginTop: '5px'}}/>
      Exporter
      </Button>
    
    
  );
}

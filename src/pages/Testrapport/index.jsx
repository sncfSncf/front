import React, { useEffect } from 'react';
import mammoth from 'mammoth';
import Docxtemplater from 'docxtemplater';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const RapportPDF = () => {
  useEffect(() => {
    const convertToImage = async () => {
      try {
        const response = await fetch('/documents/rapportWord.docx');
        const arrayBuffer = await response.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const fileData = Buffer.from(buffer);

        // Extraction du contenu du fichier Word
        const { value } = await mammoth.extractRawText({ arrayBuffer: fileData });
        const text = value.trim();

        // Conversion en HTML
        const convertedHtml = `<html><body>${text}</body></html>`;

        // Conversion en image
        const container = document.createElement('div');
        container.innerHTML = convertedHtml;

        const image = await html2canvas(container, { useCORS: true });

        // Modification de l'image
        const ctx = image.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.font = '20px Arial';
        ctx.fillText('Champ modifié', 100, 100);

        // Génération du rapport PDF
        const imgData = image.toDataURL('image/jpeg');
        const pdf = new jsPDF();

        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

        // Enregistrement du rapport PDF
        pdf.save('rapport.pdf');
      } catch (error) {
        console.log('Erreur :', error);
      }
    };

    convertToImage();
  }, []);

  return <div>Génération du rapport PDF en cours...</div>;
};

export default RapportPDF;

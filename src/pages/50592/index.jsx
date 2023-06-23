import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import config from '../../config';

export default function NF50592() {
  
  const { dateFichier, heureFichier, site } = useParams();

  const [urlDossier, setUrlDossier] = useState('');

  const [imageSrcs, setImageSrcs] = useState([]);

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

  return (

    <div className="parent captures50592">

      {imageSrcs.length > 0 ? (
        imageSrcs.map((src, index) => 
        <img src={src} style={{width: '100%',display:'block',margin:'5 0px'}} alt={`img-${index}`} key={index} />)
      ) : (
        <p>Aucune image trouvée</p>
      )}
    </div>

  );

}

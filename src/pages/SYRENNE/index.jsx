import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import config from '../../config';

export default function Syrenne() {

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

        setUrlDossier(result[0].image)


      } catch (error) {

        console.error(error);

        setImageSrcs([]);

      }

    };

    fetchImages();

  }, [dateFichier, heureFichier, site, urlDossier]);

  return (

    <div className="parent historique">

       <img src={urlDossier} style={{ width: '100%', display: 'block', margin: '5 0px' }} alt={`image-`}/>
    </div>

  );

}

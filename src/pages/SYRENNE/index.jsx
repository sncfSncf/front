import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import config from '../../config';
import { ReactComponent as CrossIcon } from '../../assets/cross-svgrepo-com.svg';

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
  const handleClose = ()=>{
    window.close()
  }
  return (

    <div className="parent historique">
  <CrossIcon onClick={handleClose} style={{cursor:"pointer", position: "absolute", right: 0, top: -5 ,width: "40px", height: "40px",color:'red'}} />

       <img src={urlDossier} style={{ width: '96%',height:'70vh', display: 'block', margin: '5px' }} alt={`image-`}/>
    </div>

  );

}

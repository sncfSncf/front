import { Card, CardContent, Typography } from "@mui/material";
import image1 from '../../exemples/images/img1.jpg'
import image2 from '../../exemples/images/img2.jpg'
import image3 from '../../exemples/images/img3.jpg'
import image4 from '../../exemples/images/img4.jpg'
import image5 from '../../exemples/images/img5.jpg'
import image6 from '../../exemples/images/img6.jpg'
import image7 from '../../exemples/images/img7.jpg'
import image8 from '../../exemples/images/img8.jpg'
import image10 from '../../exemples/images/img10.jpg'
import '../../App.css';
import React, { useState, useEffect } from 'react';

 import { Link} from 'react-router-dom'
 export default function Aide(){
  


 
    return(
        <div className="parent home" style={{ display: 'block' }}>
          <h1> Page d'aide</h1>
          <div>
            <p>
            Bienvenu sur l’interface de visualisation des résultats de mesures selon les deux méthodes "50592" & "SAM S005" ; obtenus au niveau de la base de télésurveillance "50592" Vs "SAM S005" de Chevilly
              
            </p>
          </div>
          <div className="bodyy">
          <div className="slider">
            <span style={{ '--i': 1 }}><img src={image1}alt="image1"></img></span>
            <span style={{ '--i': 2 }}><img src={image2}alt="image2"></img></span>
            <span style={{ '--i': 3 }}><img src={image3}alt="image3"></img></span>
            <span style={{ '--i': 4 }}><img src={image4}alt="image4"></img></span>
            <span style={{ '--i': 5 }}><img src={image5}alt="image5"></img></span>
            <span style={{ '--i': 6 }}><img src={image6}alt="image6"></img></span>
            <span style={{ '--i': 7 }}><img src={image7}alt="image7"></img></span>
            <span style={{ '--i': 8 }}><img src={image8}alt="image8"></img></span>
            <span style={{ '--i': 10 }}><img src={image10}alt="image10"></img></span>
     
          </div>
          </div>
       
  
         
      
        </div>
    )
}
import { Card, CardContent, Typography } from '@mui/material'
import image1 from '../../exemples/images/image00.png'
import image2 from '../../exemples/images/image01.png'
import image3 from '../../exemples/images/image03.png'
import image4 from '../../exemples/images/image04.png'
import '../../App.css'
import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
export default function Aide() {
  return (
    <div className="parent home" style={{ display: 'block' }}>
      <div>
        <p style={{ padding: '20px' }}>
          Bienvenu sur l’interface de visualisation des résultats de mesures
          selon les deux méthodes 50592 & SAM S005 obtenus au niveau de la base
          de télésurveillance de Chevilly
        </p>
      </div>
      <div className="bodyy">
        <div className="slider">
          <span style={{ '--i': 4 }}>
            <Link to="/jourJ">
              {' '}
              <img src={image4} alt="image4"></img>
            </Link>
          </span>
          <span style={{ '--i': 2 }}>
            <Link to="/historique">
              {' '}
              <img src={image2} alt="image2"></img>
            </Link>
          </span>
          <span style={{ '--i': 1 }}>
            <Link to="/journal">
              <img src={image1} alt="image1"></img>
            </Link>
          </span>
          <span style={{ '--i': 3 }}>
            <Link to="/synoptique">
              <img src={image3} alt="image3"></img>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

import { Card, CardContent, Typography } from "@mui/material";
 import React from "react";
 import { Link} from 'react-router-dom'
 export default function Aide(){
    return(
        <div className="parent home" style={{ display: 'block' }}>
          <h1> Page d'aide</h1>
          <div>
            <p>
            Bienvenu sur l’interface de visualisation des résultats de mesures selon les deux méthodes "50592" & "SAM S005" ; obtenus au niveau de la basse de télésurveillance "50592" Vs "SAM S005" de Chevilly
              
            </p>
          </div>
          <ul>
            <li>
              <Card className='card' >
                <CardContent  component={Link} to='/jourJ'>
                  <Typography variant="h5" component="h2">
                    Temps réel
                  </Typography>
                  <Typography variant="body1" component="p">
                  Onglet de visualisation des passages de trains observés le « Jour J ». Cette page contient les informations et résultats SAM S005, 50592 et SYRENE associés.
                  </Typography>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className='card'>
                <CardContent component={Link} to="/historique" >
                  <Typography variant="h5" component="h2">
                    Historique
                  </Typography>
                  <Typography variant="body1" component="p">
                  On peut visualiser cet onglet, les résultats en lien avec les passages de trains sur une période préconfigurée par l’utilisateur et en lien avec un site d’essais choisi.
                  </Typography>
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className='card'>
                <CardContent component={Link} to="/journal">
                  <Typography variant="h5" component="h2">
                    Journal & statistique
                  </Typography>
                  <Typography variant="body1" component="p">
                  L'onglet permet de consulter les rapports générés automatiquement (trimestriels) ainsi que de les générer à la demande par l'opérateur. Cet onglet contient aussi des Dashboards en lien avec les statistiques calculées.
                  </Typography>
                  
                </CardContent>
              </Card>
            </li>
            <li>
              <Card className='card'>
                <CardContent component={Link}  to="/synoptique">
                  <Typography variant="h5" component="h2">
                    Synoptique
                  </Typography>
                  <Typography variant="body1" component="p">
                  Un onglet qui illustre un synoptique du site d'essais, reprenant l'emplacement et la disposition des capteurs au niveau de la voie instrumentée.
                  </Typography>
                </CardContent>
              </Card>
            </li>
          </ul>
        </div>
    )
}
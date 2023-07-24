import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";


export default function Temps() {
  const { dateFichier, heureFichier, site } = useParams();
  const [temps, setTemps] = useState([])
  console.log(dateFichier, heureFichier, site)


  const loadTemps = async () => {
    const resultat = await axios.get(
      `${config.API_URL}/temps?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`
    )
    setTemps(resultat.data)
    console.log(resultat.data)

  }

  useEffect(() => {
    loadTemps()
  }, [])

  return (
    <div className="parent historique">
      <Table style={{width:'1000px',margin:'50px 0px'}}>
        <TableHead>
          <TableRow >
            <TableCell className="cell" style={{ margin: 'auto',width:'400px',textAlign: 'center'  }} key={`cell-0`}>Numéro de l'occultation</TableCell>
            <TableCell className="cell" style={{ textAlign: 'center',width:'600px'}} key={`cell-1`} colSpan={3}>Temps T1, T2, T3 (s)

            </TableCell>


          </TableRow>
        </TableHead>
        <TableBody >
          {temps.map((tmp, index) => (
            <TableRow  key={`row-${index}-1`}>
              <TableCell style={{textAlign: 'center'}} className="cell">{index + 1}</TableCell>

              {tmp.t1.map((pol, innerIndex) => (

                <TableRow>

                  <TableCell className="cell" style={{ textAlign: 'center',width: "200px", margin: 'auto',padding:'5px 16px' }} key={`cell-${index}-${innerIndex}-1`}>
                    {tmp.t1[innerIndex]}
                  </TableCell>
                  <TableCell className="cell" style={{ textAlign: 'center',width: "200px", margin: 'auto',padding:'5px 16px' }} key={`cell-${index}-${innerIndex}-1`} >
                    {tmp.t2[innerIndex]}
                  </TableCell>
                  <TableCell className="cell" style={{ textAlign: 'center',width: "200px", margin: 'auto',padding:'5px 16px' }} key={`cell-${index}-${innerIndex}-1`}>
                    {tmp.t3[innerIndex]}
                  </TableCell>
                </TableRow>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
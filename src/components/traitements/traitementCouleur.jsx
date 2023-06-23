import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TableFooter } from '@mui/material'


function TableResultat({ blr1, blr2, ber1, ber2, parBE, parBL,parOB,ob,fob,freqBL }) {
  const bande1 = freqBL?.slice(0, 3);
const bande2 = freqBL?.slice(3, 5);
const bande3 = freqBL?.slice(5, 7);

  return (
    <div className="filtre">
      <h5>Résultats Bande Large (BL) en «dBµA/m»</h5>
      <Table aria-label="simple table" style={{ width: "70%" }} className='tableBL'>
        <TableHead>
          <TableRow className="ligne">

            <TableCell align="center">Rail</TableCell>
            <TableCell align="center">Axe</TableCell>
            <TableCell className='resultat' align="center" colSpan={2} style={{ padding: '0px' }}>
              Résultats d'essais
              <TableCell
                align="center"
                colSpan={3}
                style={{ padding: '0px' }}
              >
                Evaluation en bande
                <TableCell
                  colSpan={3}
                  style={{
                    padding: '0 ',
                    border: 'none'
                  }}
                  align="center"
                >
                  Bande 1
                  {bande1?.map((param,index)=>(
                 <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>{param}</TableCell> ))}
                </TableCell>
                <TableCell align="center" colSpan={2} style={{ padding: '0px' }}>Bande 2
                 {bande2?.map((param,index)=>(<TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>{param}</TableCell> ))}
                </TableCell>
                <TableCell align="center"colSpan={2}style={{ padding: '0px' }}>
                  Bande 3
                  {bande3?.map((param,index)=>(<TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>{param}</TableCell> ))}
                </TableCell>
              </TableCell>
              <TableCell
                align="center"
                colSpan={3}
                style={{ padding: '0px' }}
              >
                Evaluation hors bande
                <TableCell colSpan={3} align="center" style={{ padding: '0px' }}>
                  Hors bande 1
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>Freq [kHz]</TableCell>
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>Valeur</TableCell>
                </TableCell>
                <TableCell align="center" colSpan={2} style={{ padding: '0px' }}>
                  Bande 2
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }} >Freq [kHz]</TableCell>
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>Valeur</TableCell>
                </TableCell>
                <TableCell colSpan={2} align="center" style={{ padding: '0px' }}>
                  Bande 3
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>Freq [kHz]</TableCell>
                  <TableCell align="center" style={{ padding: '6px', maxWidth: '50px' }}>Valeur</TableCell>
                </TableCell>
              </TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableCell rowSpan={3}>1</TableCell>
          <TableCell style={{padding:'0px 16px'}}>X</TableCell>
          <TableCell colspan={13} className='ble ligne' > 
          {blr1?.X.map((cell, index) => (
          <TableCell  className='ble' align="center" style={{ backgroundColor: '#' + blr1?.X_Fond[index] }} > {cell.toString().replace('.',',')} </TableCell>
          ))} 
          {ob[0]?.map((cell, index) => (
          <TableCell className='ble' align="center" style={{ backgroundColor: '#' + fob[0][index] }} > {cell.toString().replace('.',',')} </TableCell>
          ))}
          </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }}>Y</TableCell>
            <TableCell  colspan={13} className='ble ligne' >
            {blr1?.Y.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + blr1?.Y_Fond[index] }}> {cell.toString().replace('.',',')} </TableCell>))}
            {ob[1]?.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + fob[1][index] }} > {cell.toString().replace('.',',')} </TableCell>))}
           </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }}>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
               {blr1?.Z.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + blr1?.Z_Fond[index], borderBottom: 'none' }} > {cell} </TableCell>))} 
            {ob[2]?.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + fob[2][index] }} > {cell.toString().replace('.',',')} </TableCell>))}
            </TableCell>
          </TableRow>

          <TableCell rowSpan={3}>2</TableCell>
          <TableCell style={{ padding: '0px 16px' }}>X</TableCell>
          <TableCell colspan={13} className='ble ligne'> 
          {blr2?.X.map((cell, index) => (
          <TableCell align="center" className='ble' style={{ backgroundColor: '#' + blr2?.X_Fond[index], }} > {cell.toString().replace('.',',')} </TableCell>))} 
          {ob[3]?.map((cell, index) => (
          <TableCell align="center" className='ble' style={{ backgroundColor: '#' + fob[3][index] }} > {cell.toString().replace('.',',')} </TableCell>))}
          </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }}>Y</TableCell>
            <TableCell colspan={13} className='ble ligne'>
              {blr2?.Y.map((cell, index) => (
            <TableCell align="center"className='ble' style={{ backgroundColor: '#' + blr2?.Y_Fond[index]}} > {cell.toString().replace('.',',')} </TableCell>))}
            {ob[4]?.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + fob[4][index] }} > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }}>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
               {blr2?.Z.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + blr2?.Z_Fond[index], }} > {cell.toString().replace('.',',')} </TableCell>))}
            {ob[5]?.map((cell, index) => (
            <TableCell align="center" className='ble' style={{ backgroundColor: '#' + fob[5][index] }} > {cell.toString().replace('.',',')} </TableCell>))}
             </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(0, 239, 47)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Valeur inférieure ou égale à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(255, 56, 42)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Valeur supérieure à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(188, 188, 188)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Bruit ambiant mesuré supérieur aux limites de la norme -6 dB ==> DGII IP3M MAE ne peut pas tenir compte de cette valeur</TableCell>
          </TableRow>
          </TableFooter>
      </Table>
      <h5>Résultats Bande étroite (BE) en « dBµA/m» </h5>
      <Table aria-label="simple table" style={{ width: "70%" }} className='tableBE'>
  
        <TableHead>
          <TableRow className="ligne">

            <TableCell style={{ padding: '6px' }}>Rail</TableCell>
            <TableCell style={{ padding: '6px' }}>Axe</TableCell>
            <TableCell style={{ padding: '0px' }} align="center">
              Résultats d'essais
              <TableRow className="ligne">
                <TableCell colSpan={12} style={{ padding: '0px' }} align="center" > BF
                  <TableRow className="ligne"> {parBE?.map((cell, index) => (
                  <TableCell id={index} style={{ padding: '3px', width: '48px',textAlign:'center'}} >{cell.replace('_', ' ').replace('-',' ')}</TableCell>))} </TableRow>
                </TableCell>
              </TableRow>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell rowSpan={3} className='axe rail'>1</TableCell>
          <TableCell  style={{ padding: '0px 16px' }} className='axe rail'>X</TableCell>
          <TableCell colSpan={12}  className='ble ligne'> 
          {ber1?.X.map((cell, index) => (
          <TableCell className='ble beV' style={{ backgroundColor: '#' + ber1?.X_Fond[index], }}  > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={12}  className='ble ligne'> 
            {ber1?.Y.map((cell, index) => (
            <TableCell className='ble beV'  style={{ backgroundColor: '#' + ber1?.Y_Fond[index] }} > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={12}  className='ble ligne'> 
            {ber1?.Z.map((cell, index) => (
            <TableCell className='ble beV' style={{ backgroundColor: '#' + ber1?.Z_Fond[index] }} > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableCell rowSpan={3} className='axe rail'>2</TableCell>
          <TableCell style={{ padding: '0px 16px' }} className='axe rail'>X</TableCell>
          <TableCell colspan={12}  className='ble ligne'> 
          {ber2?.X.map((cell, index) => (
          <TableCell className='ble beV' style={{ backgroundColor: '#' + ber2?.X_Fond[index], }} > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={12}  className='ble ligne'> 
            {ber2?.Y.map((cell, index) => (
            <TableCell className='ble beV' style={{ backgroundColor: '#' + ber2?.Y_Fond[index], }}  > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={12}  className='ble ligne'> 
            {ber2?.Z.map((cell, index) => (
            <TableCell className='ble beV'  style={{ backgroundColor: '#' + ber2?.Z_Fond[index], }}  > {cell.toString().replace('.',',')} </TableCell>))} </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(0, 239, 47)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Valeur inférieure ou égale à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(255, 56, 42)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Valeur supérieure à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
          <TableCell colspan={2} style={{backgroundColor:'rgb(188, 188, 188)',padding:'0px 16px'}}> </TableCell>
          <TableCell colspan={8} style={{padding:'0px 16px'}}> Bruit ambiant mesuré supérieur aux limites de la norme -6 dB ==> DGII IP3M MAE ne peut pas tenir compte de cette valeur</TableCell>
          </TableRow>
          </TableFooter>
      </Table>
      

    </div>
  )
}

export default TableResultat

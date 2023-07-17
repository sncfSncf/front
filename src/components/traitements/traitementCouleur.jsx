import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TableFooter } from '@mui/material'


function TableResultat({ blr1, blr2, ber1, ber2, parBE, parBL, parOB, ob, fob, freqBL }) {
  const bande1 = freqBL?.slice(0, 3);
  const bande2 = freqBL?.slice(3, 5);
  const bande3 = freqBL?.slice(5, 7);

  return (
    <div className="" style={{ width: '100%', overflowX: 'hidden' }}>
      <ul><li style={{ fontWeight: 'bold', marginLeft: '42px',marginBottom:'10px' }}>&nbsp;Résultats Bande Large (BL) en «dBµA/m»</li></ul>
     
     
     
     
      <Table style={{ width: "100%", border: '1px solid black' }}>
  <TableHead style={{ borderBottom: '1px solid black' }}>
  
    <TableRow>
      <TableCell
        style={{
          paddingTop: '5px',
          paddingBottom: '0',
          borderBottom: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={15}
      >
        Résultats d'essais
      </TableCell>
    </TableRow>
    <TableRow>
    <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          borderBottom: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        className='axe rail'
        rowSpan={3}
      >
        
        <span style={{ margin: '0', padding: '0' }}>Rail</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={1}
        rowSpan={3}
      >
        <span style={{ margin: '0', padding: '0' }}>Axe</span>
      </TableCell>
      <TableCell  style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={7}
        rowSpan={1}>
           <span style={{ margin: '0', padding: '0' }}>Evaluation en bande</span>
        </TableCell>
        <TableCell  style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={6}
        rowSpan={1}>
           <span style={{ margin: '0', padding: '0' }}>Evaluation hors bande</span>
        </TableCell>
    </TableRow>
    <TableRow>
  
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={3}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 1</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={2}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 2</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={2}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 3</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={2}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 1</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={2}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 2</span>
      </TableCell>
      <TableCell
        style={{
          verticalAlign: 'top',
          paddingTop: '5px',
          paddingBottom: '0',
          border: '1px solid black',
          transform: 'translateZ(0)',
          fontWeight: 'bold',
        }}
        align="center"
        colSpan={2}
        rowSpan={1}
      >
        <span style={{ margin: '0', padding: '0' }}>Bande 3</span>
      </TableCell>
    </TableRow>
    <TableRow>
    
   
   
    
      
          
            {bande1?.map((param, index) => (
            <TableCell
            className='ble cell-width'
            style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
            align="center"
              >
                <span >{param}</span>
              </TableCell>
            ))}
          
          
            {bande2?.map((param, index) => (
                  <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>{param}</span>
              </TableCell>
            ))}
          
          
            
            {bande3?.map((param, index) => (
                  <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>{param}</span>
              </TableCell>
            ))}

              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Freq [kHz]</span>
              </TableCell>
              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Valeur</span>
              </TableCell>
              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Freq [kHz]</span>
              </TableCell>
              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Valeur</span>
              </TableCell>
              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Freq [kHz]</span>
              </TableCell>
              <TableCell
                  className='ble cell-width'
                  style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
                  align="center"
              >
                <span style={{ margin: '0', padding: '0' }}>Valeur</span>
              </TableCell>
        
      
    </TableRow>
  </TableHead>



        <TableBody>

          <TableCell rowSpan={3} style={{ border: '1px solid black' }} className='axe rail'>1</TableCell>
          <TableCell style={{ padding: '0px 16px' ,border: '1px solid black' }} className='axe rail'>X</TableCell>
          <TableCell colspan={13} className='ble ligne' style={{ padding: '5px 16px' }}>
  {blr1?.X.map((cell, index) => (
    <TableCell
      className='ble cell-width' 
      align="center"
      style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + blr1?.X_Fond[index], border: '1px solid black'  }}
    >
      {cell.toString().replace('.', ',')}
    </TableCell>
  ))}
  {ob[0]?.map((cell, index) => (
    <TableCell
      className='ble cell-width' 
      align="center"
      style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + fob[0][index], border: '1px solid black'  }}
    >
      {cell.toString().replace('.', ',')}
    </TableCell>
  ))}
</TableCell>

          <TableRow>
            <TableCell style={{ padding: '0px 16px' ,border: '1px solid black' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={13} className='ble ligne' >
              {blr1?.Y.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap',  backgroundColor: '#' + blr1?.Y_Fond[index], border: '1px solid black'  }}> {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[1]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap',  backgroundColor: '#' + fob[1][index] , border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>))}
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' ,border: '1px solid black' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
              {blr1?.Z.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{  minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + blr1?.Z_Fond[index], border: '1px solid black' }} > {cell} </TableCell>))}
              {ob[2]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{  minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + fob[2][index] , border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>))}
            </TableCell>
          </TableRow>

          <TableCell rowSpan={3} style={{ border: '1px solid black' }} className='axe rail'>2</TableCell>
          <TableCell style={{ padding: '0px 16px' ,border: '1px solid black' }} className='axe rail'>X</TableCell>
          <TableCell colspan={13} className='ble ligne'>
            {blr2?.X.map((cell, index) => (
              <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap',  backgroundColor: '#' + blr2?.X_Fond[index], border: '1px solid black'  }} > {cell.toString().replace('.', ',')} </TableCell>))}
            {ob[3]?.map((cell, index) => (
              <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap',  backgroundColor: '#' + fob[3][index] , border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>))}
          </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' ,border: '1px solid black' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={13} className='ble ligne cell-width'>
              {blr2?.Y.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap',backgroundColor: '#' + blr2?.Y_Fond[index], border: '1px solid black'  }} > {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[4]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{  minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + fob[4][index] , border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow >


            <TableCell style={{ padding: '0px 16px', border: '1px solid black' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
              {blr2?.Z.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + blr2?.Z_Fond[index], border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[5]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + fob[5][index] , border: '1px solid black'}} > {cell.toString().replace('.', ',')} </TableCell>))}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(0, 239, 47)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Valeur inférieure ou égale à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(255, 56, 42)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Valeur supérieure à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(188, 188, 188)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Bruit ambiant mesuré supérieur aux limites de la norme -6 dB ==> DGII IP3M MAE ne peut pas tenir compte de cette valeur</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <ul><li style={{ fontWeight: 'bold', marginLeft: '42px' ,marginTop:'10px',marginBottom:'10px'}}>&nbsp;Résultats Bande étroite (BE) en « dBµA/m»</li></ul>




      <Table aria-label="simple table" style={{ width: "100%", border: '1px solid black' }} className='tableBE'>
      <TableHead style={{ borderBottom: '1px solid black', width: "100%", border: '1px solid black' ,maxWidth: '100',
                whiteSpace: 'nowrap'}}>
        <TableRow>
          <TableCell
            style={{
              paddingTop: '5px',
              paddingBottom: '0',
              borderBottom: '1px solid black',
              transform: 'translateZ(0)',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
              fontWeight: 'bold',
              border: '1px solid black' // Ajout des bordures
            }}
            align="center"
            colSpan={15}
          >
            Résultats d'essais
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{
              verticalAlign: 'top',
              paddingTop: '5px',
              paddingBottom: '0',
             // borderBottom: '1px solid black',
              transform: 'translateZ(0)',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
              fontWeight: 'bold',
              maxWidth: '50px',
              whiteSpace: 'nowrap',
             border: '0.5px solid black' // Ajout des bordures
            }}
            align="center"
            colSpan={1}
            rowSpan={2}
          >
            <span>Rail</span>
          </TableCell>
          <TableCell
            style={{
              verticalAlign: 'top',
              paddingTop: '5px',
              paddingBottom: '0',
              //borderBottom: '1px solid black',
              transform: 'translateZ(0)',
              background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
              fontWeight: 'bold',
              maxWidth: '50px',
              whiteSpace: 'nowrap',
             border: '0.5px solid black' // Ajout des bordures
            }}
            align="center"
            colSpan={1}
            rowSpan={2}
          >
            <span>Axe</span>
          </TableCell>
          {parBE.map((cell, index) => (
  <TableCell
    className='ble cell-width'
    style={{ maxWidth: '100px', whiteSpace: 'nowrap', padding: '2px', wordBreak: 'break-all' ,border:'0.5px solid black '}}
    align="center"
    key={index}
  >
    <div style={{ display: 'inline-block', maxWidth: '100px', whiteSpace: 'normal', padding: '2px' }}>
      {cell.replace('_', ' ').replace('-', ' ').split(',').map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {word === '2005' && <br />}
          {wordIndex !== 0 && <br />}
          {word}
        </React.Fragment>
      ))}
    </div>
  </TableCell>
))}

        </TableRow>
      </TableHead>
      <TableBody >
        <TableRow>
          <TableCell style={{ border: '1px solid black' }} rowSpan={3} className='axe rail'>1</TableCell>
          <TableCell style={{ padding: '0px 16px', border: '1px solid black' }} className='axe rail'>X</TableCell>
          <TableCell style={{ maxWidth: '100px', whiteSpace: 'nowrap', }} colSpan={12} className='ble ligne'>
            {ber1?.X.map((cell, index) => (
              <TableCell className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + ber1?.X_Fond[index], border: '1px solid black' }}  > {cell.toString().replace('.', ',')} </TableCell>
            ))}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: '0px 16px',border: '1px solid black' }} className='axe rail'>Y</TableCell>
          <TableCell colspan={12}  style={{ minWidth: '100px', whiteSpace: 'nowrap'}} className='ble ligne'>
            {ber1?.Y.map((cell, index) => (
              <TableCell className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + ber1?.Y_Fond[index], border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>
            ))}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{  padding: '0px 16px', border: '1px solid black' }} className='axe rail'>Z</TableCell>
          <TableCell colspan={12} className='ble ligne'>
            {ber1?.Z.map((cell, index) => (
              <TableCell className='ble cell-width' style={{ minWidth: '100px', whiteSpace: 'nowrap', backgroundColor: '#' + ber1?.Z_Fond[index], border: '1px solid black' }} > {cell.toString().replace('.', ',')} </TableCell>
            ))}
          </TableCell>
        </TableRow>
      </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(0, 239, 47)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Valeur inférieure ou égale à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(255, 56, 42)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Valeur supérieure à la limite associée au détecteur</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colspan={2} style={{ backgroundColor: 'rgb(188, 188, 188)', padding: '0px 16px' }}> </TableCell>
            <TableCell colspan={8} style={{ padding: '0px 16px' }}> Bruit ambiant mesuré supérieur aux limites de la norme -6 dB ==> DGII IP3M MAE ne peut pas tenir compte de cette valeur</TableCell>
          </TableRow>
        </TableFooter>
      </Table>


    </div>
  )
}

export default TableResultat

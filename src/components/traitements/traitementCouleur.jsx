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
    <div className="" style={{ width: '100%', overflowX: 'auto' }}>
      <ul><li style={{ fontWeight: 'bold', marginLeft: '42px',marginBottom:'10px' }}>&nbsp;Résultats Bande Large (BL) en «dBµA/m»</li></ul>
      <Table style={{ width: "100%" ,border: '1px solid black' }} >
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
      colSpan={1}
    >
      <span>Rail</span>
    </TableCell>
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
      colSpan={1}
    >
      <span>Axe</span>
    </TableCell>
    <TableCell className="resultat" align="center" colSpan={12} style={{ padding: '0px' }}>
      <TableCell align="center" colSpan={7} style={{ padding: '0px', transform: 'translateZ(0)',fontWeight: 'bold' }}>
       
        <TableCell colSpan={3} style={{ padding: '0px', border: 'none', transform: 'translateZ(0)'}} align="center">
          Bande 1 
          {bande1?.map((param, index) => (
            <TableCell 
              align="center"
              className='ble2 cell-width'
              style={{
                maxWidth: '90px',
                whiteSpace: 'nowrap',
                fontSize: 'smaller',
                transform: 'translateZ(0)',
               // borderBottom: '1px solid black',
               
              }}
            >
              <span style={{paddingLeft:'12%', fontWeight: 'bold'}} >{param}</span>
            </TableCell>
          ))}
        </TableCell>
        <TableCell className='ble2 cell-width'align="center" colSpan={2} style={{ padding: '0px', transform: 'translateZ(0)'}}>
          Bande 2
          {bande2?.map((param, index) => (
            <TableCell
              align="center"
              className='ble2 cell-width'
              style={{
                maxWidth: '90px',
                whiteSpace: 'nowrap',
                fontSize: 'smaller',
                transform: 'translateZ(0)',
               // borderBottom: '1px solid black',
               
                marginRight:'50px'
              }}
            >
              <span  style={{ fontWeight: 'bold',marginRight:'50px',paddingLeft:'32%'}}>{param} </span>
            </TableCell>
          ))}
        </TableCell>
        <TableCell align="center" colSpan={2} style={{ padding: '20px', transform: 'translateZ(0)' }}>
          Bande 3
          {bande3?.map((param, index) => (
            <TableCell

            align="center"             
             className='ble2 cell-width'
              style={{
                maxWidth: '85px',
                whiteSpace: 'nowrap',
                fontSize: 'smaller',
                transform: 'translateZ(0)',
                //borderBottom: '1px solid black',
               
                marginRight:'50%'
              }}
            >
             <span style={{  fontWeight: 'bold',marginLeft:'-17px'}}> {param}</span>
            </TableCell>
          ))}
        </TableCell>
      </TableCell>
      <TableCell align="center" colSpan={6} style={{  transform: 'translateZ(0)',fontWeight: 'bold' }}>
       
        <TableCell colSpan={2} align="center" style={{ padding: '0px', transform: 'translateZ(0)' }}>
          Bande 1
          <TableCell
            align="center"     
            className='ble2 cell-width'
            style={{
              marginLeft:'-3px',
              maxWidth: '95px',
              whiteSpace: 'nowrap',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
              //borderBottom: '1px solid black',
            }}
          >
             <span style={{  fontWeight: 'bold',marginLeft:'-75%'}}>Freq [kHz]</span> 
          </TableCell>
          <TableCell
            align="center" 
            className='ble2 cell-width'
            style={{
              maxWidth: '85px',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
             // borderBottom: '1px solid black',
            }}
          >
              <span style={{ fontWeight: 'bold', marginLeft:'-85%'}}>Valeur</span> 
          </TableCell>
        </TableCell>
        <TableCell align="center" colSpan={2} style={{ padding: '0px', transform: 'translateZ(0)' }}>
          Bande 2
          <TableCell
            align="center" className='ble2 cell-width'
            style={{
              maxWidth: '85px',
              whiteSpace: 'nowrap',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
             // borderBottom: '1px solid black',
            }}
          >
                          <span style={{  fontWeight: 'bold',marginLeft:'-75%'}}> Freq [kHz]</span> 

           
          </TableCell>
          <TableCell
            align="center" 
            className='ble2 cell-width'
            style={{
              maxWidth: '90px',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
             // borderBottom: '1px solid black',
            }}
          >
            <span style={{  fontWeight: 'bold',marginLeft:'-55%'}}>Valeur</span> 

            
          </TableCell>
        </TableCell>
        <TableCell
          colSpan={2}
          align="center"
          className='ble2 cell-width'

          style={{
            padding: '0px',
            transform: 'translateZ(0)',
            borderBottom: '1px solid black',
          }}
        >
          Bande 3
          <TableCell
            align="center"
            className='ble2 cell-width'

            style={{
              maxWidth: '85px',
              whiteSpace: 'nowrap',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
              //borderBottom: '1px solid black',
            }}
          >
           <span style={{  fontWeight: 'bold',marginLeft:'-40%'}}> Freq [kHz]</span> 

          </TableCell>
          <TableCell
            align="center"
            className='ble2 cell-width'

            style={{
              maxWidth: '95px',
              fontSize: 'smaller',
              transform: 'translateZ(0)',
             // borderBottom: '1px solid black',
            }}
          >
           <span style={{  fontWeight: 'bold',marginLeft:'5%'}}>Valeur</span> 
          </TableCell>
        </TableCell>
      </TableCell>
    </TableCell>
  </TableRow>
</TableHead>



        <TableBody>

          <TableCell rowSpan={3}>1</TableCell>
          <TableCell style={{ padding: '0px 16px' }}>X</TableCell>
          <TableCell colspan={13} className='ble ligne' style={{ padding: '5px 16px' }}>
  {blr1?.X.map((cell, index) => (
    <TableCell
      className='ble cell-width' 
      align="center"
      style={{ backgroundColor: '#' + blr1?.X_Fond[index] }}
    >
      {cell.toString().replace('.', ',')}
    </TableCell>
  ))}
  {ob[0]?.map((cell, index) => (
    <TableCell
      className='ble cell-width' 
      align="center"
      style={{ backgroundColor: '#' + fob[0][index] }}
    >
      {cell.toString().replace('.', ',')}
    </TableCell>
  ))}
</TableCell>

          <TableRow>
            <TableCell style={{ padding: '0px 16px' }}>Y</TableCell>
            <TableCell colspan={13} className='ble ligne' style={{ padding: '5px 16px' }}>
              {blr1?.Y.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + blr1?.Y_Fond[index] }}> {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[1]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + fob[1][index] }} > {cell.toString().replace('.', ',')} </TableCell>))}
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }}>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
              {blr1?.Z.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + blr1?.Z_Fond[index], borderBottom: 'none' }} > {cell} </TableCell>))}
              {ob[2]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + fob[2][index] }} > {cell.toString().replace('.', ',')} </TableCell>))}
            </TableCell>
          </TableRow>

          <TableCell rowSpan={3}>2</TableCell>
          <TableCell style={{ padding: '0px 16px' }}>X</TableCell>
          <TableCell colspan={13} className='ble ligne'>
            {blr2?.X.map((cell, index) => (
              <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + blr2?.X_Fond[index], }} > {cell.toString().replace('.', ',')} </TableCell>))}
            {ob[3]?.map((cell, index) => (
              <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + fob[3][index] }} > {cell.toString().replace('.', ',')} </TableCell>))}
          </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }}>Y</TableCell>
            <TableCell colspan={13} className='ble ligne cell-width'>
              {blr2?.Y.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + blr2?.Y_Fond[index] }} > {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[4]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + fob[4][index] }} > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }}>Z</TableCell>
            <TableCell colspan={13} className='ble ligne'>
              {blr2?.Z.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + blr2?.Z_Fond[index], }} > {cell.toString().replace('.', ',')} </TableCell>))}
              {ob[5]?.map((cell, index) => (
                <TableCell align="center" className='ble cell-width' style={{ backgroundColor: '#' + fob[5][index] }} > {cell.toString().replace('.', ',')} </TableCell>))}
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
      <Table aria-label="simple table" style={{ width: "100%",border: '1px solid black'  }} className='tableBE'>
      <TableHead style={{ borderBottom: '1px solid black',width: "100%",border: '1px solid black' }}>
  <TableRow>
    <TableCell
      style={{

        paddingTop: '5px',
        paddingBottom: '0',
        borderBottom: '1px solid black',
        transform: 'translateZ(0)',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
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
        background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
        fontWeight: 'bold',
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
        borderBottom: '1px solid black',
        transform: 'translateZ(0)',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
        fontWeight: 'bold',
      }}
      align="center"
      colSpan={1}
    rowSpan={2}
    >
      <span>Axe</span>
    </TableCell>
      
      
    
  </TableRow>
  <TableCell colSpan={12} style={{ padding: '0px' }} align="center" > 
                <TableRow className="ligne">
    {parBE?.map((cell, index) => (
      <TableCell
  align="center"
  className='ble2 cell-width'
  style={{
    maxWidth: '100px',
    fontSize: 'smaller',
    transform: 'translateZ(0)',
    borderBottom: '1px solid black',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.2))',
    whiteSpace: 'pre-wrap'
  }}
>
  {cell.replace('_', ' ').replace('-', ' ').split(',').map((word, wordIndex) => (
    <React.Fragment key={wordIndex}>
      {word === '2005' && wordIndex !== 0 && <br />}
      {word}
      {wordIndex !== cell.split(',').length - 1 && <br />}
    </React.Fragment>
  ))}
</TableCell>

  
  
    ))}
  </TableRow>
                </TableCell>
 
</TableHead>
 
        <TableBody style={{border: '1px solid black' }}>
          <TableCell rowSpan={3} className='axe rail'>1</TableCell>
          <TableCell style={{ padding: '0px 16px' }} className='axe rail'>X</TableCell>
          <TableCell colSpan={12} className='ble ligne'>
            {ber1?.X.map((cell, index) => (
              <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber1?.X_Fond[index], }}  > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={12} className='ble ligne'>
              {ber1?.Y.map((cell, index) => (
                <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber1?.Y_Fond[index] }} > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={12} className='ble ligne'>
              {ber1?.Z.map((cell, index) => (
                <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber1?.Z_Fond[index] }} > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableCell rowSpan={3} className='axe rail'>2</TableCell>
          <TableCell style={{ padding: '0px 16px' }} className='axe rail'>X</TableCell>
          <TableCell colspan={12} className='ble ligne'>
            {ber2?.X.map((cell, index) => (
              <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber2?.X_Fond[index], }} > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          <TableRow>
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Y</TableCell>
            <TableCell colspan={12} className='ble ligne' >
              {ber2?.Y.map((cell, index) => (
                <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber2?.Y_Fond[index], }}  > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
          </TableRow>
          <TableRow >
            <TableCell style={{ padding: '0px 16px' }} className='axe rail'>Z</TableCell>
            <TableCell colspan={12} className='ble ligne' style={{ whiteSpace: 'nowrap'}}>
              {ber2?.Z.map((cell, index) => (
                <TableCell className='ble cell-width' style={{ backgroundColor: '#' + ber2?.Z_Fond[index], }}  > {cell.toString().replace('.', ',')} </TableCell>))} </TableCell>
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

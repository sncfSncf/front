import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import ToolbarRapport from '../../components/Toolbar'
import Loading from '../../components/Loading'
import image from '../../exemples/images/pdf.png'

export default function Rapports(){
    const [mesPdf, setMesPdf] = useState([])
    const [chargement, setChargement] = useState(false);

    const handleFileClick = (content) => {
        const decodedContent = atob(content)
    
        const byteArray = new Uint8Array(decodedContent.length)
        for (let i = 0; i < decodedContent.length; i++) {
          byteArray[i] = decodedContent.charCodeAt(i)
        }
    
        const blob = new Blob([byteArray], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
      }
      const loadPdf = async () => {
        try {
          setChargement(true)

          const response = await axios.get(`${config.API_URL}/download`)
          setChargement(false)

          if (response.status === 200) {
            const data = response.data
            console.log("data",data);
            setMesPdf(data)
          }
        } catch (error) {
          setChargement(false)

          console.log('Error:', error)
        }
      }
      useEffect(() => {
        loadPdf()
      }, [])
    return(
        <>
        <div className="parent historique" >
            <div className="rapports">
            <p> Journal - Statistique - Rapport</p>
           
            <ToolbarRapport />

{chargement?(<Loading/>):( <div className='rapportsAnTrim'>
          
            <span style={{ display: 'inline-block', width: '30%', marginBottom: '10px', marginTop: '10px', padding: '10px', borderBottom: '1px solid black' }}>
    <h5 style={{ fontWeight: 'bold' }}>Rapports annuels</h5>
  </span>
              {mesPdf?.map((pdf, index) => {
                if (pdf?.name.includes('annuel')) {
                  return (
                    <li
                      key={index}
                      onClick={() => handleFileClick(pdf.content)}
                    >
                     
                    </li>
                  )
                }
                return null
              })}
  <span style={{ display: 'inline-block', width: '30%', marginBottom: '10px', marginTop: '10px', padding: '10px', borderBottom: '1px solid black' }}>
    <h5 style={{ fontWeight: 'bold' }}>Rapports trimestriels</h5>
  </span>
  <span style={{ color: 'blue', cursor: 'pointer' }}>
  {mesPdf?.map((pdf, index) => {
    if (pdf?.name.includes('trimestriel')) {
      return (
        <li
          key={index}
          onClick={() => handleFileClick(pdf.content)}
        >
          
          {pdf.name} &nbsp;&nbsp;<img style={{width:'1.5%',height:'1.5%'}} src={image}></img>
        </li>
      );
    }
    return null;
  })}
</span>

            
            </div>)}

           
            </div>
        </div>
        </>
    )
}
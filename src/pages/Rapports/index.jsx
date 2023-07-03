import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import ToolbarRapport from '../../components/Toolbar'

export default function Rapports(){
    const [mesPdf, setMesPdf] = useState([])
    const handleFileClick = (content) => {
      alert("ok")
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
          const response = await axios.get(`${config.API_URL}/download`)
          if (response.status === 200) {
            const data = response.data
            console.log("data",data);
            setMesPdf(data)
          }
        } catch (error) {
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
            <p>Rapports</p>
           
            <ToolbarRapport />

            <div className='rapportsAnTrim'>
            <h5>Rapports annuels</h5>
              {mesPdf?.map((pdf, index) => {
                if (pdf?.name.includes('annuel')) {
                  return (
                    <li
                      key={index}
                      onClick={() => handleFileClick(pdf.content)}
                    >
                      {pdf.name}
                    </li>
                  )
                }
                return null
              })}
              <h5>Rapports trimestriels</h5>
            <div>
              {mesPdf?.map((pdf, index) => {
                if (pdf?.name.includes('trimestriel')) {
                  return (
                    <li
                      key={index}
                      onClick={() => handleFileClick(pdf.content)}
                    >
                      {pdf.name}
                    </li>
                  )
                }
                return null
              })}
            </div>
            </div>
            </div>
        </div>
        </>
    )
}
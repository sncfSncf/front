import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config";
import ToolbarRapport from '../../components/Toolbar'
import Loading from '../../components/Loading'
import image from '../../exemples/images/pdf2.png'
import {  useHistory } from 'react-router-dom'
export default function Rapports(){
    const [mesPdf, setMesPdf] = useState([])
    const [chargement, setChargement] = useState(false);
    const history = useHistory()

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

          const response = await axios.get(`${config.API_URLV2}/file/download`)
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
      useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      history.push('/')
    }
  }, [history])
  return (
    <>
      <div className="parent historique" >
        <div className="rapports">
          <p> Journal - Statistique - Rapport</p>

          <ToolbarRapport />

          {chargement ? (<Loading />) : (<div className='rapportsAnTrim'>

            <table class="tbrapport" cellSpacing="0" cellPadding="0">
              <tr><th colspan="2">Rapports annuels</th></tr>
              {mesPdf?.map((pdf, index) => {
                if (pdf?.name.includes('annuel')) {
                  return (
                    <tr><td><a target="_blank" href={pdf.content}>{pdf.name}</a></td><td><img width="20px" src={image}></img></td></tr>
                  );
                }
                return null
              })}
            </table>
            <br></br>
            <table class="tbrapport">
              <tr><th colspan="2">Rapports trimestriels</th></tr>
              {mesPdf?.map((pdf, index) => {
                if (pdf?.name.includes('trimestriel')) {
                  return (
                    <tr><td><a target="_blank" href={pdf.content}>{pdf.name}</a></td><td><img width="20px" src={image}></img></td></tr>
                  );
                }
                return null;
              })}
            </table>


          </div>)}


        </div>
      </div>
    </>
  )
}
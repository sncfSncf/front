import React, { useEffect, useRef, useState } from 'react'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import axios from 'axios'
import config from '../../config'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Loading from '../../components/Loading'
import ReactApexChart from 'react-apexcharts';

export default function Chart() {
  const { dateFichier, heureFichier, site } = useParams();
  const [isLoading, setIsLoading] = useState(false);
 // const [diffX, setDiffX] = useState(0)

 let initChart={
  series: [],
  options: {
    chart: {
      id: 'time-series-chart',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        autoSelected: 'pan',
        show: true
      }
    },
    xaxis: {
      type: 'numeric'
    }
  }
}
const [myChart,setMyChart]=useState(initChart)

  async function loadCapteurs() {
    console.log("called");
    setIsLoading(true)
    try {
      const resultat = await axios.get(
        `${config.API_URL}/echantillonage?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`
      );
      setIsLoading(false)
      const capteurs = resultat.data;
      capteurs.forEach((capteur, index) => {
        const data = capteur.contenuFichier.Capteurs[0].X.map((x, index) => ([
           parseFloat(capteur.contenuFichier.Capteurs[0].X[index]),parseFloat(capteur.contenuFichier.Capteurs[0].Y[index]),
        ]))
        initChart.series.push({data:data,name:""})

      });
      setMyChart(initChart)
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  }

  

  useEffect(() => {
    loadCapteurs()
  }, [])
          return(
            <div className='parent historique'>
              {isLoading ? (
          <Loading/>
        ):(
          <ReactApexChart options={myChart?.options} series={myChart?.series} type="line" height={500} width={1000} />
          )}
            </div>
          )
        }
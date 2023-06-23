import React, { useEffect, useRef, useState } from 'react'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import axios from 'axios'
import config from '../../config'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Loading from '../../components/Loading'

export default function Chart() {
  const { dateFichier, heureFichier, site } = useParams();
  const [isLoading, setIsLoading] = useState(false);
 // const [diffX, setDiffX] = useState(0)

  async function loadCapteurs() {
    setIsLoading(true)
    try {
      const resultat = await axios.get(
        `${config.API_URL}/echantillonage?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`
      );
      setIsLoading(false)
      const capteurs = resultat.data;
      const root = document.querySelector('#chartdiv')
      capteurs.forEach((capteur, index) => {
        const div = document.createElement('div')
        const titre = document.createElement('h2')
        titre.textContent=`Le graphe de EV${index+1}`
        titre.style.margin='20px auto'
        root.appendChild(titre)
        div.id = `chartdiv-${index}`
        div.style.width = '100%';
        div.style.height = '400px';
        root.appendChild(div)
        const data = capteur.contenuFichier.Capteurs[0].X.map((x, index) => ({
          valueX: parseFloat(capteur.contenuFichier.Capteurs[0].X[index]), valueY: parseFloat(capteur.contenuFichier.Capteurs[0].Y[index]),
        }))
        createChart(div, data);
      });
    } catch (error) {
      setIsLoading(false)
      console.error(error);
    }
  }

  function createChart(parent, data){
    try {
    
      let root = am5.Root.new(parent.id) 
      root.setThemes([am5themes_Animated.new(root)]) 
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: 'panX',
          wheelY: 'zoomX',
          pinchZoomX: true,
        })
      ) 
  
      let cursor = chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
          behavior: 'none',
        })
      )
  
      cursor.lineY.set('visible', false) 
  
      let xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererX.new(root, {}),
          title: am5.Label.new(root, {
            text: "Temps (ms)",
            fill: am5.color("#000000"),
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 10,
          }),
          rendererOptions: {
            labels: {
              fill: am5.color("#000000"),
              fontWeight: 400,
              fontSize: 12,
            },
          },
        })
      )
  
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {}),
          title: am5.Label.new(root, {
            text: "Tension (V)",
            fill: am5.color("#000000"),
            fontWeight: 600,
            fontSize: 14,
            marginRight: 10,
          }),
          rendererOptions: {
            labels: {
              fill: am5.color("#000000"),
              fontWeight: 400,
              fontSize: 12,
            },
          },
        })
      );

      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Series',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'valueY',
          valueXField: 'valueX',
          tooltip: am5.Tooltip.new(root, {
            labelText: '{valueY}',
          }),
        })
      )

      chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
          orientation: 'horizontal',
        })
      )
      console.log(series.data)
      series.data.setAll(data)
      console.log(series.data)
      series.appear(1000)
      chart.appear(1000, 100)
    } catch (error) {
      console.error(error)
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
              <div id="chartdiv" style={{ width: '100%'}}></div>
        )}
            </div>
          )
        }
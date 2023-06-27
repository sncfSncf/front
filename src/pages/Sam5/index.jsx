import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../../components/Loading';
import ReactApexChart from 'react-apexcharts';

export default function Chart() {
  const { dateFichier, heureFichier, site } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  async function loadCapteurs() {
    setIsLoading(true);
    try {
      const resultat = await axios.get(
        `${config.API_URL}/echantillonage?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`
      );
      const capteurs = resultat.data;
      console.log("resultat.data",resultat.data);
      const seriesData = capteurs.map((capteur,index) => ({
        data: capteur.contenuFichier.Capteurs[0].X.map((x, index) => [
          parseFloat(capteur.contenuFichier.Capteurs[0].X[index]),
          parseFloat(capteur.contenuFichier.Capteurs[0].Y[index]).toFixed(2),
        ]),
        name: 'EV'+(index+1),
      }));
      setChartData({ series: seriesData, options: getChartOptions() });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    loadCapteurs();
  }, []);

  function getChartOptions() {
    return {
      chart: {
        id: 'time-series-chart',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          autoSelected: 'pan',
          show: true,
        },
      },
      xaxis: {
        type: 'numeric',
      },
      stroke: {
        width: 2, // Adjust the width as needed
      },

    };
  }

  return (
    <div className='parent historique'>
      {isLoading ? (
        <Loading />
      ) : (
        chartData && (
          <div style={{ width: '100%'}}>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type='line'
            height='130%'
          />
        </div>
        )
      )}
    </div>
  );
}

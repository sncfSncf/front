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
      const resultat = await axios.get(`${config.API_URLV2}/enveloppes?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`);
      console.log("graph", `${config.API_URLV2}/enveloppes?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`)
      setChartData({ series: resultat.data, options: getChartOptions() });
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
        width: 1, // Adjust the width as needed
      },

    };
  }

  return (
    <div className='parent historique'>
      {isLoading ? (
        <Loading />
      ) : (
        chartData && (
          <div style={{ width: '110%' }}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type='line'
              height='100%'
            />
          </div>
        )
      )}
    </div>
  );
}

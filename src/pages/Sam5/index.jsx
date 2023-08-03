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
  const [seriesVisibility, setSeriesVisibility] = useState([]);

  async function loadCapteurs() {
    setIsLoading(true);
    try {
      const resultat = await axios.get(
        `${config.API_URLV2}/enveloppes?site=${site}&heure=${heureFichier}&dateFichier=${dateFichier}`
      );
      setChartData({ series: resultat.data, options: getChartOptions() });
      setSeriesVisibility(resultat.data.map(() => true)); // Set all series to visible by default
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
        title: {
          text: 'Temps [S]',
          align: 'left',
        },
      },
      yaxis: {
        title: {
          text: 'Tension [V]',
        },
      },
      stroke: {
        width: 1, // Adjust the width as needed
      },
    };
  }

  const handleSeriesVisibilityChange = (index) => {
    const updatedSeriesVisibility = [...seriesVisibility];
    updatedSeriesVisibility[index] = !updatedSeriesVisibility[index];
    setSeriesVisibility(updatedSeriesVisibility);
  };

  return (
    <div className='parent historique'>
      {isLoading ? (
        <Loading />
      ) : (
        chartData && (
          <div style={{ width: '110%' }}>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series.map((serie, index) => ({
                data: serie.data,
                name: serie.name,
                visible: seriesVisibility[index] || true, // Use seriesVisibility to determine visibility
              }))}
              type='line'
              height='100%'
              events={{
                legendClick: (event, chartContext, config) => {
                  const seriesIndex = chartData.series.findIndex((serie) => serie.name === config.seriesName);
                  if (seriesIndex !== -1) {
                    handleSeriesVisibilityChange(seriesIndex);
                  }
                },
              }}
            />
          </div>
        )
      )}
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const GenericGraph = ({ graphData = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);   

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            family: 'Oswald',
          },
          labelRotation: -45,
        },
      },
      y: {
        grid: {
          display: true,
          drawBorder: false,
          color: '#F2F2F2',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        display: true,
        color: 'black',
        font: {
          size: 12,
          family: 'Oswald'
        },
      },
    },
    barPercentage: 0.2,
    categoryPercentage: 1.8,
  };

  // Prepare data for the chart
  const labels = Object.keys(graphData);
  const dataValues = Object.values(graphData);
  const isEmpty = labels.length === 0 || dataValues.length === 0;

  return (
    <div className="w-full h-[400px] lg:px-10 px-2 py-8">
      {isEmpty ? (
        <div className="w-full flex items-center justify-center text-5xl">
          <h1 className='px-20 py-24'>Please Select the Package and Date Range to View Desired Data</h1>
        </div>
      ) : (
        <>
          <Bar
            key={Math.random()}
            ref={chartRef}
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Total Installs',
                  data: dataValues,
                  backgroundColor: '#A9C779',
                  borderColor: "#D9EAD3"
                },
              ],
            }} 
            options={options}
          />
          <p className='text-[#A5A5A5]'>*According to the date range selected above</p>
        </>
      )}
    </div>
  );
};

export default GenericGraph;

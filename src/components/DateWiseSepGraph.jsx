import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

const DateSepGraph = ({ graphData = {} }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);   


  const options = {
    // responsive: true,
    maintainAspectRatio:false,
    
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
      }
    },

    barThickness: 30,
    barPercentage: 0.2,
    categoryPercentage: 1.8,
  };

  // Prepare data for the chart
  const labels = Object.keys(graphData);
  const dataValues = Object.values(graphData);
  const isEmpty = labels.length === 0 || dataValues.length === 0;

  return (
    <div className="w-full h-[400px] flex flex-col items-center justify-center py-4 px-8">
      {isEmpty ? (
        <div className="w-full flex items-center justify-center text-5xl">
            <h1 className='px-20 py-24'>Please Select the Package and Date Range to View Desired Data</h1>
        </div>
      ) : (
        <>
          <Bar
          className='w-full'
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
          <p className='text-[#A5A5A5] my-2'>*According to the date range selected above</p>
        </>
      )}
    </div>
  );
};

export default DateSepGraph;

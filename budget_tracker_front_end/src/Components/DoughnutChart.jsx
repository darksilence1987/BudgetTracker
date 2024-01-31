import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 2000
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
            },
            title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
            },
    }
    },
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Chart.js Pie Chart',
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
        responsiveAnimationDuration: 1,
    },
};

export default function DoughnutChart(props) {
    return <div className="chart">
        <Doughnut options={options} data={props.data} />
    </div>;
}
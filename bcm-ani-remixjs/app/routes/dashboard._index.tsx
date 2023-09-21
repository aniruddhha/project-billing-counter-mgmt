
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const barLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const barData = {
    labels: barLabels,
    datasets: [
        {
            label: 'Dataset 1',
            data: barLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ]
};

export const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


export default function DashboardMain() {
    return (
        <section className="container w-screen h-screen">
            <div className="flex justify-between items-center w-[80%] mt-5">
                <h1 className="text-3xl mx-3 w-[20%]"> Bills </h1>
            </div>
            <div className='flex w-[80%] h-[40%] justify-between mt-5'>
                <div className="flex w-[48%] bg-white justify-center shadow-lg">
                    <Bar options={barOptions} data={barData} />
                </div>
                <div className="flex w-[48%] bg-white justify-center shadow-lg">
                    <Pie options={barOptions} data={pieData} />
                </div>
            </div>
        </section>
    )
}

import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'

import { Bar, Pie } from 'react-chartjs-2'

import { totalMonthwiseSell, totalProductSellPercentage } from '../repository/analytics-repository'
import { useLoaderData } from '@remix-run/react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
)

const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            position : 'top' as const
        },
        title: {
            display: true,
            text: 'Monthly Sell'
        }
    }
}


// const barData = {
//     labels: barLables,
//     datasets : [
//         {
//             label :' lab 1',
//             data: barLables.map( () => Math.floor(Math.random() * 1001)),
//             backgroundColor: `rgba(255, 99, 132, 0.5)`
//         }
//     ]
// }

const pieOptions = {
    responsive: true,
    plugins: {
        legend: {
            position : 'top' as const
        },
        title: {
            display: true,
            text: 'Products Sell'
        }
    }
}

// const pieData = {
//     labels : [ 'Pen', 'Eraser', 'Fruits', 'Mobile', 'Dry-Fruits' ],
//     datasets : [
//         {
//             label : '# of products',
//             data: [12, 300, 20, 4, 56],
//             backgroundColor :[
//                 `red`,
//                 'green',
//                 'blue',
//                 'cadetblue',
//                 'gray'
//             ],
//             borderWidth: 1
//         }
//     ]
// }

export async function loader() {

    const rwSlDt = await totalMonthwiseSell()
    console.log(rwSlDt)
    const barLabels = rwSlDt.map(el => el.month) // convert these numbers to month names
    const barData = { 
        labels : barLabels,
        datasets : [
            {
                label: 'Month',
                data: rwSlDt.map(el => el.totalSell),
                backgroundColor: 'black'
            }
        ]
    }

    const rwPrDt = (await totalProductSellPercentage())[0].items
    console.log(rwPrDt)

    const col = () => Math.floor(Math.random() * 256)

    const pieLabels = rwPrDt.map( (el : any) => el.itemName)
    const pieData = {
        labels: pieLabels,
        datasets: [
            {
                label: '% Sell',
                data: rwPrDt.map( (el: any) => el.percentageSell ),
                backgroundColor: rwPrDt.map( () => `rgb(${col()}, ${col()}, ${col()})`),
                borderWidth: 1
            }
        ]
    }

    return { barData, pieData }
}

export default function DashboardIndex() {

    const { barData, pieData } = useLoaderData<typeof loader>()

    return (
        <section className="container h-[100%]">
          <div className="flex w-[80%] mt-5 ">
            <h1 className="text-3xl ml-3">Analytics</h1>
          </div>
          <div className="flex w-[100%] h-[50%] mt-5 justify-between ml-3">
                <div className="w-[45%] shadow-lg">
                    <Bar options={barOptions} data={barData}/>
                </div>
                <div className="w-[45%] shadow-lg">
                    <Pie options={pieOptions} data={pieData}/>
                </div>
          </div>
        </section>
    )
}
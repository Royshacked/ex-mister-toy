import { Chart as ChartJS, ArcElement, LinearScale, CategoryScale, BarElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { useSelector } from 'react-redux';
import { toyService } from '../services/toy.service.js';
import { loadToys } from "../store/actions/toy.actions.js"
import { useEffect } from 'react';


ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function DashBoard() {
    const toys = useSelector(state => state.toyModule.toys)
    const labels = toyService.getLabels()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadToys()
            } catch (error) {
                console.log(err)
                showErrorMsg('Couldn\'nt load toys')
            }
        }

        fetchData()
    }, [])

    return <section className="dashboard">
        <div>
            <h3>Toys per Label</h3>
            <MyDoughnutChart toys={toys} labels={labels} />
        </div>
        <div>
            <h3>Prices per Label</h3>
            <MyBarChart toys={toys} labels={labels} />
        </div>
    </section>
}

function MyDoughnutChart({ toys, labels }) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Toys',
                data: labels.map(label => toys.reduce((acc, toy) => {
                    if (toy.labels.includes(label)) acc++
                    return acc
                }, 0)),
                backgroundColor: [
                    'red',
                    'gray',
                    'darkslategray',
                    'blue',
                    'yellow',
                    'darkgreen',
                    'cyan',
                    'orange',
                ],
                borderColor: 'white',
                borderWidth: 10,
            },
        ],
    }
    return <Doughnut data={data} />
}

function MyBarChart({ toys, labels }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Prices',
                data: labels.map(label => toys.reduce((acc, toy) => {
                    if (toy.labels.includes(label) && toy.price > acc) acc = toy.price
                    return acc
                }, 0)),
                backgroundColor: 'blue',
            },
        ],
    }
    return <Bar options={options} data={data} />;
}


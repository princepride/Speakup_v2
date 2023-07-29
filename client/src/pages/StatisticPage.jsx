import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './embla.css'
import EmblaCarousel from '../components/EmblaCarousel'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

//Chart.register(...registerables);

function StatisticPage() {
    //const emblaRef = useRef(null);
    //const chartCanvasRefs = useRef([]);
    
    //const chartsData = [
    //    {
    //        type: 'line',
    //        data: {
    //        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //        datasets: [{
    //            label: 'Example Dataset 1',
    //            data: [12, 19, 3, 5, 2, 3, 7],
    //            backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //            borderColor: 'rgba(255, 99, 132, 1)',
    //            borderWidth: 1
    //        }]
    //        },
    //        options: {
    //            scales: {
    //                y: {
    //                beginAtZero: true
    //                }
    //            }
    //        }
    //    },
    //    {
    //        type: 'bar',
    //        data: {
    //            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //            datasets: [{
    //                label: 'Example Dataset 2',
    //                data: [22, 29, 15, 5, 20, 3, 15],
    //                backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //                borderColor: 'rgba(75, 192, 192, 1)',
    //                borderWidth: 1
    //            }]
    //        },
    //        options: {
    //            scales: {
    //                y: {
    //                beginAtZero: true
    //                }
    //            }
    //        }
    //    },
    //// add more chart data objects as necessary
    //];

    //useEffect(() => {
    //    const embla = EmblaCarousel(emblaRef.current, { loop: false });
    //    const charts = chartCanvasRefs.current.map((ref, index) => {
    //        const ctx = ref.getContext('2d');
    //        return new Chart(ctx, chartsData[index]);
    //    });
    //    return () => {
    //    charts.forEach(chart => chart.destroy());
    //    };
    //}, []);

    //return (
    //<div className="embla" ref={emblaRef}>
    //    <div className="embla__viewport">
    //        <div className="embla__container">
    //            {chartsData.map((_, index) => (
    //            <div className="embla__slide" key={index}>
    //                <canvas ref={el => chartCanvasRefs.current[index] = el}></canvas>
    //            </div>
    //            ))}
    //        </div>
    //    </div>
    //</div>
    //);
    return (
        <section className="sandbox__carousel">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    )
}

export default StatisticPage
import React from 'react';
import EmblaCarousel from '../components/EmblaCarousel'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

function StatisticPage() {
    return (
        <section>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    )
}

export default StatisticPage
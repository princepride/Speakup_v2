import React from 'react';
import styled from '@emotion/styled';
import EmblaCarousel from '../components/EmblaCarousel'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 3
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const MainContainer = styled.div`
    width: 96vw;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to right, 
            rgba(255, 255, 255, 1) 0%, 
            rgba(255, 255, 255, 0) 15%, 
            rgba(255, 255, 255, 0) 85%, 
            rgba(255, 255, 255, 1) 100%
        );
        pointer-events: none; 
    }
`

function StatisticPage() {
    return (
        <MainContainer>
        <section>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
        </MainContainer>
    )
}

export default StatisticPage
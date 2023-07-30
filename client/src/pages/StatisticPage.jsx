import React from 'react';
import styled from '@emotion/styled';
import EmblaCarousel from '../components/EmblaCarousel'

const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const MainContainer = styled.div`
    width: 96vw;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

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
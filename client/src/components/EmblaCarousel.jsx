import React, { useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled';
import useEmblaCarousel from 'embla-carousel-react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import EmblaCarouselAutoplay from 'embla-carousel-autoplay'
import '../style/embla.css'
import Chart from '../components/Chart'

const chartData = [
    { type: 'pie', data: [1, 2, 3, 4, 5] },
    { type: 'line', data: [1, 2, 3, 4, 5] },
    { type: 'pie', data: [2, 3, 4, 5, 6] },
    { type: 'pie', data: [4,6,8] },
    { type: 'line', data: [2, 3, 4, 5, 6] }
]

const EmblaPrevButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5%;

    @media screen and (max-width: 1080px) {
        top: 60%;
        left: 2%;
    }
`

const EmblaNextButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 2%;

    @media screen and (max-width: 1080px) {
        top: 60%;
    }
`

const EmblaCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [EmblaCarouselAutoplay()])
    const chartCanvasRefs = useRef([]);

    const onButtonClick = useCallback((emblaApi) => {
        const { autoplay } = emblaApi.plugins()
        if (!autoplay) return
        if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
    }, [])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi, onButtonClick)

    return (
        <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
                {chartData.map((chart, index) => (
                <div className="embla__slide" key={index}>
                <Chart type={chart.type} data={chart.data} />
                </div>
                ))}
            </div>
        </div>

        <div>
            <EmblaPrevButton className="embla__button embla__button--prev">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </EmblaPrevButton>
            <EmblaNextButton className="embla__button embla__button--next">
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </EmblaNextButton>
        </div>
        </div>
    )
}

export default EmblaCarousel
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import EmblaCarouselAutoplay from 'embla-carousel-autoplay'
import image1 from '../images/slide-1.jpg'
import image2 from '../images/slide-2.jpg'
import image3 from '../images/slide-3.jpg'
import image4 from '../images/slide-4.jpg'

export const images = [image1, image2, image3, image4]

const imageByIndex = (index) => images[index % images.length]

const EmblaCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [EmblaCarouselAutoplay()])

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
            {slides.map((index) => (
                <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                    <span>{index + 1}</span>
                </div>
                <img
                    className="embla__slide__img"
                    src={imageByIndex(index)}
                    alt="Your alt text"
                />
                </div>
            ))}
            </div>
        </div>

        <div>
            <div
            className="embla__button embla__button--prev"
            style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                left: '5%'
            }}
            >
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div
            className="embla__button embla__button--next"
            style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '2%'
            }}
            >
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
        </div>
    )
}

export default EmblaCarousel
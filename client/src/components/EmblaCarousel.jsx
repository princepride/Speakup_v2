import React, { useCallback, useState } from 'react'
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
import GitHubActivityGraph from '../components/GitHubActivityGraph'


const ChartContainer1 = styled.div`
    height: 54vh; 
    width: 32vw;
    margin-top:1vh;
    margin-left:1vw;
    margin-right:1vw;
    border: 2px solid #aaa;
    border-radius: 40px;
    overflow: hidden;
`;

const chartData = [
    { type: 'pie', data: [1, 2, 3, 4, 5], title: 'Pie chart of daily exercise categories' },
    { type: 'line', data: [1, 2, 3, 4, 5] },
    { type: 'pie', data: [2, 3, 4, 5, 6] },
    { type: 'pie', data: [4,6,8] },
    { type: 'line', data: [2, 3, 4, 5, 6] }
]

function randomn(n) {
    let rnd = [];
    for (let i = 0; i < n; i++) {
        rnd.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
        count: Math.floor(Math.random() * 4),
        });
    }
    return rnd;
}

const EmblaPrevButton = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2%;
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
    // const [emblaRef, emblaApi] = useEmblaCarousel(options, [EmblaCarouselAutoplay()])
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [date, setDate] = useState(new Date('2023-08-31'))
    const [data,setData] = useState(
        [{
            date:'2023-07-30',
            totalTime:60,
            videos:[
                {
                    videoname:"video1",
                    time:25,
                    paraphraseTime:10,
                    sequeTime:8,
                    zhEnTime:5,
                    conversation:2,
                },
                {
                    videoname:"video2",
                    time:35,
                    paraphraseTime:10,
                    sequeTime:5,
                    zhEnTime:15,
                    conversation:5,
                }
            ]
        },{
            date:'2023-08-31',
            totalTime:45,
            videos:[
                {
                    videoname:"video1",
                    time:45,
                    paraphraseTime:40,
                    sequeTime:0,
                    zhEnTime:5,
                    conversation:0,
                },
            ]
        }]);

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
                <div className="embla__slide">
                    {/*<GitHubActivityGraph values={randomn(365)} />*/}
                    <GitHubActivityGraph values={data.map(item=>({date: new Date(item.date),count:Math.ceil(item.totalTime/15)}))} setDate={setDate}/>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <ChartContainer1>
                            <Chart type={chartData[0].type} data={chartData[0].data} title='Pie chart of daily exercise categories'/>
                        </ChartContainer1>
                        <ChartContainer1>
                            <Chart type={chartData[1].type} data={chartData[1].data}/>
                        </ChartContainer1>
                    </div>
                </div>
                <div className="embla__slide">
                </div>
                <div className="embla__slide">
                </div>
                {/*{chartData.map((chart, index) => (
                <div className="embla__slide" key={index}>
                <Chart type={chart.type} data={chart.data}/>
                </div>
                ))}*/}
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
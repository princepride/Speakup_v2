import React, { useCallback, useEffect, useState } from 'react'
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
import {dateFormat} from '../utils/timeConvert'
import { getStatistic } from '../utils/connect.js'


const ChartContainer1 = styled.div`
    height: 56vh; 
    width: 36vw;
    margin-top:1vh;
    margin-left:1vw;
    margin-right:1vw;
    border: 2px solid #aaa;
    border-radius: 40px;
    overflow: hidden;
`;
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

    const [data,setData] = useState([]);

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const StatisticData = await getStatistic();
                console.log(StatisticData)
                setData(StatisticData.data);
                console.log(data)
            } catch(error) {
                console.error(error);
            }
        };
        fetchStatisticData();
    }, []);

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

    let currentData = data.filter(item => item.date === dateFormat(date));
    let pieData = currentData.length > 0 ? currentData[0].videos.map(item => ({name:item.videoname, y:item.time})) : [];
    let barData = currentData.length > 0 ? currentData[0].videos.map(item => (item.data)) : [];
    let categories = currentData.length > 0 ? currentData[0].categories : [];
    let seriesNames = currentData.length > 0 ? currentData[0].videos.map(item => (item.videoname)) : [];

    return (

        <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">
                    <GitHubActivityGraph values={data.map(item=>({date: new Date(item.date),count:Math.ceil(item.totalTime/15)}))} setDate={setDate}/>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <ChartContainer1>
                            <Chart 
                                type="pie" 
                                data = {[pieData]}
                                title='Pie chart of daily practice categories'
                                seriesNames={['Series 1']} 
                            />
                        </ChartContainer1>
                        <ChartContainer1>
                            <Chart 
                                type="bar" 
                                data={barData} 
                                categories={categories} 
                                seriesNames={seriesNames} 
                                yAxisTitle="Practice times"
                                title='Bar chart of daily practice categories'
                            />
                        </ChartContainer1>
                    </div>
                </div>
                <div className="embla__slide">
                </div>
                <div className="embla__slide">
                </div>
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
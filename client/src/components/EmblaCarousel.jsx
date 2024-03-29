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
import { calculateExpEn } from '../utils/algorithm'
import ProgressBar from '../components/ProgressBar'
import { useStateContext } from '../contexts/ContextProvider';

const StyledChartGroup = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 1080px) {
    flex-direction: column;
    }
`

const StyledSummaryGroup = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 1080px) {
    flex-direction: column;
    }
`

const UserCardContainer = styled.div`
    height: 38vh; 
    margin-top:1vh;
    margin-left:1vw;
    margin-right:1vw;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    @media (max-width: 1080px) {
        height: 20vh; 
    }
`

const SummaryContainer = styled.div`
    height: 38vh; 
    width: 36vw;
    margin-top:2vh;
    margin-left:1vw;
    margin-right:1vw;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    @media (max-width: 1080px) {
        height: 20vh; 
        width: 100%;
    }
`
const ImageContainer = styled.div`
    height: 80vh; 
    border-radius: 40px;
    overflow: hidden;
    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const TopDiv = styled.div`
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
`

const BottomDiv = styled.div`
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const ChartContainer = styled.div`
    height: 56vh; 
    width: 36vw;
    margin-top:1vh;
    margin-left:1vw;
    margin-right:1vw;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    @media (max-width: 1080px) {
        height: 24vh; 
        width: 64vw;
    }
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
`
const TextStyle = styled.div`
    background-image: linear-gradient(90deg,#2e4f8b 0%,#3e589d 35%,#8f619b 60%,#d0718f 70%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent
`

const EmblaCarousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [EmblaCarouselAutoplay()])
    const [date, setDate] = useState(new Date())
    const { userId } = useStateContext();
    const [data,setData] = useState([]);
    const [extraExp, setExtraExp] = useState(0);

    useEffect(() => {
        const fetchStatisticData = async () => {
            try {
                const StatisticData = await getStatistic(userId);
                setData(StatisticData.data);
                setExtraExp(StatisticData.extraExp);
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

    const sumExp = (data, extraExp) => {
        return data.reduce((total, item) => total + item.totalDuration, 0) + extraExp;
    }

    let currentData = data.filter(item => item.date === dateFormat(date));
    let pieData = currentData.length > 0 ? currentData[0].videonames.map((item,index) => ({name:item, y:currentData[0].duration[index]})) : [];
    let barData = currentData.length > 0 ? currentData[0].specificDuration : [];
    let categories = currentData.length > 0 ? currentData[0].categories : [];
    let seriesNames = currentData.length > 0 ? currentData[0].videonames : [];

    let totalExp = sumExp(data, extraExp);

    const totalDuration = (data) => {
        const totalDurationMinutes = data.reduce((total, item) => total + item.totalDuration, 0);

        // Convert total duration to "xx h xx min" format
        const hours = Math.floor(totalDurationMinutes / 60);
        const minutes = totalDurationMinutes % 60;

        const formattedDuration = `${hours} h ${minutes} min`;
        return formattedDuration
    }
    return (

        <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">
                    <UserCardContainer>
                        <TopDiv>
                            <TextStyle>Title: {calculateExpEn(totalExp).title}</TextStyle>
                        </TopDiv>
                        <ProgressBar completed={totalExp} total={calculateExpEn(totalExp).expNeed} unit="EXP"/>
                    </UserCardContainer>
                    <StyledSummaryGroup>
                        <SummaryContainer>
                        <TopDiv>
                            <TextStyle>{totalDuration(data)}</TextStyle>
                        </TopDiv>
                        <BottomDiv>
                            <TextStyle>Total Active Time</TextStyle>
                        </BottomDiv>
                        </SummaryContainer>
                        <SummaryContainer>
                            <TopDiv>
                                <TextStyle>{data.length} Day</TextStyle>
                            </TopDiv>
                            <BottomDiv>
                                <TextStyle>Total Active Days</TextStyle>
                            </BottomDiv>
                        </SummaryContainer>
                    </StyledSummaryGroup>
                </div>
                <div className="embla__slide">
                    <GitHubActivityGraph values={data.map(item=>({date: new Date(item.date),totalDuration:item.totalDuration}))} setDate={setDate}/>
                    <StyledChartGroup>
                        <ChartContainer>
                            <Chart 
                                type="pie" 
                                data = {[pieData]}
                                title='Pie chart of daily practice categories'
                                seriesNames={[""]} 
                            />
                        </ChartContainer>
                        <ChartContainer>
                            <Chart 
                                type="bar" 
                                data={barData} 
                                categories={categories} 
                                seriesNames={seriesNames} 
                                yAxisTitle="Practice times"
                                title='Bar chart of daily practice categories'
                            />
                        </ChartContainer>
                    </StyledChartGroup>
                </div>
                <div className="embla__slide">
                    <ImageContainer>
                    <img src="https://i.hexuexiao.cn/up/01/2d/40/2e5974a878e6d2e3bceaa6d0d4402d01.jpg"></img>
                    </ImageContainer>
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
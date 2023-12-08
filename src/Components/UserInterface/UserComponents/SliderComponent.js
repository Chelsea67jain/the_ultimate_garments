import React, { createRef, useEffect } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL } from "../../Services/NodeServices";


export default function SliderComponent(props) {
    var mySlider = createRef();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    const setImageInSlider = () => {
        return props.images.map((item) => {
            return (<div>
                <img src={`${ServerURL}/images/${item}`} width='100%' />
            </div>)
        })
    }

    const handleBack = () => {
        mySlider.current.slickPrev();

    }

    const handleForward = () => {
        mySlider.current.slickNext();
    }

    return (
        <>


            <div>

                <div style={{ width: '100%' }}>

                    {matches ? <></> :
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#000', width: 40, height: 40, position: 'absolute', left: 10, top: '50%', zIndex: 1, borderRadius: 20 }}>
                            <ArrowBackIosNewIcon style={{ color: '#fff' }} onClick={() => handleBack()} />
                        </div>
                    }
                    <Slider {...(props).bannerSettings} ref={mySlider}>
                        {setImageInSlider()}
                    </Slider>
                    {matches ? <></> :
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#000', width: 40, height: 40, position: 'absolute', left: '96%', top: '50%', zIndex: 1, borderRadius: 20 }}>
                            <ArrowForwardIosIcon style={{ color: '#fff' }} onClick={() => handleForward()} />
                        </div>
                    }
                </div>

            </div>
        </>
    )

}
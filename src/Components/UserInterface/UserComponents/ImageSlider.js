import React,{createRef} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { ServerURL } from "../../Services/NodeServices";


export default function ProductDetailsPictures(props){
   var mySlider=createRef();
   
  const setProductPicturesInSlider=()=>{
    console.log(props.images)
    return props.images.map((item)=>{
        
        return (
            <div>
                <img src={`${ServerURL}/images/${item}`} width="100%"  />
            </div>
        )
    })
  }
  
    return(
        <div style={{width:'40%',marginLeft:10}}>
       <Slider {...(props.bannerSettings)} ref={mySlider} >
       {setProductPicturesInSlider()}
       </Slider>
        </div>
    )
}


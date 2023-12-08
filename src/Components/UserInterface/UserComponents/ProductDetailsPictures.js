import { useEffect, useState } from "react";
import { postData } from "../../Services/NodeServices";
import { ServerURL } from "../../Services/NodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ImageSlider(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [images, setImages] = useState([])

    const fetchProductImages = async () => {
        var body = { 'productid': props.productid }

        const result = await postData('products/fetch_all_images_of_products', body)

        // var images=result.data[0].productimages
        if (Array.isArray(result.data[0].productimages)) {
            // alert(true)
        }
        if (Array.isArray(JSON.parse(result.data[0].productimages))) {
            // alert(true)
        }
        else {
            // alert(false)
        }
        setImages(JSON.parse(result.data[0].productimages));
        
        // alert(JSON.parse(result.data[0].productimages))
        // alert(images)
        // alert(Object.values(result.data))
    }


    useEffect(function () {
        fetchProductImages();
    }, [])

    const showProductImages = () => {
        //alert(props.images)//["7e6d33bd-8f24-4d55-b0a9-171f06189289a6edfcf4-88ef-415d-ab07-bd63575834aeThe Boss.jpg","dee119de-786e-4ee1-9d81-fc75dbc37ed8OIP (4).jpg","8260d784-730b-41d4-bd32-71af940d47b3The Boss.jpg","af371a24-2141-478c-ac52-5c76cfa8d0f2The Boss-2.jpg","3b628852-fcf5-430d-a0fd-a782c9cea49cThe Real Boss.jpg"]
        // console.log(images)
        // console.log(Object.values(images))
        props.onChange(images)
       
       return images.map((item) => {
        
            return (
                matches?<></>:
               <div>

                    <img src={`${ServerURL}/images/${item}`} width="90" />
                </div> 
                
            )
        
        });
    
    }


    return (

        <div style={{ display: 'flex', flexDirection: 'column' }} >

          
            {showProductImages() } 
       
        </div>
      
    )
}
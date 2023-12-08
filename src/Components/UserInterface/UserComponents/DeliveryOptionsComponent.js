import React from "react"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function DeliveryOptionsComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
{matches?
        <div style={{ border: '1px #d1ccc0 solid', width: '100%' }}>
         
            <div style={{ fontSize: 15, margin: 10 }}>
                Enter your Pincode to check the delivery time <br/>  and free pick up options
            </div>

            <div style={{width:'100%',fontSize: 15, margin: 10 }}>
                <input type="text" placeholder="Enter Pincode"></input>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 500, fontSize: 15, margin: 10 }}>
                <img src='./cod.jpg' width="20" /> Cash on Delivery
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 500, fontSize: 15, margin: 10 }}>
                <img src='./ship.jpg' width="20" /> Express Shipping
            </div>
         </div>
        :
        <div style={{ border: '1px #d1ccc0 solid', width: 510, height: 150 }}>
         
        <div style={{ fontSize: 15, margin: 10 }}>
            Enter your Pincode to check the delivery time and free pick up options
        </div>
        <div style={{ fontSize: 15, margin: 10 }}>
            <input type="text" placeholder="Enter Pincode"></input>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 500, fontSize: 15, margin: 10 }}>
            <img src='./cod.jpg' width="20" /> Cash on Delivery
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 500, fontSize: 15, margin: 10 }}>
            <img src='./ship.jpg' width="20" /> Express Shipping
        </div>
     </div>
     }
        </> 
    )
}
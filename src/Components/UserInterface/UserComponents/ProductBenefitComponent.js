import React from "react"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductBenefitComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <>
            {matches ?
                <div style={{ margin:20, background: "#fff", width:'80%', height: 300, paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <div style={{ padding:10,display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20}}>
                        <img src='india.png' width="100" />
                       Home Grown Brand
                    </div>

                    <div style={{padding:10,display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20}}>
                        <img src='best-seller.png' width="100" />
                       100% Quality Assured
                    </div>

                    <div style={{ padding:10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20}}>
                        <img src='shield.png' width="100"  />
                       100% Secure Payments
                    </div>
                </div>
                :
                <div style={{ margin: 100, background: "#fff", width:'80%', height: 300, paddingLeft: '50px', paddingRight: '50px',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='india.png' width="60" />
                        Home Grown Brand
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='best-seller.png' width="60" />
                        100% Quality Assured
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='shield.png' width="60" />
                        100% Secure Payments
                    </div>
                </div>

            }

        </>
    )
}
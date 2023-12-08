import { propsToClassKey } from "@mui/styles"
import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ThreeCardComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    

    return (
        props.data.map((item) => {

            return (
                <>
                    {matches ?
                        <div style={{ margin: 5, padding: 2, position: 'relative', width: '97%', height: 600 }}>

                            <img src={`${ServerURL}/images/${item.picture}`} style={{ width: '100%', height: "100%" }} />
                            <div style={{ width: 220, display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, color: '#fff', position: 'absolute', transform: 'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1 }}>
                                {item.productname}
                            </div>
                        </div>
                        :
                        <div style={{ margin: 5, padding: 2, position: 'relative', width: 338, height: 400 }}>

                            <img src={`${ServerURL}/images/${item.picture}`} style={{ width: '100%', height: "100%" }} />
                            <div style={{ width: 220, display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 18, color: '#fff', position: 'absolute', transform: 'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1 }}>
                                {item.productname}
                            </div>
                        </div>
                    }
                </>
            )
        })
    )

}
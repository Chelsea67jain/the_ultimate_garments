import { propsToClassKey } from "@mui/styles"
import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"


export default function TwoCardComponent(props) {

    return (
        props.data.map((item) => {

            return (

                <div style={{margin:5,padding:2,position: 'relative',width:520,height:450}}>
                    
                        <img src={`${ServerURL}/images/${item.picture}`} style={{width:'100%',height:"100%"}} />
                    <div style={{ width:220,display:'flex',justifyContent:'center',fontWeight: 'bold', fontSize:18, color: '#000',position: 'absolute',transform:'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1}}>
                        {item.productname}
                    </div>
                </div>
            )
        })
    )

}
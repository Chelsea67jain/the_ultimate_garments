import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"
import { useNavigate } from "react-router"

export default function OneCardComponent(props) {
    var navigate = useNavigate();

    const handleClick = (scid, icon) => {
        navigate(`/${props.url}/${scid}/${icon}`)

    }

    return (
        props.data.map((item) => {

            return (

                <div onClick={() => handleClick(item.subcategoryid, item.icon)} style={{ margin: 2, padding: 2, position: 'relative', width: '97%', height: 'auto' }}>

                    <img src={`${ServerURL}/images/${item.icon}`} style={{ width: '100%', height: "100%" }} />
                    {/* <div style={{ width:220,display:'flex',justifyContent:'center',fontWeight: 'bold', fontSize:18, color: '#000',position: 'absolute',transform:'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1}}>
                        {item.productname}
                    </div> */}
                </div>
            )
        })
    )

}
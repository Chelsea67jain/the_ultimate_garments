import React, { useState, useEffect } from "react"
import { ServerURL } from "../../Services/NodeServices"
import FilterComponent from "./FilterComponent"
import { useNavigate } from "react-router"

export default function ProductListComponent(props) {
    var navigate = useNavigate();

    const handleProductDetails = (item) => {
        console.log(JSON.stringify(item));
        navigate('/productdetails', { state: { product: JSON.stringify(item) } })
        
    }

    return (
        props.data.map((item) => {

            return (
                <div onClick={() => handleProductDetails(item)} style={{ margin: 5, padding: 4, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ margin: 2, position: 'relative',marginTop:60, width: 250, height: 'auto' }}>

                        <img src={`${ServerURL}/images/${item.picture}`} style={{ width: '100%', height: "100%", display: "flex", flexWrap: 'wrap' }} />
                        <div style={{ width: 160, display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 15, color: '#fff', position: 'absolute', transform: 'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1 }}>
                            {item.description}
                        </div>
                        <div style={{ fontWeight: 600, color: '#000', marginTop: 4, fontSize: 20 }}>
                            {item.productname}
                        </div>
                        <div >

                            {item.offerprice > 0 ? <><span style={{ color: 'green' }}>&#8377;{item.offerprice}</span><span style={{ textDecoration: 'line-through', color: 'red', marginLeft: 4 }}>&#8377;{item.price}</span><span style={{ color: 'blue', marginLeft: 4 }}>You Save:<span style={{ marginLeft: 4 }}>&#8377;{item.price - item.offerprice}</span></span></> : <></>}
                        </div>
                    </div>
          
                </div>

            )
        })
    )

}
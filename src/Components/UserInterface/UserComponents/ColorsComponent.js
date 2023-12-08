import React, { useState } from "react"
import { useStyles } from "./ColorsComponentCss"

export default function ColorsComponent(props) {

    var classes = useStyles();

    const [color, setColor] = useState('')



    const handleColorName = (color) => {

        setColor(color)
        props.onChange(color)
        
    }



    const showColors = () => {



        return Object.keys(props.data).map((item) => {

            return (<div onClick={() => handleColorName(item)} className={classes.borderShadow} style={{ width: '40px', height: '40px', borderRadius: '20px', background: `${item}` }}>

            </div>
            )
        })
    }

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '25%', fontWeight: 600, fontSize: 18, textTransform: 'capitalize' }}>
                Colors:<span style={{ fontWeight: 400 }}>{color}</span>
            </div>

            <div style={{ display: 'flex', width: '190px', margin: 5, justifyContent: 'space-between', flexDirection: 'row' }}>

                {props.data == null ? <>Pls Select Size...</> : showColors()}
            </div>
        </>
    )
}
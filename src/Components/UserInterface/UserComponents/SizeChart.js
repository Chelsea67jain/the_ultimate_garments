import React, { useState } from "react"
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from "@mui/material";


var drawerWidth = 500
const useStyles = makeStyles({

    paper: {
        width: 240,
        height: 240,
        background: '#000'
    }
})

export default function SizeChart(props) {
    var classes = useStyles();

   

    const [open, setOpen] = useState(false)

    const openDrawer = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const showListItems = () => {
        return (
          
            <div >
                
                <div style={{ marginTop: 20, marginLeft: 180, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'center', borderBottom: '2px solid #00a8ff', width: 100 }} >
                    SIZE GUIDE
                </div>
                <div style={{ margin: 10, textTransform: 'uppercase' }} >
                    <Grid container spacing={2} style={{ marginTop: 20, fontWeight: 'bold', paddingBottom: 20, marginLeft: 20, background: "#dfe6e9", borderRadius: 20, width: '90%' }} >

                        <Grid item xs={3}>
                            Size
                        </Grid>
                        <Grid item xs={3}>
                            Chest
                        </Grid>
                        <Grid item xs={3}>
                            Length
                        </Grid>
                        <Grid item xs={3}>
                            Shoulder
                        </Grid>

                    </Grid>
                    <Grid container spacing={2} style={{ fontWeight: 500, marginTop: 1, paddingBottom: 2, marginLeft: 30, width: '90%' }}>
                        <Grid item xs={3}>
                            S
                        </Grid>
                        <Grid item xs={3}>
                            38
                        </Grid>
                        <Grid item xs={3}>
                            28
                        </Grid>
                        <Grid item xs={3}>
                            17
                        </Grid>


                    </Grid>
                    <Divider />

                    <Grid container spacing={2} style={{ fontWeight: 500, marginTop: 1, paddingBottom: 2, marginLeft: 30, width: '90%' }}>
                        <Grid item xs={3}>
                            M
                        </Grid>
                        <Grid item xs={3}>
                            40
                        </Grid>
                        <Grid item xs={3}>
                            27
                        </Grid>
                        <Grid item xs={3}>
                            18
                        </Grid>


                    </Grid>
                    <Divider />

                    <Grid container spacing={2} style={{ fontWeight: 500, marginTop: 1, paddingBottom: 2, marginLeft: 30, width: '90%' }}>
                        <Grid item xs={3}>
                            L
                        </Grid>
                        <Grid item xs={3}>
                            42
                        </Grid>
                        <Grid item xs={3}>
                            28
                        </Grid>
                        <Grid item xs={3}>
                            19
                        </Grid>


                    </Grid>
                    <Divider />

                    <Grid container spacing={2} style={{ fontWeight: 500, marginTop: 1, paddingBottom: 2, marginLeft: 30, width: '90%' }}>
                        <Grid item xs={3}>
                            XL
                        </Grid>
                        <Grid item xs={3}>
                            44
                        </Grid>
                        <Grid item xs={3}>
                            29
                        </Grid>
                        <Grid item xs={3}>
                            20
                        </Grid>
                    </Grid>
                    <Divider />

                    <Grid container spacing={2} style={{ fontWeight: 500, marginTop: 1, paddingBottom: 2, marginLeft: 30, width: '90%' }}>
                        <Grid item xs={3}>
                            XXL
                        </Grid>
                        <Grid item xs={3}>
                            46
                        </Grid>
                        <Grid item xs={3}>
                            30
                        </Grid>
                        <Grid item xs={3}>
                            21
                        </Grid>
                    </Grid>
                    <Divider />


                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginTop: 15, textAlign: 'center' }}>
                    All measurements of the garment are (In Inch)
                </div>
                <div>
                    <img src="./sizeChartImage.png" width="450" />
                </div>
                <div style={{ marginTop: 20, marginLeft: 20, fontSize: 18, fontWeight: 'bold', display: 'flex', justifyContent: 'center', borderBottom: '2px solid #00a8ff', width: 150 }} >
                    How To Measure:
                </div>

                <div style={{ margin: 20}}>

                    <div style={{ fontWeight: 650, fontSize: 15 }}>
                        Not sure about couple t-shirt size? Follow the below instructions:
                        </div>
                    <div style={{fontSize: 14}}>
                        <ul>
                            <li>Keep your body relaxed to get precise dimensions.</li>
                            <li><span style={{ fontWeight: 650}}>Chest/Bust:</span>
                                Measure from under arms around the chest/bust.</li>
                            <li><span style={{ fontWeight: 650}}>Shoulder:</span>
                                Measure from the left shoulder tip to the right shoulder tip.</li>
                            <li><span style={{ fontWeight: 650}}>Length:</span>
                                Measure from highest point of the shoulder to bottom edge.</li>
                            <li>P.S. Our couple t-shirt(s) are Regular Fit – not too tight, not too loose.</li>
                            <li>Sizes may vary by +/- 0.5 Inches</li>
                        </ul>
                    </div>
                </div>
    
            </div>
   
        )
    }

    return (
        <div >
            <Button onClick={() => openDrawer()} >Size Chart</Button>
            <div >

                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="temporary"
                    anchor="right"

                    open={open}
                    onClose={() => handleClose()}


                >
                    {showListItems()}
                </Drawer>

            </div>
        </div>
    )
}
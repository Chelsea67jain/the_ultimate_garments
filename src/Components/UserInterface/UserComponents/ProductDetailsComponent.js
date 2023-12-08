import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductDetailsComponent(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false)

    const handleReadMore = () => {
        setOpen(true)
    }

    const handleReadLess = () => {
        setOpen(false)
    }

    return (
        <>
            {matches ?
                <div style={{ marginLeft: 50, marginRight: 50 }}>
                    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'column',flexWrap:'wrap' }}>

                        <Grid item xs={12} style={{ fontSize: 30, fontWeight: 600, margin: 10 }}>
                            Product Details
                        </Grid>

                        <Grid item xs={12} style={{ background: '#f1f2f6', padding: 10, marginRight: 5,marginBottom:20 }}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Product Highlights
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                    <div>
                                        Fabric	<span style={{ fontWeight: 400, margin: 34 }}>Bio-washed Cotton</span>
                                    </div>

                                    <div>
                                        Neck		<span style={{ fontWeight: 400, margin: 40 }}>Round Neck</span>
                                    </div>

                                    <div>
                                        Pattern	<span style={{ fontWeight: 400, margin: 25 }}>Printed	</span>
                                    </div>

                                    <div>
                                        Sleeve	<span style={{ fontWeight: 400, margin: 30 }}>Half-sleeves</span>
                                    </div>

                                    <div>
                                        Fit		<span style={{ fontWeight: 400, margin: 58 }}>Regular-fit</span>
                                    </div>
                                    <div>
                                        Style	<span style={{ fontWeight: 400, margin: 40 }}>Casual Wear </span>
                                    </div>


                                </div>


                            </div>
                        </Grid>

                        <Grid item xs={12} style={{ background: '#f1f2f6', padding: 10, marginRight: 5 ,marginBottom:20}}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Product Description
                                </div>

                                <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>

                                    <div>
                                        <span > 100% Bio-washed Cotton – makes the fabric extra soft & silky	</span>
                                    </div>

                                    <div>
                                        <span >Flexible ribbed crew neck</span>
                                    </div>

                                    <div>
                                        <span >Precisely stitched with no pilling & no fading</span>
                                    </div>

                                    <div>
                                        <span >Provide all-time comfort. Anytime, anywhere</span>
                                    </div>

                                    <div>
                                        <span >Infinite range of matte-finish HD prints</span>
                                    </div>
                                    <div>
                                        {open ? <></> : <span onClick={() => handleReadMore()} style={{ fontWeight: 400, margin: 10, color: '#48dbfb' }}>Read More </span>}
                                    </div>



                                </div>

                                {open ?
                                    <div style={{ fontWeight: 600 }}>
                                        <div >
                                            Size & Fit:
                                        </div>
                                        <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>
                                            <div>
                                                <span> Every T-shirt is tailored with regular fit over years of testing.</span>

                                            </div>
                                            <div>
                                                <span>Please refer to the size chart for more accuracy.</span>
                                            </div>

                                        </div>

                                        <div >
                                            Wash Care:
                                        </div>
                                        <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>
                                            <div>
                                                <span> Cold and gentle machine wash</span>
                                            </div>

                                            <div>
                                                <span>Avoid using brushes</span>
                                            </div>

                                            <div>
                                                <span>Dry in shade</span>
                                            </div>

                                            <div>
                                                <span>Use mild detergent only</span>
                                            </div>

                                            <div>
                                                <span onClick={() => handleReadLess()} style={{ fontWeight: 400, margin: 10, color: '#48dbfb' }}>Read Less </span>
                                            </div>

                                        </div>
                                    </div>

                                    : <></>}


                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ background: '#f1f2f6', padding: 10 }}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Delivery & Return Policy
                                </div>

                                <div style={{ fontWeight: 400, marginTop: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    We provide free shipping on all orders.Pay online to
                                    avoid charges of ₹50/product applicable on COD orders.
                                    The return or exchange can be done within 15 days after
                                    delivery.Every delivery from the ultimate garments is processed
                                    under excellent condition and in the fastest time possible.For our beloved customer’s care,
                                    we give contactless delivery. Refer to FAQ for more information


                                </div>


                            </div>
                        </Grid>
                    </Grid>
                </div>
                :
                <div style={{ marginLeft: 150, marginRight: 30 }}>
                    <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>

                        <Grid item xs={12} style={{ fontSize: 30, fontWeight: 600, margin: 10 }}>
                            Product Details
                        </Grid>

                        <Grid item xs={4} style={{ background: '#f1f2f6', padding: 10, marginRight: 5 }}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Product Highlights
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>

                                    <p>
                                        Fabric	<span style={{ fontWeight: 400, margin: 34 }}>Bio-washed Cotton</span>
                                    </p>

                                    <p>
                                        Neck		<span style={{ fontWeight: 400, margin: 40 }}>Round Neck</span>
                                    </p>

                                    <p>
                                        Pattern	<span style={{ fontWeight: 400, margin: 25 }}>Printed	</span>
                                    </p>

                                    <p>
                                        Sleeve	<span style={{ fontWeight: 400, margin: 30 }}>Half-sleeves</span>
                                    </p>

                                    <p>
                                        Fit		<span style={{ fontWeight: 400, margin: 58 }}>Regular-fit</span>
                                    </p>
                                    <p>
                                        Style	<span style={{ fontWeight: 400, margin: 40 }}>Casual Wear </span>
                                    </p>


                                </div>


                            </div>
                        </Grid>

                        <Grid item xs={4} style={{ background: '#f1f2f6', padding: 10, marginRight: 5 }}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Product Description
                                </div>

                                <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>

                                    <p>
                                        <span > 100% Bio-washed Cotton – makes the fabric extra soft & silky	</span>
                                    </p>

                                    <p>
                                        <span >Flexible ribbed crew neck</span>
                                    </p>

                                    <p>
                                        <span >Precisely stitched with no pilling & no fading</span>
                                    </p>

                                    <p>
                                        <span >Provide all-time comfort. Anytime, anywhere</span>
                                    </p>

                                    <p>
                                        <span >Infinite range of matte-finish HD prints</span>
                                    </p>
                                    <p>
                                        {open ? <></> : <span onClick={() => handleReadMore()} style={{ fontWeight: 400, margin: 10, color: '#48dbfb' }}>Read More </span>}
                                    </p>



                                </div>

                                {open ?
                                    <div style={{ fontWeight: 600 }}>
                                        <div >
                                            Size & Fit:
                                        </div>
                                        <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>
                                            <p>
                                                <span> Every T-shirt is tailored with regular fit over years of testing.</span>

                                            </p>
                                            <p>
                                                <span>Please refer to the size chart for more accuracy.</span>
                                            </p>

                                        </div>

                                        <div >
                                            Wash Care:
                                        </div>
                                        <div style={{ fontWeight: 400, display: 'flex', flexDirection: 'column' }}>
                                            <p>
                                                <span> Cold and gentle machine wash</span>
                                            </p>

                                            <p>
                                                <span>Avoid using brushes</span>
                                            </p>

                                            <p>
                                                <span>Dry in shade</span>
                                            </p>

                                            <p>
                                                <span>Use mild detergent only</span>
                                            </p>
                                            <p>
                                                <span onClick={() => handleReadLess()} style={{ fontWeight: 400, margin: 10, color: '#48dbfb' }}>Read Less </span>
                                            </p>

                                        </div>
                                    </div>


                                    : <></>}


                            </div>
                        </Grid>
                        <Grid item xs={3} style={{ background: '#f1f2f6', padding: 10 }}>
                            <div style={{ fontWeight: 600 }}>
                                <div >
                                    Delivery & Return Policy
                                </div>

                                <div style={{ fontWeight: 400, marginTop: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                    We provide free shipping on all orders.Pay online to
                                    avoid charges of ₹50/product applicable on COD orders.
                                    The return or exchange can be done within 15 days after
                                    delivery.Every delivery from the ultimate garments is processed
                                    under excellent condition and in the fastest time possible.For our beloved customer’s care,
                                    we give contactless delivery. Refer to FAQ for more information


                                </div>


                            </div>
                        </Grid>
                    </Grid>

                </div>

            }

            {matches ?

                <div style={{ fontSize: 15, margin: 50, width: '88%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 10, height: 120, width: 400 }}>
                        <img src='./1_million_user.jpg' width="60" />
                        Happy Customers
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 120, width: 400 }}>
                        <img src='made_in_india.jpg' width="60" />
                        Made in India
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 120, width: 400 }}>
                        <img src='safe_packaging.jpg' width="60" />
                        Packed with Safety
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 120, width: 400 }}>
                        <img src='easy_return_policy.jpg' width="60" />
                        Easy Replacement
                    </div>

                </div>
                : <div style={{ margin: 100, paddingLeft: '60px', paddingRight: '50px', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='./1_million_user.jpg' width="60" />
                        Happy Customers
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='made_in_india.jpg' width="60" />
                        Made in India
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='safe_packaging.jpg' width="60" />
                        Packed with Safety
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '2px #d1ccc0 solid', marginRight: 20, height: 200, width: 300 }}>
                        <img src='easy_return_policy.jpg' width="60" />
                        Easy Replacement
                    </div>

                </div>
            }

        </>




    )
}
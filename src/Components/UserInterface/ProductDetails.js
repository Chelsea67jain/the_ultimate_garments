import React, { createRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SearchBar from "./UserComponents/SearchBar";
import MainBar from "./UserComponents/MainBar";
import Footer from "./UserComponents/Footer";
import { ServerURL, postData } from "../Services/NodeServices"
import ProductDetailsPictures from "./UserComponents/ProductDetailsPictures";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { circularProgressClasses, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useStyles } from "./ProductDetailsCss"
import ProductDetailsComponent from "./UserComponents/ProductDetailsComponent";
import { useLocation, useNavigate } from "react-router";
import SizeChart from "./UserComponents/SizeChart";
import PlusMinusComponent from "./UserComponents/PlusMinusComponent";
import ColorsComponent from "./UserComponents/ColorsComponent";
import { useDispatch, useSelector } from "react-redux";
import DeliveryOptionsComponent from "./UserComponents/DeliveryOptionsComponent";
import ImageSlider from "./UserComponents/ImageSlider";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


var bannerSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 1000,
};



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ProductDetails(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var dispatch = useDispatch();
    var location = useLocation();
    var product = location.state.product
    var product = JSON.parse(product)
    var navigate = useNavigate();
    var classes = useStyles();
    var productid = product.productid

    var cart = useSelector(state => state.cart)
    var selectedProduct = Object.values(cart)[0]
    console.log(selectedProduct)//undefined

    var keys = Object.keys(cart)


    var selectedQty = null

    if (keys.length > 0 && selectedProduct != undefined) {

        selectedQty = selectedProduct.qty
        product['selectedSize'] = selectedProduct.selectedSize
        product['selectedColor'] = selectedProduct.selectedColor


    }



    const [colors, setColors] = useState(null)
    const [size, setSize] = useState([])
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [qty, setQty] = useState(selectedQty)
    const [referesh, setReferesh] = useState(false)
    const [images, setImages] = useState([])


    const handleSize = (index, sizeid) => {
        //setQty(null);

        var temp = size.map((item) => {

            return { 'sizeid': item.sizeid, 'status': false }
        });

        temp[index].status = true

        setSize([...temp])

        setSelectedSize(temp[index].sizeid)

        fetchAllColors(sizeid)
    }

    // const setSizeStatus = (sizes) => {
    //     var sizeJSON = []
    //     sizes.map((item) => {
    //         sizeJSON.push({ 'size': item, 'status': false })
    //     })
    //     return sizeJSON
    //     console.log(sizes)
    //     console.log(sizeJSON)
    //     console.log(JSON.stringify(sizeJSON))

    // }

    const fetchAllProducts = async () => {
        var body = { pid: product.productid }
        var response = await postData('userinterface/fetch_size_of_products_by_productid', body)
        var size = response.data

        var temp = size.map((item) => {

            if (keys.length > 0 && selectedProduct != undefined && selectedProduct?.selectedSize == item.sizeid) {

                fetchAllColors(item.sizeid)
                return { 'sizeid': item.sizeid, 'status': true }
            }
            else {
                return { 'sizeid': item.sizeid, 'status': false }
            }
        })

        console.log("TEMP:", temp)

        setSize(temp)
        // var sizes = Object.values(JSON.parse(response.data[0].size))
        // console.log(sizes)
        // setSize(setSizeStatus(sizes))

    }


    const fetchAllColors = async (sizeid) => {
        var body = { sizeid: sizeid }
        var response = await postData('userinterface/fetch_all_colors_by_sizeid', body)
        setColors(JSON.parse(response.data[0].color))

    }


    const showSize = () => {
        console.log("Size:", size)

        return size.map((item, i) => {
            return <div onClick={() => handleSize(i, item.sizeid)} className={item.status ? classes.circleShadow : classes.circle} style={{ display: 'flex', margin: 5, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 20 }}>
                {item.sizeid}
            </div>
        })

    }


    useEffect(function () {
        fetchAllProducts();

    }, [])


    const handleQtyChange = (value) => {

        if (selectedColor != null && selectedSize != null) {
            if (value == 0) {

                dispatch({ type: 'DELETE_CART', payload: [product.productid] })

            }
            else {
                setQty(value)
                product['qty'] = value
                product['selectedColor'] = selectedColor
                product['selectedSize'] = selectedSize

                dispatch({ type: 'ADD_CART', payload: [product.productid, product] })

            }
        }
        else {

            alert('Please Select Size or Color...')
        }


    }


    const handleColor = (color) => {
        setQty(0)
        setSelectedColor(color)

    }

    const handleImages = (images) => {
        setImages(images)
    }


    return (
        <div>
            <div className={classes.topBarText}>
                free shipping on orders upto &#8377; 999
            </div>
            <SearchBar />
            <MainBar />
            <div style={{ display: "flex", margin: 20, marginLeft: 100 }}>

                <ProductDetailsPictures productid={productid} onChange={handleImages} />

                <ImageSlider bannerSettings={bannerSettings} images={images} />

                <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>

                    <Grid item xs={6} className={classes.productNameCss}>
                        {product.productname}
                    </Grid>

                    <Grid item xs={6}>
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    </Grid>

                    {matches ?
                        <Grid item xs={12} className={classes.responsiveOfferPrice}>
                            {/* <div >Price:  &#8377; 999 </div>

                        <div style={{ textDecoration: 'line-through', marginLeft: 10, color: 'GrayText' }}>
                            &#8377; 1977
                        </div>
                        <div style={{ marginLeft: 10, color: '#2ecc71', textTransform: 'lowercase' }}>
                            (50% Off)
                        </div> */}
                            {product.offerprice > 0 ? <>
                                <div style={{ color: 'green' }}>Price: &#8377;{product.offerprice}</div>
                                <div style={{ textDecoration: 'line-through', color: 'red', marginLeft: 4 }}>&#8377;{product.price}</div>
                                <div style={{ color: 'blue', marginLeft: 4 }}>
                                    You Save:<div style={{ marginLeft: 4 }}>&#8377;{product.price - product.offerprice}</div>
                                </div></> : <></>}
                        </Grid>
                        :
                        <Grid item xs={12} className={classes.offerPrice}>
                            {/* <div >Price:  &#8377; 999 </div>

<div style={{ textDecoration: 'line-through', marginLeft: 10, color: 'GrayText' }}>
&#8377; 1977
</div>
<div style={{ marginLeft: 10, color: '#2ecc71', textTransform: 'lowercase' }}>
(50% Off)
</div> */}
                            {product.offerprice > 0 ? <><span style={{ color: 'green' }}>Price: &#8377;{product.offerprice}</span><span style={{ textDecoration: 'line-through', color: 'red', marginLeft: 4 }}>&#8377;{product.price}</span><span style={{ color: 'blue', marginLeft: 4 }}>You Save:<span style={{ marginLeft: 4 }}>&#8377;{product.price - product.offerprice}</span></span></> : <></>}
                        </Grid>

                    }
                    {matches ?
                        <></>

                        :

                        <><Grid item xs={12}>
                            Inclusive of all Taxes+<span style={{ color: '#f39c12', fontWeight: 'bold' }}>Free Shipping</span>
                        </Grid><Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                                <span><img src='sale price.jpg' width="40" /></span>
                                <span style={{ fontSize: 14, fontWeight: 'bold', margin: 10, letterSpacing: 1 }}>
                                    Extra ₹100 OFF on ₹999
                                </span>
                            </Grid></>

                    }

                    <Grid item xs={6} className={classes.size}>
                        Size

                    </Grid>

                    <Grid item xs={6} className={classes.sizeChart}>
                        {matches ? <></> : <SizeChart />}
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>

                        {showSize()}

                    </Grid>



                    <Grid item xs={10}>
                        <ColorsComponent data={colors} onChange={handleColor} />
                    </Grid>

                    {matches ?
                        <Grid item xs={10}  >

                            <PlusMinusComponent status={referesh} value={qty} onChange={handleQtyChange} />

                        </Grid>
                        :
                        <Grid item xs={5}  >

                            <PlusMinusComponent status={referesh} value={qty} onChange={handleQtyChange} />

                        </Grid>
                    }

                    {matches ?
                        <Grid item xs={10} >
                            <Button onClick={() => navigate('/cart')} variant="contained" startIcon={<ArrowCircleRightIcon />} style={{ background: '#ffd32a', color: '#000', width: "80%" }}>Buy Now</Button>


                        </Grid>

                        :
                        <Grid item xs={5} >


                            <Button onClick={() => navigate('/cart')} variant="contained" fullWidth startIcon={<ArrowCircleRightIcon />} style={{ background: '#ffd32a', color: '#000' }}>Buy Now</Button>

                        </Grid>

                    }



                    <Grid item xs={10}>
                        {matches ?
                            <Button variant="contained" startIcon={<ArrowCircleRightIcon />} style={{ background: '#3742fa', width: '80%' }} onClick={() => navigate('/home')}>Continue Shopping</Button> :
                            <Button variant="contained" fullWidth startIcon={<ArrowCircleRightIcon />} style={{ background: '#3742fa' }} onClick={() => navigate('/home')}>Continue Shopping</Button>
                        }
                    </Grid>

                    <Grid item xs={12} style={{ fontWeight: 'bold', fontSize: 15, textTransform: 'uppercase' }}>
                        Delivery Options
                    </Grid>

                    <Grid item xs={10} >
                        <DeliveryOptionsComponent />
                    </Grid>

                </Grid>

            </div>
            <div style={{ marginBottom: 40 }} >
                <ProductDetailsComponent />
            </div>

            <div>
                <Footer />
            </div>
        </div>


    )
}
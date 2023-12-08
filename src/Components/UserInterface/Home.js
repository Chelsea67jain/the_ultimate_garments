import React, { createRef, useState, useEffect } from "react"
import MainBar from "./UserComponents/MainBar"
import SearchBar from "./UserComponents/SearchBar"

import { getData, ServerURL, postData } from "../Services/NodeServices";
import SliderComponent from "./UserComponents/SliderComponent";
import SmallCardComponent from "./UserComponents/SmallCardComponent";
import ThreeCardComponent from "./UserComponents/ThreeCardComponent";
import OneCardComponent from "./UserComponents/OneCardComponent";
import Footer from "./UserComponents/Footer";


var bannerSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplayspeed: 2000,
};

var images = [{ 'id': 1, 'image': `${ServerURL}/images/57.jpg` },
{ 'id': 2, 'image': `${ServerURL}/images/58.jpg` },
{ 'id': 3, 'image': `${ServerURL}/images/59.jpg` },
{ 'id': 4, 'image': `${ServerURL}/images/60.jpg` },
{ 'id': 5, 'image': `${ServerURL}/images/61.jpg` },
{ 'id': 6, 'image': `${ServerURL}/images/62.jpg` },
{ 'id': 7, 'image': `${ServerURL}/images/63.jpg` },
{ 'id': 8, 'image': `${ServerURL}/images/64.jpg` },
]




export default function Home(props) {
    const [banners, setBanners] = useState([])
    const [trendingProductList, setTrendingProductList] = useState([])
    const [popularProductList, setPopularProductList] = useState([])
    const [bigImage, setBigImageList] = useState([])
    const [traditionalMenProductList, setTraditionalMenProductList] = useState([])
    const [traditionalWomenProductList, setTraditionalWomenProductList] = useState([])

    const fetchBanners = async () => {
        var result = await getData('userinterface/display_all_banners')
        console.log(result.data)
        var temp = JSON.parse(result.data.bannerpicture)
        setBanners(temp)
    }



    const fetchAllProducts = async (status) => {

        var response = await postData('products/fetchAllProducts_by_status', { status: status })
        //    console.log(response.data)
        setTrendingProductList(response.data);

    }

    const fetchPopularProducts = async (status) => {

        var response = await postData('products/fetchAllProducts_by_status', { status: status })
        // console.log(response.data)
        setPopularProductList(response.data);

    }

    const fetchSubCategoryByPriority = async (priority) => {

        var response = await postData('subcategory/display_subcategory_by_priority', { priority: priority })
        // console.log(response.data)
        setBigImageList(response.data);

    }

    const fetchMenProductsByCategoryAndSubCategory = async (cid, scid) => {

        var response = await postData('subcategory/display_products_by_category_and_subcategory', { cid: cid, scid: scid })
        setTraditionalMenProductList(response.data)


    }
    const fetchWomenProductsByCategoryAndSubCategory = async (cid, scid) => {

        var response = await postData('subcategory/display_products_by_category_and_subcategory', { cid: cid, scid: scid })
        setTraditionalWomenProductList(response.data)


    }


    useEffect(function () {
        fetchBanners();

    }, [])

    useEffect(function () {
        fetchAllProducts('Trending');
        fetchPopularProducts('Popular')
        fetchSubCategoryByPriority('1')
        fetchMenProductsByCategoryAndSubCategory(8, 24);
        fetchWomenProductsByCategoryAndSubCategory(9, 25);

    }, [])





    const Heading = (props) => {
        return (
            <div style={{ width: '100vw', fontFamily: 'Oswald', fontWeight: 'bolder', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, letterSpacing: 1, margin: 5, color: props.color }}>
                {props.heading}
            </div>
        )
    }

    return (
        <div>
            <SearchBar />
            <MainBar />
            <SliderComponent images={banners} bannerSettings={bannerSettings} />

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

                <Heading heading="Trending" color='#000' />
                <div style={{ display: 'flex', width: '80%', margin: 5, marginLeft: '12%', padding: 2, flexWrap: 'wrap' }}>
                    <SmallCardComponent data={trendingProductList} />
                </div>

                <div style={{ display: 'flex', width: '80%', margin: 5, marginLeft: '12%', padding: 2, flexWrap: 'wrap' }}>
                    <Heading heading="Popular" color='#000' />
                    <ThreeCardComponent data={popularProductList} />
                </div>

                <div style={{ display: 'flex', width: '80%', margin: 5, marginLeft: '12%', padding: 2, flexWrap: 'wrap' }}>
                    <Heading heading="Shop for Men" color='#000' />
                    <ThreeCardComponent data={traditionalMenProductList} />
                </div>

                <div style={{ display: 'flex', width: '80%', margin: 5, marginLeft: '12%', padding: 2, flexWrap: 'wrap' }}>
                    <Heading heading="Shop for Women" color='#000' />
                    <ThreeCardComponent data={traditionalWomenProductList} />
                </div>

                <div style={{ display: 'flex', width: '80%', margin: 5, marginLeft: '12%', padding: 2, flexWrap: 'wrap' }}>
                    <OneCardComponent data={bigImage} url={"productlist"} />
                </div>

                <div style={{ display: 'flex' }}>
                    <Footer />
                </div>

            </div>

        </div>

    )
}
/*For using carousal we need to install two libraries one is slick-carousal and other is react-slick
zIndex:1 jab hame image ke upar text ya icon cahiye toh hum zIndex:1 lete hai
zIndex:2 jab hame image ke upar image cahiye toh hum zIndex:2 lete hai

*/
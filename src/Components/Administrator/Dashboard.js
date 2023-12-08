import * as React from "react";
import AdminAppBar from "./AdminAppBar";
import SideList from "./SideList";
import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory";
import SubCategory from './SubCategory';
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from './Products'; 
import DisplayAllProducts from "./DisplayAllProducts";
import Size from './Size'
import DisplayAllSize from "./DisplayAllSize";
import Color from "./Color";
import DisplayAllColor from "./DisplayAllColor";
import BannerImages from "./BannerImages";
import {Routes,Route} from 'react-router-dom';
import ProductImages from "./ProductImages";


export default function Dashboard(props) {
    return (

        <div style={{ display: 'flex', flexDirection: "column", width: '100%' }}>
            <AdminAppBar />

            <div style={{ display: 'flex'}}>
                <div style={{ width: '20%' }}>
                    <SideList />
                </div>
            

            <div style={{ width: '80%' }} >
                
                   
                        <Routes>
                            <Route element={<Category />} path='/category'></Route>
                            <Route element={<DisplayAllCategory />} path='/displayallcategory'></Route>
                            <Route element={<SubCategory />} path='/subcategory'></Route>
                            <Route element={<DisplayAllSubCategory />} path='/displayallsubcategory'></Route>
                            <Route element={<Products />} path='/products'></Route>
                            <Route element={<DisplayAllProducts />} path='displayallproducts'></Route>
                            <Route element={<Size />} path='/size'></Route>
                            <Route element={<DisplayAllSize />} path='/displayallsize'></Route>
                            <Route element={<Color />} path='/color'></Route>
                            <Route element={<DisplayAllColor />} path='/displayallcolor'></Route>
                            <Route element={<BannerImages />} path='/bannerimages'></Route>
                            <Route element={<ProductImages />} path='/productimages'></Route>
                    </Routes>
                

            </div>
            </div>
            </div>

            )

}
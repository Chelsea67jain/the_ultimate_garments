import React, { useEffect, useState } from "react";
import { postData } from "../Services/NodeServices";
import { useParams } from "react-router";
import ProductListComponent from "./UserComponents/ProductListComponent";
import FilterComponent from "./UserComponents/FilterComponent";
import Footer from "./UserComponents/Footer";
import SearchBar from "./UserComponents/SearchBar";
import MainBar from "./UserComponents/MainBar";
import { Grid } from "@mui/material";
import { ServerURL } from "../Services/NodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductList() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [productList, setProductList] = useState([])

  var { id, icon } = useParams();

  const fetchAllProductsBySubCategory = async () => {
    console.log('ID:', id);
    var body = { subcategoryid: id }
    var response = await postData('userinterface/fetch_all_products_by_subcategory', body)
    setProductList(response.data);


  }
  useEffect(function () {
    fetchAllProductsBySubCategory();
  }, [])



  return (
    <>

      <SearchBar setProductList={setProductList} />
      <MainBar />
      <div style={{ margin: 30, marginLeft: 70 }}>
        <div style={{ width: '97%', height: 'auto' }}>

          <img src={`${ServerURL}/images/${icon}`} style={{ width: '100%', height: "100%" }} />
          {/* <div style={{ width:220,display:'flex',justifyContent:'center',fontWeight: 'bold', fontSize:18, color: '#000',position: 'absolute',transform:'translate(-50%,-50%)', top: '90%', left: '50%', zIndex: 1}}>
                    {item.productname}
                </div> */}
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={3} >
          <FilterComponent setProductList={setProductList} />
        </Grid>

        {matches ?
          <Grid item xs={9} >
            <div style={{ display: 'flex', width: '90%', marginLeft: '30%', marginBottom: '20%', flexWrap: 'wrap' }}>
              <ProductListComponent data={productList} />
            </div>
          </Grid>


          :
          <Grid item xs={9} >
            <div style={{ marginBottom: '85%', display: 'flex', width: '90%', margin: 5, marginLeft: '6%', padding: 2, flexWrap: 'wrap' }}>
              <ProductListComponent data={productList} />
            </div>
          </Grid>
        }



      </Grid>
      < Footer />
    </>
  )

}
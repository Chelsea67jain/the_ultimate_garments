import {useState,useEffect} from "react"
import { Grid,TextField,Button } from "@mui/material"
import { useStyles } from "./ProductImagesCss"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getData,postData } from "../Services/NodeServices";
import { DropzoneArea } from 'material-ui-dropzone';
import Swal from 'sweetalert2';

export default function ProductImages(props){

 const classes=useStyles();
 const [categoryId,setCategoryId]=useState('')
 const [subCategoryId,setSubCategoryId]=useState('')
 const [productId,setProductId]=useState('')
 const [categoryList,setCategoryList]=useState([])
 const [subCategoryList,setSubCategoryList]=useState([])
 const [productList,setProductList]=useState([])
 const [getFiles,setFiles]=useState('')

 const handleCategoryId = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value);

}

const handleSubCategoryId = (event) => {
    setSubCategoryId(event.target.value)
   fetchAllProducts(event.target.value)
}

const handleProductId = (event) => {
    setProductId(event.target.value)
  
}

const fetchAllCategory = async () => {
   
    var result = await getData('category/display_all_category')
    console.log(result.data)
    setCategoryList(result.data)
    
}

 const handleSave=(files)=>{
   
   setFiles(files);

 }
 
const handleSubmit=async()=>{
  var formData=new FormData();
  formData.append('categoryid',categoryId);
  formData.append('subcategoryid',subCategoryId);
  formData.append('productid',productId)
   
  getFiles.map((item,index)=>{
    formData.append("picture"+index,item)
 })
 
  
  var response=await postData('products/add_product_images',formData,true)
  if(response.status){
    Swal.fire({
        icon: 'success',
        title: 'Record Submitted Successfully',
        text: 'Something went wrong!',
        
      })

}
else{
    Swal.fire({
        icon: 'error',
        title: 'Fail to save the Record',
        text: 'Something went wrong!',
        
      })
}
}

const handleReset=()=>{
    setCategoryId('')
    setSubCategoryId('')
    setProductId('') 
    setFiles([]);

    
}


const fetchAllSubCategory = async (cid) => {

    var result = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
    console.log(result.data)
    setSubCategoryList(result.data);

}

const fetchAllProducts = async (scid) => {

    var result = await postData('products/display_products_by_subcategory', { subcategoryid: scid })
    setProductList(result.data);

}


const fillCategories = () => {

    return categoryList.map((item) => {
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
}

const fillSubCategories = () => {

    return subCategoryList.map((item) => {
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })

}

const fillAllProducts = () => {

    return productList.map((item) => {
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })

}

useEffect(function () {
    fetchAllCategory();

}, [])

    return (
        <div className={classes.root}>
        <div className={classes.subdiv}>
       <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className={classes.heading}>
            Product Images
          </div>
          </Grid>
          <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="CategoryId"
                                onChange={handleCategoryId}
                            >
                                <MenuItem >Choose Category</MenuItem>
                                {fillCategories()}
                            </Select>

                        </FormControl>
                    </Grid>



                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Sub Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={subCategoryId}
                                label="SubCategoryId"
                               onChange={handleSubCategoryId}

                            >

                                <MenuItem >Choose SubCategory</MenuItem>
                                {fillSubCategories()}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4}>
                    <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label1">Product Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select1"
                                value={productId}
                                label="Product Id"
                               onChange={handleProductId}

                            >

                                <MenuItem >Choose SubCategory</MenuItem>
                                {fillAllProducts()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>

                        <DropzoneArea
                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                          //  showPreviews={true}
                            maxFileSize={5000000}
                            filesLimit={6}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={()=>handleSubmit()} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={()=>handleReset()} variant='contained' fullWidth>Reset</Button>
                    </Grid>
       </Grid>


            </div>
            </div>
    )
}



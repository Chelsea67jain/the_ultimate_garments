import React, { useState, useEffect } from 'react';
import { useStyles } from './ProductsCss';
import { TextField, Button, Grid } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getData, postData } from '../Services/NodeServices';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

export default function Products(props) {
    const classes = useStyles();
  const navigate=useNavigate();

    const [picture, setPicture] = useState({ url: '/icon.jpg', bytes: '' })
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')
    const [status, setStatus] = useState('Continue')
    const [saleStatus, setSaleStatus] = useState('')

    const handlePicture = (event) => {
        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    const fetchAllCategory = async () => {
        var body = { categoryid: categoryId }
        var result = await getData('category/display_all_category',body)
        console.log(result.data)
        setCategoryList(result.data)
     
    }

    


    const fetchAllSubCategory = async (cid) => {

        var result = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        console.log(result.data)
        setSubCategoryList(result.data);

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

    const handleCategoryId = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value);

    }

    const handleSubCategoryId = (event) => {
        setSubCategoryId(event.target.value)
       
    }

    useEffect(function () {
        fetchAllCategory();

    }, [])



   const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('subcategoryid', subCategoryId)
        formData.append('productname', productName);
        formData.append('price', price);
        formData.append('offerprice', offerPrice)
        formData.append('stock', stock)
        formData.append('description', description)
        formData.append('rating', rating)
        formData.append('status', status) 
        
        formData.append('salestatus', saleStatus)
        formData.append('picture', picture.bytes)

        var response = await postData('products/submit_products', formData, true);
      
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


    const handleReset = () => {
        setCategoryId('')
        setSubCategoryId('')
        setProductName('')
        setPrice('')
        setOfferPrice('')
        setDescription('')
        setSaleStatus('')
        setStatus('')
        setPicture({ url: '/icon.png', bytes: '' })

    }

    const handleSaleStatus = (event) => {
        setSaleStatus(event.target.value)

    }

   

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{display:'flex'}}>
                        <div className={classes.heading}>
                            Products List
                        </div>
                        <div style={{width:'80%',display:'flex',justifyContent:'flex-end'}}>
                            <Avatar onClick={()=>navigate('/dashboard/displayallproducts')} src={'/report.jpg'} width="30" ></Avatar>
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
                        <TextField onChange={(event) => setProductName(event.target.value)} label='Product Name' variant='outlined' fullWidth></TextField>
                    </Grid>


                    <Grid item xs={4}>
                        <TextField label='Price' onChange={(event) => setPrice(event.target.value)} variant='outlined' fullWidth></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField label='Offer Price' onChange={(event) => setOfferPrice(event.target.value)} variant='outlined' fullWidth></TextField>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={(event) => setStock(event.target.value)} label='Stock' variant='outlined' fullWidth></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField onChange={(event) => setDescription(event.target.value)} label='Description' variant='outlined' fullWidth></TextField>
                    </Grid>


                    <Grid item xs={6}>
                        <TextField onChange={(event) => setRating(event.target.value)} label='Rating' variant='outlined' fullWidth></TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" >Status</FormLabel>
                            <RadioGroup
                                row   
                               value={status}
                            >

                                <FormControlLabel onChange={(event)=>setStatus(event.target.value)} value='Continue' control={<Radio />} label="Continue" />
                                <FormControlLabel  onChange={(event)=>setStatus(event.target.value)} value='DisContinue' control={<Radio />} label="Discontinue" />
                                

                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sale Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={saleStatus}
                                label="Sale Status"
                                onChange={handleSaleStatus}

                            >
                                <MenuItem value="Trending" >Trending</MenuItem>
                                <MenuItem value="Popular" >Popular</MenuItem>
                                <MenuItem value="Relevance" >Relevance</MenuItem>

                            </Select>
                        </FormControl>


                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" component="label" fullWidth>
                            Upload Picture
                            <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }} >
                        <Avatar
                            alt="Remy Sharp"
                            src={picture.url}
                            sx={{ width: 56, height: 56 }}
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

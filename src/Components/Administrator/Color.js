import React, { useState, useEffect } from 'react';
import { useStyles } from './ColorCss';
import { TextField, Button, Grid } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { getData, postData } from '../Services/NodeServices';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ColorPicker from 'material-ui-color-picker'


export default function Color(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productId, setProductId] = useState('')
    const [sizeList, setSizeList] = useState([])
    const [sizeId, setSizeId] = useState('')
    const [color, setColor] = useState('')
    const [colorCode, setColorCode] = useState('')
    const [colorList, setColorList] = useState({})

    const fetchAllCategory = async () => {
        var body = { categoryid: categoryId }
        var result = await getData('category/display_all_category', body)
        console.log(result.data)
        setCategoryList(result.data)

    }

    const fetchAllSubCategory = async (cid) => {

        var result = await postData('subcategory/display_subcategory_by_category', { categoryid: cid })
        console.log(result.data)
        setSubCategoryList(result.data);

    }
    const fetchAllProducts = async (scid) => {
        var result = await postData('products/display_products_by_subcategory', { subcategoryid: scid })
        console.log(result.data)
        setProductsList(result.data);


    }


    const fetchAllSize = async (pid) => {

        var result = await postData('size/display_size_by_products', { productid: pid })
        //  console.log(result.data);
        setSizeList(result.data);
        
    }


    const handleCategoryId = (event) => {
        setCategoryId(event.target.value);
        fetchAllSubCategory(event.target.value);
    }

    const handleSubCategoryId = (event) => {
        setSubCategoryId(event.target.value);
        fetchAllProducts(event.target.value);
    }

    const handleProductId = (event) => {
        setProductId(event.target.value)
        fetchAllSize(event.target.value)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])





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

    const fillProducts = () => {
        return productsList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }



    const fillSize = () => {

        return sizeList.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>
        })

    }

   const handleSubmit = async () => {

        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, sizeid: sizeId, color: JSON.stringify(colorList) }
        var result = await postData('color/add_color', body)
        // alert(result.status);
        //       alert(JSON.parse(result.size)); 

        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully',
                text: 'Something went wrong!',

            })

        }

        else {
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
        setProductId('')
        setSizeList('')
        setColor('')

    }

    const handleSizeId = (event) => {
        setSizeId(event.target.value)

    }

  const handleColorChange=(event)=>{ 
    console.log('Color:',event)
    setColorCode(event);

  }

  const handleAddColor=()=>{ 
    
      /*We are making this function to append color and colorcode  
      var cl=colorList
      alert(color+","+colorCode); 
      cl[color]=colorCode
      alert(cl);
      setColorList({...colorList,cl});
      */
     var temp=colorList 

     setColorList({...temp,[color]:colorCode})

  }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <div className={classes.heading}>
                            Color Interface
                        </div>

                        <div style={{ width: '70%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Avatar onClick={() => navigate('/dashboard/displayallcolor')} src={'/report.jpg'} width="30" ></Avatar>
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
                            <InputLabel id="demo-simple-select-label">SubCategory Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                            <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productId}
                                onChange={handleProductId}
                            >

                                <MenuItem >Choose Product</MenuItem>
                                {fillProducts()}
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Size Id</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sizeId}
                                    onChange={handleSizeId}
                                >

                                    {fillSize()}



                                </Select>

                            </FormControl>

                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <TextField value={color} onChange={(event) => setColor(event.target.value)} variant="outlined" label="Color" fullWidth></TextField>
                    </Grid>

                    <Grid item xs={3}>
                        <ColorPicker
                            name='color'
                            variant="outlined"
                            label="Color Code"
                            defaultValue='#000'
                            value={colorCode}
                            onChange={(code)=>handleColorChange(code)}

                        />
                    </Grid>

                    <Grid item xs={3}>
                        <Button onClick={handleAddColor} variant='contained' fullWidth>Set</Button>
                    </Grid>

                    <Grid item xs={12}>
                    <TextField value={JSON.stringify(colorList)} onChange={(event) => setColorList(event.target.value)} variant="outlined" label="Color List" fullWidth></TextField>
                    </Grid>


                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => handleReset()} variant='contained' fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>
        </div>


    )
}
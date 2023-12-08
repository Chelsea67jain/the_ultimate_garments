import React, { useState, useEffect } from 'react';
import { useStyles } from "./SizeCss"
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'S',
    'M',
    'L',
    'XL',
    'XXL',
];

export default function Size(props) {


    const classes = useStyles();
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productId, setProductId] = useState('')
    const [size, setSize] = useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSize(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const fetchAllCategory = async () => {

        var result = await getData('category/display_all_category')

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

    const handleSubmit = async () => {
        var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: JSON.stringify(size) }
        var result = await postData('size/add_size', body)
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
        setSize([])


    }


    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ display: 'flex' }}>
                        <div className={classes.heading}>
                            Size List
                        </div>
                        <div style={{ width: '80%', display: 'flex', justifyContent: 'flex-end' }}>
                            <Avatar onClick={() => navigate('/dashboard/displayallsize')} src={'/report.jpg'} width="30" ></Avatar>
                        </div>

                    </Grid>

                    <Grid item xs={6}>
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

                    <Grid item xs={6}>
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


                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <div>
                            <FormControl fullWidth >
                                <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={size}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Size" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={size.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
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
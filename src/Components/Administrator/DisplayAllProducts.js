import React, { useEffect, useState } from 'react';
import { useStyles } from './DisplayAllProductsCss';
import MaterialTable from '@material-table/core';
import { getData, postData, ServerURL } from '../Services/NodeServices';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Grid } from "@mui/material"
import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Swal from 'sweetalert2';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router';

export default function DisplayAllProducts() {

    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [picture, setPicture] = useState({ url: '/icon.jpg', bytes: '' })
    const [categoryId, setCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productName, setProductName] = useState('')
    const [oldIcon, setOldIcon] = useState('');
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState('')  
    const [status, setStatus] = useState('Continue')
    const [saleStatus, setSaleStatus] = useState('')
    const [BtnStatus, setBtnStatus] = useState(false)

  const[categoryName,setCategoryName]=useState('')
  const [subCategoryName,setSubCategoryName]=useState('')

    const fetchAllProducts = async () => {

        var result = await getData('products/display_all_products')
        //  alert(result.data);
        setProducts(result.data)

    }
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


    useEffect(function () {
        fetchAllProducts();

    }, [])

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleClose = () => {
        setOpen(false);

    }
    const handleCategoryId = (event) => {
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value);
        
    }

    const handleSubCategoryId = (event) => {
        setSubCategoryId(event.target.value)
        
        
    }

    const handleSaleStatus = (event) => {
        setSaleStatus(event.target.value)
        
    }
    const handlePicture = (event) => {
        setPicture({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true);
    }

    const handleOpen = (rowData) => {
        setOpen(true);  
        fetchAllSubCategory(rowData.categoryid);
        setProductId(rowData.productid);
        setCategoryId(rowData.categoryid);
        setSubCategoryId(rowData.subcategoryid);
        setProductName(rowData.productname);
        setPrice(rowData.price);
        setOfferPrice(rowData.offerprice);
        setDescription(rowData.description);
        setStock(rowData.stock)
        setRating(rowData.rating);
        setStatus(rowData.status);
        setSaleStatus(rowData.salestatus);
        setPicture({ url: `${ServerURL}/images/${rowData.picture}`, bytes: '' })
        setOldIcon(`${ServerURL}/images/${rowData.picture}`);

    }
    const handleEditProducts = async () => {

        var body = { productid: productId, categoryid: categoryId, subcategoryid: subCategoryId, productname: productName, price: price, offerprice: offerPrice, description: description, stock: stock, rating: rating, status: status, salestatus: saleStatus, picture: picture.bytes }
        var result = await postData('products/edit_products', body)
      //  alert(result.status);

        if (result.status) {
            setOpen(false);

            Swal.fire({
                icon: 'success',
                title: 'Product Updated Successfully',


            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to Edit the Products',
                text: 'Something went wrong!',

            })
        }
        fetchAllProducts();

    }

    const handleDeleteProducts = async () => { 
      setOpen(false);
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then(async (res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = { productid: productId }
                var data = await postData('products/delete_products', body)

                Swal.fire('Deleted!', '', 'success')
            } else if (res.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
            else {
                Swal.fire('Server Error', '', 'error')
            }
        })
      
       
        fetchAllProducts();

    }
    const handleSave = async () => {
        const formData = new FormData();
        formData.append('productid', productId)
        formData.append('picture', picture.bytes)
        var result = await postData('products/update_picture', formData, true)
    //    alert(result.status);
        setBtnStatus(false);
        fetchAllProducts();
    }

    const handleCancel = () => {

        setBtnStatus(false);
        setPicture({ url: oldIcon, bytes: '' })

    }


    const SaveAndCancelBtn = () => {
        return (
            <div>
                {BtnStatus ? <div style={{ width: '250', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={handleSave} variant='contained' color='primary'>Save</Button>
                    <Button onClick={handleCancel} variant='contained' color='secondary'>Cancel</Button></div> : <></>}
            </div>

        )
    }
    function showProducts() {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <div className={classes.root}>
                        <div className={classes.subdiv}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} style={{ display: 'flex' }}>
                                    <div className={classes.heading}>
                                        Products List
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
                                            label="SubCategory Id"
                                            onChange={handleSubCategoryId}
                                        >


                                            <MenuItem >Choose SubCategory</MenuItem>
                                            {fillSubCategories()}
                                        </Select>

                                    </FormControl>
                                </Grid>


                                <Grid item xs={4}>
                                    <TextField value={productName} onChange={(event) => setProductName(event.target.value)} label='Product Name' variant='outlined' fullWidth></TextField>
                                </Grid>


                                <Grid item xs={4}>
                                    <TextField value={price} label='Price' onChange={(event) => setPrice(event.target.value)} variant='outlined' fullWidth></TextField>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField value={offerPrice} label='Offer Price' onChange={(event) => setOfferPrice(event.target.value)} variant='outlined' fullWidth></TextField>
                                </Grid>

                                <Grid item xs={4}>
                                    <TextField value={stock} onChange={(event) => setStock(event.target.value)} label='Stock' variant='outlined' fullWidth></TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField value={description} onChange={(event) => setDescription(event.target.value)} label='Description' variant='outlined' fullWidth></TextField>
                                </Grid>


                                <Grid item xs={6}>
                                    <TextField value={rating} onChange={(event) => setRating(event.target.value)} label='Rating' variant='outlined' fullWidth></TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" >Status</FormLabel>
                                        <RadioGroup
                                            row
                                            defaultValue={status}

                                        >
                                            <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="Continue" control={<Radio />} label="Continue" />
                                            <FormControlLabel onChange={(event) => setStatus(event.target.value)} value="DisContinue" control={<Radio />} label="Discontinue" />


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
                                    <Button onClick={handleEditProducts} variant='contained' fullWidth>Edit</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={handleDeleteProducts} variant='contained' fullWidth>Delete</Button>
                                </Grid>

                                <Grid item xs={3}>
                                    <Button variant="contained" component="label" fullWidth>
                                        Upload Picture
                                        <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
                                    </Button>

                                </Grid>
                                <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }} >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={picture.url}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {SaveAndCancelBtn()}
                                </Grid>

                            </Grid>

                        </div>

                    </div>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }


    function displayProducts() {
        return (
            <MaterialTable
                title="Products List"
                columns={[
                    { title: 'Id', field: 'productid' },

                    { title: 'Category',
                    render: (rowData) => <div style={{display:'flex',flexDirection:'column'}}><div>{rowData.cn}</div><div>{rowData.scn}</div></div>

                },
                { title: 'Name', field: 'productname' },
                
                    { title: 'Price',  render: (rowData) =><div style={{display:'flex',flexDirection:'column'}}><div>{rowData.offerprice>0?<>Price:<s>{rowData.price}</s><div>OfferPrice:{rowData.offerprice}</div></>:<>{rowData.price}<div>{rowData.offerprice}</div></>}</div><div>Stock:{rowData.stock}</div></div>
                },
               
                    { title: 'Description', field: 'description' },
                    { title: 'Rating', field: 'rating' },
                    
                    { title: 'SaleStatus', 
                    render: (rowData) => <div style={{display:'flex',flexDirection:'column'}}><div>{rowData.status}</div><div>{rowData.salestatus}</div></div>

                },

                    {
                        title: 'Picture',
                        render: (rowData) => <img src={`${ServerURL}/images/${rowData.picture}`} width='50' height='50' />
                    }

                ]}
                data={products}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Products',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Products',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/products')
                    }
                ]}
            />
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displayProducts()}
            </div>
            {showProducts()}

        </div>

    )
}

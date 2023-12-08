import React, { useEffect, useState } from "react"
import { useStyles } from "./DisplayAllSizeCss";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button, Grid } from "@mui/material"
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
    'S Size',
    'M Size',
    'L Size',
    'XL Size',
    'XXL Size',

];

export default function DisplayAllSize(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [size, setSize] = useState([])
    const [sizeId, setSizeId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [productId, setProductId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [productsList, setProductsList] = useState([])

    const fetchAllSize = async () => {

        var result = await getData('size/display_size')
        //  alert(JSON.stringify(result.data))
        setSize(result.data);

    }


    useEffect(function () {

        fetchAllSize();

    }, [])


    useEffect(function () {
        fetchAllCategory()
    }, [])


    const handleOpen = (rowData) => {
        setOpen(true);
        fetchAllSubCategory(rowData.categoryid);
        fetchAllProducts(rowData.subcategoryid)
        setSizeId(rowData.sizeid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setSize(JSON.parse(rowData.size))

    }



    const handleClose = () => {
        setOpen(false) 
        
    }


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

    const handleEditSize = async () => {
        setOpen(false)
        console.log(sizeId)
        var body = { sizeid: sizeId, categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, size: JSON.stringify(size) }
        var result = await postData('size/edit_size', body)
        // alert(result.status);
      
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
      
        fetchAllSize();

    }


    const handleDeleteSize = async () => {
        setOpen(false)
         Swal.fire({
            title: 'Do you want to Delete the changes?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then(async(result) => { 
             
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) { 
                var body = { sizeid: sizeId }
                var result = await postData('size/delete_size', body)
             
              Swal.fire('Deleted!', '', 'success')
            
            } 

           
            else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
            else{
                Swal.fire('Server Error', '', 'error')
            }
          })
          fetchAllSize();
        
    }

    function showSize() {
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
                                        Edit  Products Size
                                    </div>


                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label1">Category Id</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label1"
                                            id="demo-simple-select1"
                                            value={categoryId}
                                            onChange={handleCategoryId}
                                        >

                                            <MenuItem >Choose Category</MenuItem>
                                            {fillCategories()}
                                        </Select>

                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label2">SubCategory Id</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label2"
                                            id="demo-simple-select2"
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
                                        <InputLabel id="demo-simple-select-label3">Product Id</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label3"
                                            id="demo-simple-select3"
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
                                    <Button onClick={() => handleEditSize()} variant='contained' fullWidth>Edit</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={() => handleDeleteSize()} variant='contained' fullWidth>Delete</Button>
                                </Grid>


                            </Grid>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>

        )

    }
    function displaySize() {
        return (
            <MaterialTable
                title="Size List"
                columns={[
                    { title: 'SizeId', field: 'sizeid' },
                    { title: 'CategoryId', field: 'cn' },
                    { title: 'SubCategoryId', field: 'scn' },
                    { title: 'ProductId', field: 'pn' },
                    {
                        title: 'Size',
                        field: 'size',

                    },
                ]}
                data={size}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Size',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/size')
                    }
                ]}

            />
        )
    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displaySize()}
            </div>
            <div>
                {showSize()}
            </div>
        </div>
    )
}
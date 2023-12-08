import React,{useEffect, useState} from "react";
import { getData,postData } from "../Services/NodeServices";
import MaterialTable from '@material-table/core';
import { useStyles } from "./DisplayAllColorCss" 
import { useNavigate } from "react-router"; 
import { Button, Grid, TextField, Avatar } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import ColorPicker from 'material-ui-color-picker'
import Swal from "sweetalert2"

export default function DisplayAllColor(props) {

    const classes = useStyles(); 
    const navigate=useNavigate();

   const[colorList,setColorList]=useState([])
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
   const[colorId,setColorId]=useState('')

   const[open,setOpen]=useState(false)

   const fillCategories = () => {

    return categoryList.map((item) => {
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
}

const fillSubCategories = () => {
    console.log("fsc");
    return subCategoryList.map((item) => {
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })

}

const fillProducts = () => { 
    console.log("products");
    return productsList.map((item) => {
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })
}



const fillSize = () => {
    console.log("size");
    return sizeList.map((item) => {
        return <MenuItem value={item}>{item}</MenuItem>
    })

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
   // alert(subCategoryList)

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

   const  fetchAllColors=async()=>{ 

     var response=await getData('color/display_all_colors')
      setColorList(response.data)
       console.log(JSON.stringify(response.data))
        
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

const handleSizeId = (event) => {
    setSizeId(event.target.value)

}


useEffect(function () {
    fetchAllCategory()
}, [])

  const handleOpen=(rowData)=>{ 

    setColorId(rowData.colorid);

   setCategoryId(rowData.categoryid)

   setSubCategoryId(rowData.subcategoryid)
  

   setProductId(rowData.productid)

   setSizeId(rowData.size)
   setColor(rowData.color) 
   console.log(rowData.color)
   setOpen(true)

  }
const handleClose=()=>{
    setOpen(false)
}

   useEffect(function(){
    fetchAllColors();

   },[])

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

const handleColorChange=(event)=>{ 
    console.log('Color:',event)
    setColorCode(event);

  }
  
const handleEdit=async()=>{ 
    var body = { categoryid: categoryId, subcategoryid: subCategoryId, productid: productId, sizeid: sizeId, color: JSON.stringify(colorList) }
    var result = await postData('color/edit_colors', body)
    // alert(result.status);
        // alert(JSON.parse(result.size)); 

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
const handleDelete=()=>{ 

    Swal.fire({
        title: 'Do you want to Delete the changes?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then(async(result) => { 
         
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {  

            var body = { colorid: colorId }
            var result = await postData('color/delete_color_data', body);
          Swal.fire('Deleted!', '', 'success')
        
        } 

       
        else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
        else{
            Swal.fire('Server Error', '', 'error')
        }
      })
      fetchAllColors();
    
}

     function showColors(){
        return(
            <div>
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
                        Edit Colors
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
                        <TextField value={color} onChange={(event) => setColor(event.target.value)} 
                        variant="outlined" label="Color" fullWidth></TextField>
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
                        <Button  onClick={handleAddColor}
                         variant='contained' fullWidth>Set</Button>
                    </Grid>

                    <Grid item xs={12}>
                    <TextField value={color} onChange={(event) => setColor(event.target.value)} 
                    variant="outlined" label="Color List" fullWidth></TextField>
                    </Grid>


                    <Grid item xs={6}>
                        <Button onClick={() => handleEdit()} 
                        variant='contained' fullWidth>Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => handleDelete()} 
                        variant='contained' fullWidth>Delete</Button>
                    </Grid>

                </Grid>

            </div>
        </div>



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
        
     }
    function displayColors() { 

        return(
        <MaterialTable
        title=" Colors List"
        columns={[
            { title: 'ColorId', field: 'colorid' },
            { title: 'CategoryId', field: 'cn' },
            { title: 'SubCategoryId', field: 'scn' },
            { title: 'ProductId', field: 'pn' },
            { title: 'Size', field: 'sizeid' },
            { title: 'Color', field: 'color' },
           
        ]}


        data={colorList}

        actions={[
            {
                icon: 'edit',
                tooltip: 'Edit SubCategory',
                onClick: (event, rowData) => handleOpen(rowData)
            },
            {
                icon: 'add',
                tooltip: 'Add User',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/color')
            }
        ]}
    />
        )
    }
    
    return (
        <div className={classes.mainContainer} >
            <div className={classes.box}>
                {displayColors()}
            </div>
         {showColors()}

        </div>
    )
}
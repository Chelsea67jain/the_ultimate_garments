import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { getData, postData } from "../../Services/NodeServices"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginSignUpComponent from './LoginSignUpComponent';


export default function MainBar(props) {
   
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategory, setSubCategory] = useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(anchorEl);

    const fetchAllCategories = async () => {
        var result = await getData('userinterface/display_all_category')
        setCategory(result.data);

    }

    const fetchAllSubCategories = async (categoryid) => {
        //  console.log(categoryid);
        var result = await postData('userinterface/display_all_subcategory', { categoryid: categoryid })
        console.log(result.data);
        setSubCategory(result.data);

    }


    useEffect(function () {
        fetchAllCategories();
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        setCategoryId(event.currentTarget.value)
        fetchAllSubCategories(event.currentTarget.value);

    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    const showCategoryMenu = () => {
        return (category.map((item) => {
            return (<Button id="basic-button" style={{color:'#000',fontWeight:'bold'}} value={item.categoryid} onClick={handleClick}>{item.categoryname}</Button>)
        })

        )
    }

    const showSubCategoryMenu = () => {
        return (subCategory.map((item) => {
            return (<MenuItem onClick={handleClose}>{item.subcategoryname}</MenuItem>)
        })

        )
    }
const handleLogin=()=>{
    return (
        <LoginSignUpComponent />
    )
}
  
 return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: '#fff' }}>
                <Toolbar >

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {showCategoryMenu()}

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}


                        >
                            {showSubCategoryMenu()}
                        </Menu>
                    
                       
                    </div>
                    
                    

                </Toolbar>
                
            </AppBar>

        </Box>
    )
}
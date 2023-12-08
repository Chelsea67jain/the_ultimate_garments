import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useSelector } from "react-redux"
import PopCart from './PopCart';
import { postData } from '../../Services/NodeServices';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [referesh, setReferesh] = useState(false);

  var cart = useSelector((state) => state.cart)
  var keys = Object.keys(cart)


  /*  if (Object.values(cart)[0].qty != 0) {
     qty = Object.values(cart)[0].qty
   }
   else {
     qty = ''
   }
  */

  const fetchAllProducts = async (text) => {
    var result
    var result = await postData('userinterface/search_products', { productname: text })
    props.setProductList(result.data);
  }

  const handleSearch = (event) => {
    fetchAllProducts(event.target.value);


  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#000' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <div style={{ width: '20%', fontSize: 15, fontWeight: 600 }}>
            The Ultimate Garments
          </div>
          <div style={{ width: '60%' }} >
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"

                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />

            </Search>
          </div>
          <div style={{ display: 'flex', justifyContent: 'right', width: '20%' }}>

            <Badge color="primary" badgeContent={keys.length} showZero>

              <PopCart open={open} anchorEl={anchorEl} />
            </Badge>

          </div>

        </Toolbar>

      </AppBar>

    </Box>
  )
}
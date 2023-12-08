import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";
import { ServerURL } from '../../Services/NodeServices';
import { Divider } from '@material-ui/core';
import { useNavigate } from 'react-router';

export default function PopCart(props) {
    var navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(props.anchorEl);
    const [open, setOpen] = useState(props.open);
    const [referesh, setReferesh] = useState(false);

    var cart = useSelector((state) => state.cart)
    console.log(cart)
    var values = Object.values(cart)
    console.log(values)
   

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
        setReferesh(!referesh)
    };


    const handlePopoverClose = () => {
        setAnchorEl(null);
        setOpen(false);
        setReferesh(!referesh)
    };

    const showPaymentDetails = (item) => {
        var totalamount = item.qty * item.price
        var saveamount = item.qty * (item.price - item.offerprice)

        return (
            <div style={{ display: "flex", justifyContent: 'space-between', padding: 5, flexDirection: "column", width: "400", letterSpacing: 1, fontSize: 15, fontWeight: 600 }}>
                <div>
                    Total Amount: &#8377;{totalamount}
                </div>

                <div style={{ color: 'green' }}>
                    Save: &#8377;{saveamount}
                </div>

                <div style={{ color: 'green' }}>
                    Shipping : Free
                </div>

                <Divider />

                <div >
                    Payable Amount : &#8377;{totalamount - saveamount}
                </div>

            </div>
        )
    }


    const showProductDetails = () => {
        return (
   values!=undefined? values.map((item)=>{
  
        return (
           
            <div>
                     <div style={{ display: 'flex', fontSize: 15, fontWeight: 600 }}>
                            <div>
                                <img src={`${ServerURL}/images/${item.picture}`} width="100" height="100" />
                            </div>
                            <div >
                                <span style={{ marginLeft: 20 }}>{item.productname}</span>
                                <span style={{ marginLeft: 20 }}>X{item.qty}</span>
                                <span style={{ marginLeft: 20 }}>&#8377;{item.price}</span>
                                <br />
                                <span style={{ marginLeft: 25, color: 'green' }}>&#8377;{item.offerprice}</span>
                                <span style={{ marginLeft: 25, textDecoration: 'line-through', color: 'red', }}>&#8377;{item.price}</span>
                                <br /> <div style={{ marginLeft: 25 }}>You Save: <span style={{ marginLeft: 0, color: 'blue', }}> &#8377;{item.price - item.offerprice}</span>
                                </div>
                            </div>
                        </div>
                        <Divider />

                        {showPaymentDetails(item)}
       
                  
            </div>
        )
       
     }) :<></>
        )
    }
    
        




    return (
        <div>

            <ShoppingCart onClick={() => navigate('/cart')} onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />


            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}

                disableRestoreFocus
            >


                <Typography sx={{ p: 1 }}>{showProductDetails()} </Typography>
            </Popover>
        </div>
    );
}
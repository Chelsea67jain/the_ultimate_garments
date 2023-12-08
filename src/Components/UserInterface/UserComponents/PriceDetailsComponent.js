import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import LoginSignUpComponent from "./LoginSignUpComponent";
import { Navigate } from "react-router";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function PriceDetailsComponent(props) {
    var navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

     var cart=useSelector(state=>state.cart)
     var values=Object.values(cart)

    console.log('Values:',values.length);

    var status;

    if (props.status != undefined) {
        status = props.status
    }

    console.log(status)// undefined (for page cart) true (for page address)
    console.log(props.status === true)//false ,true
    console.log(props.status === undefined)//true,false

    console.log('Page:', props.page);

    const [open, setOpen] = useState(false);

    const totalPayableAmount = (a, b) => {
        console.log('a', a)
        console.log('b', b)
        var price = 0
        if (b.offerprice > 0) {
            price = b.offerprice * b.qty
        }
        else {
            price = b.price * b.qty
        }
        return a + price

    }

    const totalAmount = (a, b) => {
        return a + b.price * b.qty

    }



    var tpay = '', totalamount, saveamount;

    if (Array.isArray(values)) {
        console.log(values)

        tpay = values.reduce(totalPayableAmount, 0)
        console.log(tpay)

        totalamount = values.reduce(totalAmount, 0)
        console.log(totalamount)
        saveamount = (totalamount - tpay)

    }



    const handleOpen = () => {
        if (props.page == "MyCart") {
            setOpen(true);
        }
        else if (props.page == "Address") {
            setOpen(false);
            navigate('/paymentgateway',{state:{userData:props.userData}})
        }


    };

    useEffect(function () {
        setOpen(open);
    }, [props])


    return (

        <div style={{ margin: 10, marginBottom: 30 }}>

            <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>
                Price Details ({values.length} item)
            </div>

            <div>
                <Divider sx={{
                    color: '#dfe6e9',
                    marginTop: 2,
                    borderBottomWidth: 5

                }} />
            </div>
            {matches ?

                <>
                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span> Total MRP (Inc.of Taxes)</span>
                        <span>&#8377;{totalamount}</span>
                    </div>

                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Shipping</span>
                        <span style={{ color: '#4cd137' }}>Free</span>
                    </div>

                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <span>Cart Total</span>
                        <span>&#8377;{tpay}</span>
                    </div>

                    <div>
                        <Divider sx={{
                            color: '#dfe6e9',
                            marginTop: 2,
                            borderBottomWidth: 5
                        }} />
                        <>
                            <div>

                                <div style={{ fontSize: 18, marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <span style={{ fontWeight: 500 }}> Total Amount</span>
                                    <span style={{ marginLeft: 140, fontWeight: 'bold' }}>&#8377;{tpay}</span>
                                </div>

                                <Button style={{ background: '#4cd137', width: 550, marginTop: 5 }} variant="contained" fullWidth>You Saved ₹{saveamount} on this order</Button>
                            </div>
                            <div>

                                {props.page == "Address" || props.page == "MyCart" && props.status == undefined || props.status == false && props.status == true ? <><Button style={{ fontSize: 25, background: '#48dbfb', width: 550, height: 40, marginTop: 10 }} variant="contained"
                                    onClick={handleOpen} disabled={false} fullWidth>CheckOut Securely</Button></>

                                    : <><Button style={{ fontSize: 25, background: '#48dbfb', width: 550, height: 40, marginTop: 10 }} variant="contained"
                                        onClick={handleOpen} disabled={true} fullWidth>CheckOut Securely</Button></>}

                            </div>
                        </>

                    </div>
                </>

                :

                <>
                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <span> Total MRP (Inc.of Taxes)</span>
                        <span style={{ marginLeft: 100 }}>&#8377;{totalamount}</span>
                    </div>

                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <span>Shipping</span>
                        <span style={{ marginLeft: 200, color: '#4cd137' }}>Free</span>
                    </div>

                    <div style={{ color: '#95a5a6', marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                        <span>Cart Total</span>
                        <span style={{ marginLeft: 198 }}>&#8377;{tpay}</span>
                    </div>

                    <div>

                        <div style={{ fontSize: 20, marginTop: 5, display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                            <span style={{ fontWeight: 600 }}> Total Amount</span>
                            <span style={{ marginLeft: 140, fontWeight: 'bold' }}>&#8377;{tpay}</span>
                        </div>

                        <div>
                            <Button style={{ background: '#4cd137', width: 600, marginTop: 5 }} variant="contained" fullWidth>You Saved ₹{saveamount} on this order</Button>
                        </div>

                        <div>

                            {props.page == "Address" || props.page == "MyCart" && props.status == undefined || props.status == false && props.status == true ? <Button style={{ fontSize: 25, background: '#48dbfb', width: 600, height: 40, marginTop: 10 }} variant="contained"
                                onClick={handleOpen} disabled={false} fullWidth>CheckOut Securely</Button>

                                : <Button style={{ fontSize: 25, background: '#48dbfb', width: 550, height: 40, marginTop: 10 }} variant="contained"
                                    onClick={handleOpen} disabled={true} fullWidth>CheckOut Securely</Button>
                            }


                        </div>
                    </div>
                    <LoginSignUpComponent open={open} />
                </>
            }
        </div>
    )
}


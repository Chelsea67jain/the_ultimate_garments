import { useEffect, useState } from "react"
import CheckOutStepper from "./UserComponents/CheckOutStepper"
import PaymentSecurityNavbar from "./UserComponents/PaymentSecurityNavbar"
import ProductCartComponent from "./UserComponents/ProductCartComponent"
import { useSelector } from "react-redux"
import CouponComponent from "./UserComponents/CouponComponent"
import PriceDetailsComponent from "./UserComponents/PriceDetailsComponent"
import ProductBenefitComponent from "./UserComponents/ProductBenefitComponent";
import PaymentViaComponent from "./UserComponents/PaymentViaComponent"
import LoginSignUpComponent from "./UserComponents/LoginSignUpComponent"
import AddAddress from "./UserComponents/AddAddress";
import { useLocation } from "react-router"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { postData } from "../Services/NodeServices"

export default function Address(props) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var location = useLocation();
    var cart = useSelector(state => state.cart)
    var values = Object.values(cart)

    var user = useSelector(state => state.user)
    var userData;


    if (user != undefined) {
        console.log(user)
        userData = Object.values(user)[0]
    }

    if (location.state != null) {
        userData = location.state.user[0]
        console.log('UserData:', userData)//{full data in json}     
    }

    const [referesh, setReferesh] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(false);



    const updateCart = () => {
        setReferesh(!referesh)
    }


    const openLoginDialog = (value) => {
        setOpen(value)
    }

    const handleStatus = (value) => {

        console.log('status:', value);
        setStatus(value);
    }

    return (
        <div style={{ background: '#dcdde1' }}>
            <PaymentSecurityNavbar />

            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <CheckOutStepper />

                {matches ?
                    <div style={{ display: 'flex', width: "98%", flexDirection: 'column', justifyContent: 'space-between', background: '#fff', marginLeft: 10, marginRight: 10 }}>
                        <div >
                            <AddAddress status={handleStatus} userData={userData} />
                        </div>

                        <div style={{ width: '100%' }}>
                            <CouponComponent />
                            <PriceDetailsComponent status={status} userData={userData} page={"Address"} values={values} />
                        </div>

                    </div>
                    :
                    <div style={{ display: 'flex', width: "98%", flexDirection: 'row', justifyContent: 'space-between', background: '#fff', marginLeft: 10, marginRight: 10 }}>
                        <div >
                            <AddAddress status={handleStatus} userData={userData} />
                        </div>

                        <div style={{ width: '49%' }}>
                            <CouponComponent />
                            <PriceDetailsComponent status={status} userData={userData} page={"Address"} values={values} />
                        </div>

                    </div>
                }

                <div>
                    <ProductBenefitComponent />
                </div>

                <div>
                    <PaymentViaComponent />
                </div>


            </div>
        </div>
    )
}
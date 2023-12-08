import { useState } from "react"
import CheckOutStepper from "./UserComponents/CheckOutStepper"
import PaymentSecurityNavbar from "./UserComponents/PaymentSecurityNavbar"
import ProductCartComponent from "./UserComponents/ProductCartComponent"
import { useSelector } from "react-redux"
import CouponComponent from "./UserComponents/CouponComponent"
import PriceDetailsComponent from "./UserComponents/PriceDetailsComponent"
import ProductBenefitComponent from "./UserComponents/ProductBenefitComponent";
import PaymentViaComponent from "./UserComponents/PaymentViaComponent"
import LoginSignUpComponent from "./UserComponents/LoginSignUpComponent"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MyCart(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    var cart = useSelector(state => state.cart)
    var values = Object.values(cart)

    const [referesh, setReferesh] = useState(false);
    const [open, setOpen] = useState(false);

    const updateCart = () => {
        setReferesh(!referesh)
    }

    const openLoginDialog = (value) => {
        setOpen(value)
    }

    return (
        <div style={{ background: '#dcdde1' }}>
            <PaymentSecurityNavbar />

            <div style={{ display: 'flex', flexDirection: 'column' }}>

                <CheckOutStepper />

                {matches ?

                    <div style={{ display: 'flex', width: "98%", flexDirection: 'column', justifyContent: 'space-between', background: '#fff',marginLeft:6 }}>
                        <div >
                            <ProductCartComponent values={values} updateCart={updateCart} />
                        </div>

                        <div style={{ width: '100%' }}>
                            <CouponComponent  />
                            <PriceDetailsComponent page={"MyCart"}  />
                        </div>

                    </div>


                    : <div style={{ display: 'flex', width: "98%", flexDirection: 'row', justifyContent: 'space-between', background: '#fff', marginLeft: 10, marginRight: 10 }}>
                        <div >
                            <ProductCartComponent values={values} updateCart={updateCart} />
                        </div>

                        <div style={{ width: '49%' }}>
                            <CouponComponent  />
                            <PriceDetailsComponent page={"MyCart"}  />
                        </div>

                    </div>}

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
import { useEffect, useState, CSSProperties } from "react";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { postData, ServerURL } from "../Services/NodeServices";
import { useLocation,useNavigate } from "react-router";
//https://youtu.be/HWOMQQ1akg0

export default function PaymentGateway(props) {
    var navigate=useNavigate();
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    var location = useLocation();
    var cart = useSelector(state => state.cart)
    var value = Object.values(cart);
    console.log(value);

    var userData = location.state.userData;
    console.log(userData);

    const totalPayableAmount = (a, b) => {

        var price = 0
        if (b.offerprice > 0) {
            price = b.offerprice * b.qty
        }
        else {
            price = b.price * b.qty
        }
        return a + price

    }

    const actualAmount = (a, b) => {
        return a + b.price * b.qty

    }

    var tpay = value.reduce(totalPayableAmount, 0)
    var aamt = value.reduce(actualAmount, 0)
    var na = aamt - tpay


    var options = {
        key: "rzp_test_bseICPiYx3qOcO", // Enter the Key ID generated from the Dashboard
        amount: na * 100, // 1 INR
        currency: "INR",
        name: "TheUltimateGarments.com",

        image: `${ServerURL}/images/logo.png`,

        handler: async function (response) {
            alert('hi');

            alert(response.razorpay_payment_id);
            var response = await postData('userinterface/submit_order',
                {
                    userid: userData.userid,
                    mobilenumber: userData.mobilenumber,
                    emailid: userData.emailid,
                    productid:value[0]?.productid,
                    qty:value[0]?.qty
                })
            if (response.status) {
                alert('Order Submitted')
                

            }
            else {
                alert('Fail to Submit the order');
                
            }

        },
        prefill: {
            name: userData.firstname + " " + userData.lastname,
            contact: userData.mobilenumber,
            email: userData.emailid,

        },
        notes: {
            address: "some address"
        },
        theme: {
            color: "#3399cc"
        }
    };

    const openPayModel = async () => {
        var rzp1 = new window.Razorpay(options);
        await rzp1.open();
        setLoading(!loading);

    }

    function gotoRazorPay() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ background: 'grey' }}>
                    <div className="sweet-loading">
                        <SyncLoader color={color} loading={loading} css={override} size="25" />
                        {openPayModel()}
                    </div>
                </div>
            </div>
        )
    }

    useEffect(function () {
        const script = document.createElement('script')
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        document.body.appendChild(script)
    }, [])



    return (
        <div>
            {gotoRazorPay()}
        </div>
    )
}


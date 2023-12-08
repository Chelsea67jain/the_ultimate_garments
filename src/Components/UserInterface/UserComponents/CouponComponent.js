import { useEffect, useState } from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function CouponComponent(props) {


    const [open, setOpen] = useState(false)

    const handleShowMore = () => {
        setOpen(true)

    }

    const handleShowLess = () => {
        setOpen(false)
    }
    useEffect(function () {
        setOpen(false);
    }, [])

    return (
        <div style={{ margin: 10, marginTop: 10, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div >
                    <LocalOfferIcon />
                </div>
                <div style={{ marginLeft: 2, color: '#95a5a6' }}>
                    Have a coupon/referral code?
                </div>
            </div>

            <div style={{ marginTop: 5, display: 'flex', width: '500px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl sx={{ width: '400px', borderRadius: 40 }}>
                    <OutlinedInput placeholder="Enter Code" />
                </FormControl>
                <div>
                    <Button variant="contained" color="secondary">Apply</Button>
                </div>
            </div>

            <div style={{ color: '#95a5a6', marginTop: 5 }}>
                Flat &#8377;100 on orders above &#8377;999 - TUG100
            </div>

            <div onClick={handleShowMore} style={{ color: '#95a5a6', marginTop: 5 }}>
                Show more....
                {open ?
                    <><ul>
                        <div style={{ color: '#000', fontWeight: 600, display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <div>
                                <li>Flat ₹100 off on orders above ₹999 - BEYOUNG100</li>
                            </div>
                            <div>
                                <li>Flat ₹200 off on orders above ₹1999 (Prepaid orders Only) -  BEYOUNG200</li>
                            </div>
                            <div>
                                <li>Flat ₹300 off on orders above ₹2999 (Prepaid orders Only) - BEYOUNG300</li>
                            </div>
                        </div>
                    </ul>
                        <div onClick={() => handleShowLess()} style={{ color: '#95a5a6', marginTop: 5 }}>
                            Show Less....
                        </div>
                    </>
                    : <></>
                }
            </div>

        </div>



    )
}
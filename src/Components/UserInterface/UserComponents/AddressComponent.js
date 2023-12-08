import React, { useState, useEffect } from "react"
import { Grid, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { postData } from '../../Services/NodeServices';
import { Navigate, useNavigate } from "react-router";
import LoginSignUpComponent from "./LoginSignUpComponent";

export default function AddressComponent(props) {
    // console.log("Address Component userData:", props.userData)// Object
    var navigate = useNavigate();

    const [firstName, setFirstName] = useState(props.userData.firstname)
    const [lastName, setLastName] = useState(props.userData.lastname)
    const [mobileNumber, setMobileNumber] = useState(props.userData.mobilenumber)
    const [pincode, setPincode] = useState('')
    const [town, setTown] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [userid, setUserId] = useState(props.userData.userid);

    const fetchUserData = async () => {
        var response = await postData('userinterface/check_user_mobileno', { mobilenumber: props.userData.mobilenumber })
        setUserId(response.data[0].userid)
        // console.log("Userid:", response.data[0].userid)
    }

    useEffect(function () {
        fetchUserData();
    }, []);

    const handleClick = async () => {

        var body = { userid: userid, pincode: pincode, town: pincode, city: city, state: state, address: address }
        //  console.log("BODY:", body);
        var result = await postData('userinterface/submit_userAddress', body)
        if (result.status) {
            alert("Address Added Successfully");


        }
        else {
            alert("Fail to Add Address...")
        }

    }



    return (
        <Grid container spacing={2}>

            <>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleClick} style={{ background: '#535c68', borderRadius: 5, textTransform: 'capitalize', letterSpacing: 1 }}>Add Address</Button>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        value={firstName}
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        value={lastName}
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        value={mobileNumber}
                        id="outlined-basic"
                        label="Phone No."
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        onChange={(event) => setPincode(event.target.value)}
                        id="outlined-basic"
                        label="PIN CODE"
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        onChange={(event) => setTown(event.target.value)}
                        id="outlined-basic"
                        label="Town/Village"
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        onChange={(event) => setCity(event.target.value)}
                        id="outlined-basic"
                        label="City/District"
                        variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        onChange={(event) => setState(event.target.value)}
                        id="outlined-basic"
                        label="State"
                        variant="outlined" />
                </Grid><Grid item xs={6}>
                    <TextField
                        fullWidth
                        onChange={(event) => setAddress(event.target.value)}
                        id="outlined-basic"
                        label="Address(House No,Building,Street,Area)"
                        variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Make this my Default Address" />

                    </FormGroup>
                </Grid>

            </>
        </Grid>
    )
}
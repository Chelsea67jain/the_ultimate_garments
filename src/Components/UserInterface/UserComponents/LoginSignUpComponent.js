import React, { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useStyles } from "./LoginSignUpComponentCss";
import OtpGenerator from "./OtpGenerator";
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { postData } from "../../Services/NodeServices";
import { useNavigate } from "react-router";



export default function LoginSignUpComponent(props) {

  const classes = useStyles();
  var dispatch = useDispatch();
  var navigate = useNavigate();
  console.log(props.open)
  const [open, setOpen] = useState(props.open);
  const [openOtp, setOpenOtp] = useState(false)
  const [openUserDialog, setOpenUserDialog] = useState(false)
  const [value, setValue] = useState('')
  const [otp, setOtp] = useState('')
  const [userData, setUserData] = useState([])
  const [changeTextColor, setChangeTextColor] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('female')
  const [dob, setDOB] = useState('')
  const [emailid, setEmailId] = useState('')
  

  const fetchUserData = async () => {
    var response = await postData('userinterface/check_user_mobileno', { mobilenumber: mobileNumber })
     
    if (response.status) {
      setUserData(response.data)
      console.log("UserData:",response.data);

      setOpenUserDialog(false)
      navigate('/address', { state: { user: response.data } })
      
    }

    else {
      setOpenUserDialog(true)
    }

  }

  useEffect(function () {
    setOpen(props.open)
  }, [props.open])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const handleContinue = () => {
    setOpen(false);
    setChangeTextColor(true)
  }

  const handleOpenOtp = () => {
    setOpenOtp(true);
    var value = OtpGenerator();
    alert(value);
    setValue(value);
    setOpen(false);
  }

  const handleCloseOtp = () => {
    setOpenOtp(false)
  }
  const handleCloseUserDialog = () => {
    setOpenUserDialog(false)
  }



  const handleClick = async () => {
    var body = { mobilenumber: mobileNumber, emailid: emailid, firstname: firstName, lastname: lastName, gender: gender, dob: dob }
    dispatch({ type: 'ADD_USERDATA', payload: [mobileNumber, body] })
    
    var response = await postData('userinterface/submit_userData', body)
     
    if (response.status) {
      navigate('/address');
      alert("User Added Sucessfully....")
    }
    else {
      alert("Fail to Submit User Data.....")
    }

  }

  const handleOtp = () => {

    if (value == otp) {
      setOpenOtp(false)

      fetchUserData();

    }
    else {
      alert("Invalid Otp....")
    }
  }


  function SignUpDialog() {
    return (

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openUserDialog}
        scroll="paper"
        maxWidth="xs"
        className={classes.alignDialog}
      >

        <div style={{ position: 'relative' }}>
          <img src='./login-image.jpg' width="100%" />
          <div style={{ display: 'flex', justifyContent: 'right', position: 'absolute', zIndex: 1, top: '2%', left: '95%' }}>
            <CloseIcon style={{ color: '#fff' }} onClick={handleCloseUserDialog} />
          </div>
        </div>



        <DialogContent>
          <Typography gutterBottom>
            <div style={{ marginLeft: 10, marginRight: 10, fontSize: 20, fontWeight: 500 }}>
              Signup to get started
            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField size="small" value={mobileNumber} fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />
            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField
                size="small"
                onChange={(event) => setFirstName(event.target.value)}
                required={true}
                fullWidth
                id="outlined-basic"
                label="First Name"
                variant="outlined"
              />

            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField
                size="small"
                onChange={(event) => setLastName(event.target.value)}
                required={true}
                fullWidth
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
              />

            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField size="small" onChange={(event) => setEmailId(event.target.value)} required={true} fullWidth id="outlined-basic" label="Email Address" variant="outlined" />
            </div>
          </Typography>


          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField
                size="small"
                onChange={(event) => setDOB(event.target.value)}
                required={true}
                fullWidth
                type="date"
                id="outlined-basic"

                variant="outlined"
              />
            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginLeft: 12, marginTop: 15, marginRight: 8 }}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  defaultValue="female"
                  onChange={(event) => setGender(event.target.value)}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />

                </RadioGroup>
              </FormControl>
            </div>
          </Typography>



          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <FormControlLabel

                label={<Typography style={{ fontSize: 14 }}>Yes, Keep me posted with current offers, new arrivals, sale and contest"</Typography>}
                control={
                  <Checkbox

                  />
                }
              />
            </div>
          </Typography>


          <Typography gutterBottom>
            <div style={{ marginTop: 20, marginLeft: 8, marginRight: 8 }}>
              <Button size="small" onClick={handleClick} style={{ background: '#000' }} fullWidth variant="contained" >
                <div style={{ textTransform: 'capitalize' }}>Sign Up</div></Button>
            </div>
          </Typography>

        </DialogContent>

      </Dialog>

    )
  }

  function OtpDialog() {
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openOtp}
        scroll="paper"
        maxWidth="xs"
        className={classes.alignDialog}
      >

        <div style={{ position: 'relative' }}>
          <img src='./login-image.jpg' width="100%" />
          <div style={{ display: 'flex', justifyContent: 'right', position: 'absolute', zIndex: 1, top: '2%', left: '95%' }}>
            <CloseIcon style={{ color: '#fff' }} onClick={handleCloseOtp} />
          </div>
        </div>


        <DialogContent>
          <Typography gutterBottom>
            <div style={{ marginLeft: 10, marginRight: 10, fontSize: 20, fontWeight: 500 }}>
              Enter OTP
            </div>
          </Typography>


          <Typography gutterBottom>
            <div style={{ marginLeft: 8, marginTop: 15, marginRight: 8 }}>
              <TextField
                size="small"
                fullWidth
                onChange={(event) => setOtp(event.target.value)}
                id="outlined-basic"
                label="Enter 4 Digit OTP"
                variant="outlined" />
            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginTop: 20, marginLeft: 8, marginRight: 8 }}>
              <Button size="small" onClick={handleOtp} style={{ background: '#000' }} fullWidth variant="contained" >
                <div style={{ textTransform: 'capitalize' }}>Check OTP</div></Button>
            </div>
          </Typography>

        </DialogContent>

      </Dialog>


    )
  }

  return (
    <div >

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="paper"
        maxWidth="xs"
        className={classes.alignDialog}
      >

        <div style={{ position: 'relative' }}>
          <img src='./login-image.jpg' width="100%" />
          <div style={{ display: 'flex', justifyContent: 'right', position: 'absolute', zIndex: 1, top: '2%', left: '95%' }}>
            <CloseIcon style={{ color: '#fff' }} onClick={handleClose} />
          </div>
        </div>


        <DialogContent style={{ margin: 10 }} dividers>
          <Typography gutterBottom>
            <div style={{ marginLeft: 15, marginRight: 10, fontSize: 20, fontWeight: 600 }}>
              Login or Signup
            </div>
          </Typography>
          <Typography gutterBottom>
            <div style={{ marginLeft: 15, marginRight: 10, fontSize: 15, fontWeight: 500 }}>
              Get Exciting Offers & Track Order

            </div>

          </Typography>

          <Typography style={{ marginTop: 20 }} gutterBottom>
            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <TextField
                required={true}
                onChange={(event) => setMobileNumber(event.target.value)}
                fullWidth
                id="outlined-basic"
                label="Phone Number"
                variant="outlined" />
            </div>
          </Typography>

          <Typography gutterBottom>
            <div style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
              <Button onClick={handleOpenOtp} style={{ background: '#000' }} fullWidth variant="contained" ><div style={{ textTransform: 'capitalize' }}>Login with</div> <div style={{ marginLeft: 5 }}>OTP</div></Button>
            </div>
          </Typography>

          <Typography gutterBottom>
            <div onClick={handleContinue} className={changeTextColor ? classes.textShadow : classes.text}>
              Continue <span style={{ textTransform: 'lowercase' }} >as</span> guest
            </div>

          </Typography>
        </DialogContent>

      </Dialog>
      {OtpDialog()}
      {SignUpDialog()}
    </div>
  )
}
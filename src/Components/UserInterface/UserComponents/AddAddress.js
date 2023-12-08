import { useEffect, useState } from 'react';
import { Grid, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import { postData } from '../../Services/NodeServices';
import AddressComponent from './AddressComponent';

export default function AddAddress(props) {
  console.log('AddAddress Page:', props.userData);

  const [userAddress, setUserAddress] = useState({})
  const [userid, setUserId] = useState('');

  const fetchUserAddress = async () => {

    if (props.userData.userid != undefined) {
      setUserId(props.userData.userid)
      // console.log('UserId:',props.userData.userid);

      var result = await postData('userinterface/check_user_address', { userid: props.userData.userid })
      setUserAddress(result);
      console.log("Status:", result.status);
      props.status(result.status);


    }

  }

  useEffect(function () {
    fetchUserAddress();
  }, []);



  const showAddress = (address) => {

    return address.map((item) => {
      return <div>

        <div>{item.address}</div>
        <div>{item.town} {item.pincode}</div>
        <div>{item.city} {item.state}</div>

      </div>
    })
  }

  return (
    <div style={{ margin: 10, padding: 5 }}>

      {userAddress.status ? <>{showAddress(userAddress.data)}</> :
        <AddressComponent userData={props.userData} />
      }
    </div>

  )
}
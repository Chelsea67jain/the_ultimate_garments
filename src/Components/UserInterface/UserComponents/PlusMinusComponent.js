import { useState, useEffect } from "react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Avatar,Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(props.value)
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
 
  const handleClick = () => {

    if (props.value != null) {
      var v = value + 1
      setValue(v);
     

    }
   
    
    props.onChange(v)

  }

  const handlePlus = () => {
    var v = value
    if (v < 5) {
      v++;
      setValue(v)
      props.onChange(v)
    }
  }

  const handleMinus = () => {
    var v = value
    if (v >= 1) {
      v = v - 1;
      setValue(v)
      props.onChange(v)
    }
  }

  return (

    <div >
      {value == null || value == 0  ?
     
       matches?<Button  onClick={handleClick} variant="contained" startIcon={<ShoppingCartIcon />} style={{ background: '#55E6C1',width:'80%'}}>Add to Cart</Button>
       : 
       <Button fullWidth onClick={handleClick} variant="contained" startIcon={<ShoppingCartIcon />} style={{ background: '#55E6C1' }}>Add to Cart</Button>
      
        : <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: 120 }}><Avatar sx={{ bgcolor: '#55E6C1' }} variant="circular" onClick={handleMinus}>
          -
        </Avatar>
          {value}
          <Avatar onClick={handlePlus} sx={{ bgcolor: '#55E6C1' }} variant="circular">
            +
          </Avatar>
         
        </div>
      }


    </div>
  )
}
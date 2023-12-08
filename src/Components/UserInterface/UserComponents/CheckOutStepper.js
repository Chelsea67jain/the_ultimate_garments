import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactsIcon from '@mui/icons-material/Contacts';
import PaymentIcon from '@mui/icons-material/Payment';
import {useStyles} from "./CheckOutStepperCss";

export default function CartComponent(props){
  var classes=useStyles();

    return (
       
             <Box
            
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 700,
          height: 70,
          margin:10,
          padding:2
        },
        justifyContent:'center',
        alignItems:'center',
        
      }}
    >
      
     
      <Paper elevation={3} style={{display:"flex",justifyContent:"center",alignItems:"center",margin:10,flexDirection:"row",justifyContent:"space-between"}} >
    
      
       <div style={{   display: 'flex',
        flexDirection:'column',justifyContent: 'center',
        alignItems: 'center'}}>
        <ShoppingCartIcon  className={classes.circleShadow} />
        <div>
        My Cart
        </div>
       </div>

       <div style={{   display: 'flex',
        flexDirection:'column',justifyContent: 'center',
        alignItems: 'center'}} >
        <ContactsIcon className={classes.circleShadow} />
        <div>
        Address
        </div>
       </div>

       <div style={{   display: 'flex',
        flexDirection:'column',justifyContent: 'center',
        alignItems: 'center'}}>
        <PaymentIcon className={classes.circleShadow} />
        <div>
         Payment
        </div>
       </div>


     

      </Paper>
         
     

    </Box>

     
     
    )
}
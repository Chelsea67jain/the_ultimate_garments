
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function PaymentViaComponent(props) {

   const theme = useTheme();
   const matches = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <>
         {matches ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', width: '100%', margin: 5 }}>
               <div>
                  <img src='Paytm.jpeg' width="120" />
               </div>

               <div>
                  <img src='PayPal.jpg' width="120" />
               </div>

               <div>
                  <img src='UPI.webp' width="120" />
               </div>


               <div>
                  <img src='Google Pay.jpg' width="120" />
               </div>

            </div>
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#fff', width: '100%', padding: 10, margin: 5 }}>
               <div>
                  <img src='Paytm.jpeg' width="200" />
               </div>

               <div>
                  <img src='PayPal.jpg' width="200" />
               </div>

               <div>
                  <img src='UPI.webp' width="200" />
               </div>


               <div>
                  <img src='Google Pay.jpg' width="200" />
               </div>

            </div>
         }
      </>
   )
}
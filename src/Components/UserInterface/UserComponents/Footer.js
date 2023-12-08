import { useEffect } from "react"
import { Grid } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Footer(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));



  return (
    <>
      <div style={{ height: 400, width: '100%', background: 'linear-gradient(to right,#000,#718093)' }}>
       {matches?
        <Grid container spacing={1} style={{ margin: 10, padding: 10 }}>
        
        <Grid item xs={6} style={{ color: '#fff',fontSize:16 }}>
          <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
          Company
          </div>

          <div>
           About us
          </div>

          <div>
           The Ultimate Garments Blog
          </div>

          <div>
            Collaboration
            </div>
           
           <div>
            Terms and Conditions
           </div>

           <div>
            Privacy Policy
           </div>

           <div>
            Shipping Policy
           </div>

           <div>
            Media
           </div>
        </Grid>

        <Grid item xs={6} style={{ color: '#fff',fontSize:16 }}>
          <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
          Need help
          </div>

          <div>
          Contact Us
          </div>

          <div>
           Return, Refund and Cancellation
          </div>

          <div>
           FAQ's
            </div>
           
           <div>
           Track Order
           </div>

           <div>
            Career
           </div>

           <div>
            Sitemap
           </div>
        </Grid>

        <Grid item xs={6} style={{ color: '#fff',fontSize:16 }}>
          <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
            Location
          </div>

          <div>
            support@theUltimateGarments.in
          </div>

          <div>
            Eklingpura Chouraha, Ahmedabad Main
            Road (NH 8 - Near Mahadev Hotel)
            Udaipur, India 313002
          </div>

        </Grid>

        <Grid item xs={6} style={{ color: '#fff',fontSize:16 }}>
          <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
            lets be friends
          </div>
       
          <div style={{display:'flex',flexDirection:'row'}}>
          <FacebookIcon />
         
           <TwitterIcon/>
        
<InstagramIcon />
            
              <LinkedInIcon />
            </div>

        </Grid>




     </Grid>
:

        <Grid container spacing={1} style={{ margin: 10, padding: 10 }}>
        
          <Grid item xs={3} style={{ color: '#fff',fontSize:16 }}>
            <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
            Company
            </div>

            <div>
             About us
            </div>

            <div>
             The Ultimate Garments Blog
            </div>

            <div>
              Collaboration
              </div>
             
             <div>
              Terms and Conditions
             </div>

             <div>
              Privacy Policy
             </div>

             <div>
              Shipping Policy
             </div>

             <div>
              Media
             </div>
          </Grid>

          <Grid item xs={3} style={{ color: '#fff',fontSize:16 }}>
            <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
            Need help
            </div>

            <div>
            Contact Us
            </div>

            <div>
             Return, Refund and Cancellation
            </div>

            <div>
             FAQ's
              </div>
             
             <div>
             Track Order
             </div>

             <div>
              Career
             </div>

             <div>
              Sitemap
             </div>
          </Grid>

          <Grid item xs={3} style={{ color: '#fff',fontSize:16 }}>
            <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
              Location
            </div>

            <div>
              support@theUltimateGarments.in
            </div>

            <div>
              Eklingpura Chouraha, Ahmedabad Main
              Road (NH 8 - Near Mahadev Hotel)
              Udaipur, India 313002
            </div>

          </Grid>

          <Grid item xs={3} style={{ color: '#fff',fontSize:16 }}>
            <div style={{marginBottom:10,fontSize:18,textTransform:'uppercase'}}>
              lets be friends
            </div>
         
            <div style={{display:'flex',flexDirection:'row'}}>
            <FacebookIcon />
           
             <TwitterIcon/>
          
<InstagramIcon />
              
                <LinkedInIcon />
              </div>

          </Grid>




       </Grid>
}
      </div>
  </> 
)}


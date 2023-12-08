import { makeStyles } from "@mui/styles";

const useStyles=makeStyles({
  mainContainer:{
    display:'flex',
    justifyContent:'center',
  
    width:'100vw',
    height:'100vh',
    background:'#95a5a6', 
   

  },
  box:{
   width:'50%',
   height:'45%',
   background:'#FFF',
  marginTop:'5%',
   borderRadius:'5%',
   marginRight:'15%'
   
  },
  heading: {
    width: '300',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    display:'flex',
    justifyContent:'center',
}


})
export {useStyles};

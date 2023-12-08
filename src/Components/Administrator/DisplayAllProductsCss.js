import { makeStyles } from "@mui/styles";

const useStyles=makeStyles({
  mainContainer:{
    width:'100vw',
    height:'100vh',
    background:'#95a5a6', 
    display:'flex',
   justifyContent:'center',

  },
  
  box:{
   width:'70%',
   background:'#FFF',
   marginTop:'1%',
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

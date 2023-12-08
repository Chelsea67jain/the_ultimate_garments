import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:'silver',
        height:'100vh'
    },
    subdiv: { 
        width:'50%',
        borderRadius: 5,
        padding:10,
        marginTop: 50,
        marginBottom:80,
        backgroundColor:'white'
      
    },
    heading: {
        width: '300',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        display:'flex',
        justifyContent:'left',
    }

})

export {useStyles};

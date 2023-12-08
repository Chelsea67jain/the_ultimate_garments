import { makeStyles } from "@mui/styles"

const useStyles=makeStyles({
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
        padding: 20,
        marginTop: 40,
        marginBottom:'8%',
        backgroundColor:'white'
      
    },
    heading: {
        width: '200',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
        display:'flex',
        justifyContent:'center',
    }


})

export {useStyles};

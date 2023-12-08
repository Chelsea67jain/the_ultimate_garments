import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'silver',
        height: '100vh',
        width:'90wh'
    },
    subdiv: {
        width: '60%',
        height:'auto',
        marginBottom: 80,
        borderRadius: 5,
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white'

    },
    heading: {
        width: '300',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1,
       
    }

})

export { useStyles };

import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
    topBarText: {
        width: '100%',
        height: '20px',
        background: '#7f8c8d',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center'
    },
    productNameCss: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    offerPrice: {
      
        fontWeight: "bold",
        fontSize: 18
    },
    responsiveOfferPrice:{
        display: 'flex',
        flexDirection: 'column',
        fontWeight: "bold",
        fontSize: 18
    },
    size: {
        fontWeight: 600,
        fontSize: 18,
        textTransform: 'uppercase'
    },
    sizeChart: {
        color: '#00a8ff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    circle: {
        marginLeft: 5,
        border: '1px #48dbfb solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20
    },
    circleShadow: {
        marginLeft: 5,
        border: '2px #48dbfb solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20
    }
})

export { useStyles };
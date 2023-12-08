import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ServerURL } from '../../Services/NodeServices';

export default function PaymentSecurityNavbar(props) {


    return (
        <div>
            <Box style={{}}>
                <AppBar position="static" color="inherit">
                    <Toolbar>

                        <div style={{ display: 'flex', width: "100%", height: 100, justifyContent: 'right', marginRight: 100 }}>
                            <div style={{ display: 'flex', width: '50%', justifyContent: 'left' }}>
                                <img src={`${ServerURL}/images/logo.png`} width="140" height="100" />
                            </div>
                            <div style={{ width: 400, height: 100, background: "#dcdde1", display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                                <div>
                                    <img src="./payment security.png" width="80" height="80" />
                                </div>

                                <div style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: 25 }}>
                                    100% Secure Payments
                                </div>
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
        </div>

    )
}
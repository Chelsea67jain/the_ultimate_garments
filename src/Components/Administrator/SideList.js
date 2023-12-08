import * as React from "react";
import Divider from '@mui/material/Divider';
import { useStyles } from "./SidelistCss";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers'; 
import ImageIcon from "@mui/icons-material/Image";

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useNavigate } from "react-router-dom";

export default function SideList(props) { 
    const classes=useStyles();
    return (
        <div >

            <React.Fragment>


                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>


                <Link to='/dashboard/category' className={classes.link}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItemButton>
                </Link>


                <Link to="/dashboard/subcategory" className={classes.link} >
                    <ListItemButton  >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sub Categories" />
                    </ListItemButton>
                </Link>


                <Link to="/dashboard/products" className={classes.link}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Products" />
                    </ListItemButton>
                </Link>

                <Link to="/dashboard/size" className={classes.link}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Size" />
                    </ListItemButton>
                </Link>

                <Link to="/dashboard/color" className={classes.link} >
                    <ListItemButton>
                        <ListItemIcon>
                            <LayersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Colors" />
                    </ListItemButton>
                </Link>

                <Link to="/dashboard/bannerimages" className={classes.link} >
                    <ListItemButton>
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Banner Images" />
                    </ListItemButton>
                </Link>

                <Link to="/dashboard/productimages" className={classes.link} >
                    <ListItemButton>
                        <ListItemIcon>
                            <ImageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Product Images" />
                    </ListItemButton>
                </Link>

            
            </React.Fragment>
            <Divider />
            <React.Fragment>
            <ListSubheader component="div" inset>
              Saved reports
            </ListSubheader>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Current month" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Last quarter" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Year-end sale" />
            </ListItemButton>
          </React.Fragment>


        </div>


    )
}

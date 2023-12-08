import React, { useState } from 'react';
import { TextField, Button, Grid } from "@mui/material"
import { useStyles } from "./CategoryCss";
import { postData } from '../Services/NodeServices';
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router';

export default function Category(props) {
    const classes = useStyles();
    const navigate=useNavigate();
    
    const [categoryName, setCategoryName] = useState('')
    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryname', categoryName);
        formData.append('icon', icon.bytes)
        var response = await postData('category/add_new_category', formData, true)
       // alert(JSON.stringify(response)); 
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully',
                text: 'Something went wrong!',
                
              })

        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Fail to save the Record',
                text: 'Something went wrong!',
                
              })
        }

    }
    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{display:'flex'}}>
                        <div className={classes.heading}>
                            Category Interface
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',width:'60%'}}>
                            <Avatar src='/report.jpg' width='30' onClick={()=>navigate('/dashboard/displayallcategory')}></Avatar>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setCategoryName(event.target.value)} label='Category Name' variant='outlined' fullWidth></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onChange={handleIcon} variant="contained" component="label" fullWidth>
                            Upload
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }} >
                        <Avatar
                            alt="Remy Sharp"
                            src={icon.url}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>

        </div>
    )
}
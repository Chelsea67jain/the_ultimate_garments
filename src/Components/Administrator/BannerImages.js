import React, { useState } from 'react';
import { TextField, Button, Grid } from "@mui/material"
import { useStyles } from "./CategoryCss";
import { postData } from '../Services/NodeServices';
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2"
import { useNavigate } from 'react-router';
import { DropzoneArea } from 'material-ui-dropzone';

export default function BannerImages(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    const [getFiles, setFiles] = useState('')

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files);
    }

    const handleSubmit = async () => {
         var formData=new FormData();
         getFiles.map((item,index)=>{
            formData.append("picture"+index,item)
         })
    

        var response = await postData('products/add_new_banners',formData, true)
        // alert(JSON.stringify(response)); 
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Successfully',
                text: 'Something went wrong!',

            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to save the Record',
                text: 'Something went wrong!',

            })
        }

    }


    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <div className={classes.heading} >
                            Banner Interface
                        </div>
                       
                    </Grid>
                    <Grid item xs={12}>

                        <DropzoneArea
                            onChange={handleSave}
                            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                          //  showPreviews={true}
                            maxFileSize={5000000}
                            filesLimit={6}

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
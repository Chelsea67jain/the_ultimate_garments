import React, { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import { useStyles } from './DisplayAllSubCategoryCss';
import { getData, postData } from '../Services/NodeServices';
import { ServerURL } from '../Services/NodeServices';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField, Grid } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DisplayAllSubCategory() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [subCategories, setSubCategories] = useState([])
    const [subCategoryId, setSubCategoryId] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [subCategoryIcon, setSubCategoryIcon] = useState({ url: '/icon.jpg', bytes: '' })
    const [BtnStatus, setBtnStatus] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [oldIcon, setOldIcon] = useState('');
    const[bannerPriority,setBannerPriority]=useState('')

    const handleIcon = (event) => {

        setSubCategoryIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true)

    }
    const fetchAllSubCategory = async () => {

        var result = await getData('subcategory/display_subcategory')
        //   alert(result.data)
        setSubCategories(result.data);

    }

    useEffect(function () {
        fetchAllSubCategory();
    }, [])

    const handleOpen = (rowData) => {
        setOpen(true);
        setSubCategoryId(rowData.subcategoryid);
        setSubCategoryName(rowData.subcategoryname);
        setSubCategoryIcon({ url: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
        setBannerPriority(rowData.bannerpriority);
        setOldIcon(`${ServerURL}/images/${rowData.icon}`);
        
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEdit = async () => {

        var body = { subcategoryname: subCategoryName,subcategoryid: subCategoryId,bannerpriority:bannerPriority }
      // console.log(body);
       
        var result = await postData('subcategory/edit_subcategory',body)
        
        if (result.status) {
            setOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',
                text: 'Something went wrong!',

            })

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Fail to Update the Record',
                text: 'Something went wrong!',

            })
        }
        fetchAllSubCategory();

    }

    const handleDelete = async () => {
        setOpen(false);
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then(async (res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
                var body = { subcategoryid: subCategoryId }
                var result = await postData('subcategory/delete_subcategory', body)

                Swal.fire('Deleted!', '', 'success')
            } else if (res.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
            else {
                Swal.fire('Server Error', '', 'error')
            }
        })
        fetchAllSubCategory();


    }

    const handleSave = async () => {
        setOpen(false);
        var formData = new FormData();
        formData.append('subcategoryid', subCategoryId)
        formData.append('icon', subCategoryIcon.bytes)
        var result = await postData('subcategory/upload_subcategoryicon', formData, true);
        // alert(result.status);
        setBtnStatus(false);
        setUploadBtn(true);
        fetchAllSubCategory();
        setOldIcon('')
    }

    const handleCancel = () => {
        setBtnStatus(false)
        setUploadBtn(false);
        setSubCategoryIcon({ url: oldIcon, bytes: '' })
        
    }
    const saveAndCancelBtn = () => {
        return (
            <div>
                {BtnStatus ? <div style={{ width: '250', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button onClick={handleSave} variant='contained' color='primary'>Save</Button>
                    <Button onClick={handleCancel} variant='contained' color='secondary'>Cancel</Button></div> : <></>}
            </div>

        )
    }
    const handlePriorityChange = (event) => {
        setBannerPriority(event.target.value)
       
    }

    function showSubCategory() {
        return (
            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >


                    <DialogContent>
                        
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className={classes.heading}>
                                            Edit SubCategory
                                        </div>


                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField value={subCategoryId} label='SubCategory Id' variant='outlined' fullWidth></TextField>

                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField value={subCategoryName} onChange={(event) => setSubCategoryName(event.target.value)} label='SubCategory Name' variant='outlined' fullWidth></TextField>
                                    </Grid>

                                    <Grid item xs={6}>
                                      <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Banner Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bannerPriority}
                                label="Banner Priority"
                                onChange={handlePriorityChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                 <MenuItem value={2}>2</MenuItem>
                                 <MenuItem value={3}>3</MenuItem>
                                 <MenuItem value={4}>4</MenuItem> 
                                 
                          
                            </Select>
                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Button onClick={() => handleEdit()} variant='contained' fullWidth>Edit</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={() => handleDelete()} variant='contained' fullWidth>Delete</Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Button disabled={uploadBtn} variant="contained" component="label" fullWidth>
                                            Upload
                                            <input onChange={handleIcon} hidden accept="image/*" multiple type="file" />
                                        </Button>

                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={subCategoryIcon.url}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        {saveAndCancelBtn()}
                                    </Grid>



                                </Grid>
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }

    function displaySubCategories() {
        return (

            <MaterialTable
                title="SubCategory List"
                columns={[
                    { title: 'SubCategoryId', field: 'subcategoryid' },
                    { title: 'CategoryName', field: 'cn' },
                    { title: 'SubCategoryName', field: 'subcategoryname' },
                    {
                        title: 'Icon',
                        render: (rowData) => <img src={`${ServerURL}/images/${rowData.icon}`} width='30' height='30' />
                    },
                    { title: 'Banner Priority', field: 'bannerpriority' },

                ]}
                data={subCategories}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit SubCategory',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/subcategory')
                    }
                ]}
            />
        )
    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {displaySubCategories()}
            </div>
            {showSubCategory()}
        </div>
    )


}
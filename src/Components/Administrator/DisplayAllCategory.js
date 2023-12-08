import { useEffect, useState } from 'react';
import MaterialTable from '@material-table/core';
import { getData, postData } from '../Services/NodeServices';
import { useStyles } from './DisplayAllCategoryCss';
import { ServerURL } from '../Services/NodeServices';
import { Button, Grid, TextField, Avatar } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

export default function DisplayAllCategory(props) { 
    const classes = useStyles(); 
    const navigate=useNavigate();

    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [BtnStatus, setBtnStatus] = useState(false)
    const [oldIcon, setOldIcon] = useState('');
    const [uploadBtn, setUploadBtn] = useState(false);

    const [icon, setIcon] = useState({ url: '/icon.jpg', bytes: '' })

    const handleIcon = (event) => {
        setIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true);
        
    }

   
    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_category')
        setCategories(response.data);

    }
    useEffect(function () {
        fetchAllCategory();

    }, [])
    
    const handleOpen = (rowData) => {
        setCategoryId(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setOldIcon(`${ServerURL}/images/${rowData.icon}`)
        setIcon({ url: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    }
  
    const handleCancel = () => {
        setBtnStatus(false)
        setIcon({ url: oldIcon, bytes: '' })
        setUploadBtn(true)
        setOldIcon('')
        
    }

    const handleSavePicture = async () => { 
        var formData = new FormData();
        formData.append('categoryid', categoryId)
        formData.append('icon', icon.bytes)
        var result = await postData('category/upload_icon', formData, true)
      //  alert(result.status)
        setBtnStatus(false)
        setUploadBtn(false)
        setOldIcon('')
        fetchAllCategory();
    }

    const handleDeleteCategory = async () => { 
    setOpen(false);

        Swal.fire({
            title: 'Do you want to Delete the changes?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then(async(result) => { 
             
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) { 
                var body = { categoryid: categoryId }
                var result = await postData('category/delete_category_data', body);
              Swal.fire('Deleted!', '', 'success')
            
            } 

           
            else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
            else{
                Swal.fire('Server Error', '', 'error')
            }
          })
          fetchAllCategory();
        
    



    }
    const handleEditCategory = async () => {

        var body = { categoryname: categoryName, categoryid: categoryId }
        var result = await postData('category/edit_category_data', body);
        if(result.status){
            setOpen(false)
            Swal.fire({
                icon: 'success',
                title: 'Record Updated Successfully',
              
                
              })

        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Fail to Update the Record',
                text: 'Something went wrong!',
                
              })
        }
        fetchAllCategory();

    }
    const saveAndCancelBtn = () => {
        return (
            <div>
                {BtnStatus ? <div style={{ width: '250', display: 'flex', justifyContent: 'space-evenly' }}><Button onClick={handleSavePicture} variant='contained' color='primary'>Save</Button>
                    <Button onClick={handleCancel} variant='contained' color='secondary'>Cancel</Button></div> : <></>}
            </div>
        )

    }
    const showCategory = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent>
                        <div >
                            <div>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} className={classes.heading}>
                                        Edit Category
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField value={categoryName} onChange={(event) => setCategoryName(event.target.value)} label='Category Name' variant='outlined' fullWidth></TextField>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Button color='primary' onClick={handleEditCategory} variant='contained' fullWidth>Edit</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button color='primary' onClick={handleDeleteCategory} variant='contained' fullWidth>Delete</Button>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Button disabled={uploadBtn} variant="contained" color='primary' component="label" fullWidth>
                                            Upload
                                            <input onChange={handleIcon} hidden accept="image/*" multiple type="file" />
                                        </Button>

                                    </Grid>
                                    <Grid item xs={3} style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={icon.url}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} >
                                        {saveAndCancelBtn()}
                                    </Grid>



                                </Grid>

                            </div>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
    function displayCategories() {
        return (
            <MaterialTable
                title="List of Categories"
                columns={[
                    { title: 'Category Id', field: 'categoryid' },
                    { title: 'Category Name', field: 'categoryname' },
                    {
                        title: 'Icon',

                        render: (rowData) => <img src={`${ServerURL}/images/${rowData.icon}`} width='30' height='30' />
                    }

                ]}
                data={categories}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Category',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add User',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/category')
                    }
                ]}


            />
        )
    }

    return (
        <div className={classes.mainContainer} >
            <div className={classes.box}>
                {displayCategories()}
            </div>
            {showCategory()}
        </div>
    )
}
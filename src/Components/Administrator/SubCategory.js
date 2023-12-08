import React, { useEffect, useState } from 'react'
import { useStyles } from './SubCategoryCss'
import { TextField, Button, Grid } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import { getData, postData } from '../Services/NodeServices';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
export default function SubCategory(props) {
    const classes = useStyles(); 
    const navigate=useNavigate();
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('')
    const [subCategoryIcon, setSubCategoryIcon] = useState({ url: '/icon.jpg', bytes: '' })
   const[bannerPriority,setBannerPriority]=useState('')
   
    const fetchAllCategory = async () => {

        var result = await getData('category/display_all_category')
        setCategoryList(result.data)

    }
    

    
    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append('categoryid', categoryId);
        formData.append('subcategoryname', subCategoryName);
        formData.append('icon', subCategoryIcon.bytes)
        formData.append('bannerpriority',bannerPriority)
        var response = await postData('subcategory/add_new_subcategory', formData, true)
        
        if(response.status){
            Swal.fire({
                icon: 'success',
                title: 'Record Submitted Record',
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

    const handleReset = () => {
        setCategoryId('')
        setSubCategoryName('')
        setSubCategoryIcon({ url: '/icon.png', bytes: '' })
    }

    const handleIcon = (event) => {
        setSubCategoryIcon({ url: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }

    useEffect(function(){
        fetchAllCategory();
    },[])

    



     
    const fillCategories=()=>{

      return categoryList.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
    }

  

    const handleChange = (event) => {
        setCategoryId(event.target.value)
       
    }

    const handlePriorityChange = (event) => {
        setBannerPriority(event.target.value)
       
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{display:'flex'}}>
                        <div className={classes.heading}>
                            SubCategory Interface
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end',width:'50%'}}>
                            <Avatar src='/report.jpg' width={30} onClick={()=>navigate('/dashboard/displayallsubcategory')}></Avatar>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="CategoryId"
                                onChange={handleChange}
                            >
                                 
                               {fillCategories()}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setSubCategoryName(event.target.value)} label='SubCategory Name' variant='outlined' fullWidth></TextField>
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
                        <Button variant="contained" component="label" fullWidth>
                            Upload SubCategory Icon
                            <input onChange={handleIcon} hidden accept="image/*" multiple type="file" />
                        </Button>

                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }} >
                        <Avatar
                            alt="Remy Sharp"
                            src={subCategoryIcon.url}
                            sx={{ width: 56, height: 56 }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => handleSubmit()} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => handleReset()} variant='contained' fullWidth>Reset</Button>
                    </Grid>

                </Grid>

            </div>

        </div>
    )



}
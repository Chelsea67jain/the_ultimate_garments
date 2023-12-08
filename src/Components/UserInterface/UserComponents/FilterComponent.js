import React, { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Divider } from "@mui/material";
import { useParams } from "react-router";
import { getData, postData } from "../../Services/NodeServices";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function FilterComponent(props) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  
  const [sizeList, setSizeList] = useState([])
  const [colorList, setColorList] = useState([])
  const [sizeStatus, setSizeStatus] = useState(false)
  const [priceStatus, setPriceStatus] = useState(false)
  var { id } = useParams();

  const showSize = () => {

    return sizeList.map((item) => {
      return <div style={{ fontSize: 16, fontWeight: 500 }} >{item}</div>
    })

  }

  // const showColors = () => {


  //   console.log(colorList)
  //   return colorList.map((item, index) => {

  //     return <div style={{backgroundColor:{item}}}>
  //      {item}
  //     </div>

  //   })
  // }

  const handleSizeClick = () => {
    setSizeStatus(true)
    if (sizeStatus) {
      setSizeStatus(false)
    }
  }
  const handlePriceClick = () => {
    setPriceStatus(true)
    if (priceStatus) {
      setPriceStatus(false)
    }
  }

  const handleSize = async () => {
    console.log('ID:', id);
    var body = { subcategoryid: id }
    var response = await postData('size/display_size_of_products_by_subcategory', body)
    console.log(response.data);
    setSizeList(JSON.parse(response.data.size));

  }


  // const handleColor = async () => {
  //   console.log('ID:', id);
  //   var body = { subcategoryid: id }
  //   var response = await postData('color/display_color_of_products_by_subcategory', body)

  //   var xx = response.data.map((item, index) => {

  //     item[index] = item.color
  //     return item[index]
  //   })
  //   console.log(xx);
  //   setColorList(xx);
  // }


  const fetchAllProducts = async (ch) => {
    var result;
    if (ch == 1) {
      result = await getData('userinterface/fetch_all_products_by_LTH')
    }
    else {
      result = await getData('userinterface/fetch_all_products_by_HTL')
    }
    props.setProductList(result.data);

  }

  const handleRadioLTH = () => {
    fetchAllProducts(1)
  }

  const handleRadioHTL = () => {

    fetchAllProducts(2)
  }

  const showPrice = () => {
    return (
      <FormGroup>
        <RadioGroup>
          <FormControlLabel value="HTL" control={<Radio onChange={() => handleRadioLTH()} />} label="Low to High" />
          <FormControlLabel value="LTH" control={<Radio onChange={() => handleRadioHTL()} />} label="High to Low" />
        </RadioGroup>
      </FormGroup>
    );

  }

  useEffect(function () {
    handleSize();
  }, []);



  return (
    <Box
      sx={{

        '& > :not(style)': {
          m: 1,
          width: matches?250:300,
          height: 600,
        },
        marginBottom: 10
      }}
    >

      <Paper elevation={1} >
        <div style={{ marginLeft: 5 }}>
          <div style={{ color: '#000', fontSize: 30, textTransform: 'capitalize', fontWeight: 600, letterSpacing: 1 }}>
            <div>
              Filter
            </div>

          </div>

          <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-between', color: '#000', fontSize: 20, textTransform: 'capitalize', fontWeight: 500, letterSpacing: 1 }} >
            <div>
              Size
            </div>
            <div>
              <KeyboardArrowDownIcon onClick={() => handleSizeClick()} fontSize="large" />

            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sizeStatus ? <div>{showSize()}</div> : <></>}
          </div>

          <div style={{ display: 'flex', marginTop: 20, justifyContent: 'space-between', color: '#000', fontSize: 20, textTransform: 'capitalize', fontWeight: 500, letterSpacing: 1 }} >
            <div>
              Price
            </div>
            <div>
              <KeyboardArrowDownIcon onClick={() => handlePriceClick()} fontSize="large" />

            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {priceStatus ? <div>{showPrice()}</div> : <></>}
          </div>
        </div>
      </Paper>

    </Box>
  )
}
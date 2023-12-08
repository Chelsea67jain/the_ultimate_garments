import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { ServerURL } from '../../Services/NodeServices';
import PlusMinusComponent from './PlusMinusComponent';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ProductCartComponent(props) {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [qty, setQty] = useState(0)
  const [referesh, setReferesh] = useState(false);

  var dispatch = useDispatch();


  const totalPayableAmount = (a, b) => {
    console.log('a', a)
    console.log('b', b)
    var price = 0
    if (b.offerprice > 0) {
      price = b.offerprice * b.qty
    }
    else {
      price = b.price * b.qty
    }
    return a + price

  }

  const totalAmount = (a, b) => {
    return a + b.price * b.qty

  }


  var tpay = '', totalamount, saveamount;

  if (Array.isArray(props.values)) {
    var value = props.values

    tpay = value.reduce(totalPayableAmount, 0)


    totalamount = value.reduce(totalAmount, 0)
    console.log(totalamount)
    saveamount = (totalamount - tpay)

  }


  const handleQtyChange = (value, product) => {

    alert(value)
    if (value == 0) {

      dispatch({ type: 'DELETE_CART', payload: [product.productid] })

    }
    else {
      setQty(value)
      product['qty'] = value


      dispatch({ type: 'ADD_CART', payload: [product.productid, product] })

    }
    setReferesh(!referesh)
    props.updateCart();


  }


  return (
    props.values.length == 0 ? <div style={{ margin: 10 }}>Not Found</div> :
      props.values.map((item) => {

        return (
          <>
            {matches ?
              <div style={{ marginTop: 20, marginLeft: 20, border: '2px solid #dcdde1', width: 450, padding: 10, display: 'flex', flexDirection: 'row', fontWeight: 'bold' }}>
                <img src={`${ServerURL}/images/${item.picture}`} width="200" />
                <div style={{ marginLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}> {item.productname}</div>

                  <div style={{ display: 'flex', flexDirection: 'row', width: 100, justifyContent: 'space-between' }}>
                    <span style={{ textDecoration: 'line-through', color: 'red' }}>&#8377; {item.price * item.qty}</span>
                    <span style={{ color: 'green' }}>&#8377;{item.offerprice * item.qty}</span>

                  </div>

                  <div style={{ color: 'green' }}>
                    Saving: &#8377;{(item.price * item.qty) - (item.offerprice * item.qty)}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
                    <div style={{ textTransform: 'uppercase' }}>
                      Size: {item.selectedSize}
                    </div>

                    <div>
                      Qty: {item.qty}
                    </div>
                  </div>
                  <PlusMinusComponent value={qty} onChange={(value) => handleQtyChange(value, item)} />

                </div>

                <div style={{ color: '#dcdde1', fontWeight: "bold" }}>
                  REMOVE ITEM
                </div>

              </div>
              :
              <div style={{ marginTop: 20, marginLeft: 20, border: '2px solid #dcdde1', width: 600, padding: 10, display: 'flex', flexDirection: 'row', fontWeight: 'bold' }}>
                <img src={`${ServerURL}/images/${item.picture}`} width="200" />
                <div style={{ marginLeft: 50, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}> {item.productname}</div>

                  <div style={{ display: 'flex', flexDirection: 'row', width: 100, justifyContent: 'space-between' }}>
                    <span style={{ textDecoration: 'line-through', color: 'red' }}>&#8377; {item.price * item.qty}</span>
                    <span style={{ color: 'green' }}>&#8377;{item.offerprice * item.qty}</span>

                  </div>

                  <div style={{ color: 'green' }}>
                    Saving: &#8377;{(item.price * item.qty) - (item.offerprice * item.qty)}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 120 }}>
                    <div style={{ textTransform: 'uppercase' }}>
                      Size: {item.selectedSize}
                    </div>

                    <div>
                      Qty: {item.qty}
                    </div>
                  </div>
                  <PlusMinusComponent value={qty} onChange={(value) => handleQtyChange(value, item)} />

                </div>

                <div style={{ color: '#dcdde1', fontWeight: "bold" }}>
                  REMOVE ITEM
                </div>

              </div>
            }
          </>


        )

      })


  )
}
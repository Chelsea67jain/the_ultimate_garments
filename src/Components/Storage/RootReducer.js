const initialState = {
    cart: {},
    user:{}
}

export default function RootReducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_CART':
            state.cart[[action.payload[0]]] = action.payload[1]
            console.log('CART', state.cart)
            return ({ cart: state.cart,user:state.user })

        case 'ADD_USERDATA':
        state.user[[action.payload[0]]]=action.payload[1]
        console.log("REDUX",state.user)
        return ({cart: state.cart,user:state.user })
        
        case 'DELETE_CART':
            delete state.cart[[action.payload[0]]]
            console.log('DELETE CART:', state.cart)
            return ({ cart: state.cart,user:state.user  })
        default:
            return state;
    }
}
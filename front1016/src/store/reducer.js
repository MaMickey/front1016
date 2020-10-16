import {headerReducer} from '../redux'
import {productReducer} from '../pages/product/store'
import {detailReducer} from '../pages/detail/store'
import {cartReducer} from '../pages/cart/store'
import {registerReducer} from '../pages/register/store'
import {loginReducer} from '../pages/login/store'
import {backtopReducer} from '../common/backtop/store'
import {checkoutReducer} from '../pages/checkout/store'
import {orderReducer} from '../pages/order/store'
import {orderDetailReducer} from '../pages/orderdetail/store'
import {paypalReducer} from '../pages/paypal/store'
import {wishReducer} from '../pages/wishlist/store'
import {calpostageReducer} from '../pages/calpostage/store'
import {adminReducer} from '../pages/admin/store'
import {accountReducer} from '../pages/account/store'
import {addressEditReducer} from '../pages/addressEdit/store'
import {forgetpwdReducer} from '../pages/forgetpassword/store'
import { combineReducers } from 'redux'
export default combineReducers({
    headerReducer,
    productReducer,
    detailReducer,
    cartReducer,
    registerReducer,
    loginReducer,
    backtopReducer,
    checkoutReducer,
    orderReducer,
    orderDetailReducer,
    paypalReducer,
    wishReducer,
    calpostageReducer,
    adminReducer,
    accountReducer,
    addressEditReducer,
    forgetpwdReducer
})
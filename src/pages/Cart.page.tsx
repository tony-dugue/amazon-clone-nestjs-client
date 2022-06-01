import HeaderComponent from "../features/products/components/Header.component";
import ProductComponent from "../features/products/components/Product.component";
import {useAppSelector} from "../hooks/redux/hook";

const CartPage = () => {

  const { cart } = useAppSelector( state => state.product)

  const totalQty = cart.reduce( (acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce( (acc, item) => acc + item.quantity * item.price, 0)

  return (
   <div>
     <HeaderComponent />

     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', alignItems: 'center', marginTop: '48px' }}>
       {cart.length > 0 && cart.map( product => <ProductComponent key={product._id} product={product} />)}
     </div>

     <div style={{ width: '80%', margin: 'auto' }}>
       <hr style={{ marginTop: '16px' }} />
       <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '20px' }}>
         <span style={{ marginRight: '16px' }}>Subtotal ({totalQty}) produits:</span>
         <span style={{ fontWeight: 500, marginBottom: '48px' }}>{totalPrice.toFixed(2)} €</span>
       </div>
     </div>

   </div>
  )
}

export default CartPage

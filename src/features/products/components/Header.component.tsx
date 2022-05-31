import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import { AppBar, Badge, Box, Button, Toolbar } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import {useAppDispatch, useAppSelector} from "../../../hooks/redux/hook";
import {logout, selectedUser} from "../../auth/authSlice";

const HeaderComponent = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectedUser);
  const { cart } = useAppSelector( state => state.product)

  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const totalQuantity = cart.reduce( (acc, item) => acc + item.quantity, 0)
    setCartCount(() => totalQuantity)
  }, [cart]);


  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
   <Box sx={{ flexGrow: 1 }}>
    <AppBar position='static' sx={{ backgroundColor: '#131921', color: 'white', padding: '4px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <img
          onClick={ () => navigate('/')}
          src="/amazon-logo-light.png"
          alt="amazon logo"
          style={{ width: '100px', height: '35px', paddingTop: '10px', cursor: 'pointer' }}
        />

        <div style={{ display: 'flex' }}>
          <div>
            <div>Hello, {user?.name}</div>
            <Button onClick={logoutHandler} sx={{ padding: 0, marginRight: '16px' }} color='inherit'>Déconnexion</Button>
          </div>

          <Button onClick={ () => navigate('/cart')}>
            <Badge badgeContent={cartCount} color='primary'>
              <ShoppingCartOutlinedIcon fontSize='large' />
            </Badge>
            <span>Panier</span>
          </Button>

        </div>

      </Toolbar>
    </AppBar>
   </Box>
  )
}

export default HeaderComponent

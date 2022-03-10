import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import EcommerceShop from '../Products';
import { ProductCartWidget } from 'src/sections/@dashboard/products';

export default function HomePage(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <img src='https://firebasestorage.googleapis.com/v0/b/anshin-b910b.appspot.com/o/sale50%25.jpg?alt=media&token=e5503710-23f7-472c-b530-5b017bd0f93f'></img>
      <EcommerceShop/>
    </React.Fragment>
  );
}
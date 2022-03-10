import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";


// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};



export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid  key={product.id} item xs={12} sm={6} md={3}>
         <NavLink to={`/ProductDetail/${product.id}`} >
          <ShopProductCard product={product} />
         </NavLink>
        </Grid>
      ))}
    </Grid>
  );
}

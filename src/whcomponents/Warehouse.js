import Cart from './Cart/Cart';
import Layout from './Layout/Layout';
import Products from './Shop/Products';

function Warehouse() {
  return (
    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default Warehouse;

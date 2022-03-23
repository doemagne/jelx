import ProductItem from './ProductItem';
import classes from './Products.module.css';

const TMP_PRODUCTS = [
  {
    id: 'p1',
    name: 'Test Product I',
    price: 6.00,
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    name: 'Test Product II',
    price: 16.00,
    description: 'This is a second product - amazing!',
  },
  {
    id: 'p3',
    name: 'Test Product III',
    price: 26.00,
    description: 'This is a third product - amazing!',
  },
];


const Products = (props) => {
  
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {TMP_PRODUCTS.map(product => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}

      </ul>
    </section>
  );
};

export default Products;

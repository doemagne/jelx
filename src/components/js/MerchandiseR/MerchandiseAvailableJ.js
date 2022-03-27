import CardJ from '../UI/CardJ';
import classes from './MerchandiseAvailable.module.css';
import ItemJ from './Item/ItemJ';
import { useEffect, useState } from 'react';
import { ServerURL } from '../../../constraint/ServerURL';

const AvailableMerchandiseJ = () => {
  const [httpError, setHttpError] = useState();
  const [merchandisel, setMerchandiseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMerchandise = async () => {
    //const stimulus = await fetch("https://merchandise-74a85-default-rtdb.firebaseio.com/merchandise.json").then();
    const uuid = window.sessionStorage.getItem("useruid");
    const stimulus = await fetch(ServerURL + `/api/merchandise/map/${uuid}`);
    if (!stimulus.ok) {
      throw new Error('Something went wrong.');
    }
    const response = await stimulus.json();
    const transformation = [];
    for (const key in response) {
      transformation.push({
        //id: key,//firebase
        id: response[key].id,
        name: response[key].name,
        description: response[key].description,
        price: response[key].price,
        uid: response[key].uid,
        iref: response[key].iref,
      })
    }
    setMerchandiseList(transformation);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchMerchandise().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <CardJ>
        <section className={classes.merchandiseLoading}>
          <p>
            Loading Merchandise.
          </p>
        </section>
      </CardJ>
    );
  }

  if (httpError) {
    return (
      <CardJ>
        <section className={classes.merchandiseLoading}>
          <p>
            {httpError}
          </p>
        </section>
      </CardJ>
    );
  }

  const merchandiseList = merchandisel.map((merchandise) => (
    <ItemJ
      id={merchandise.id}
      key={merchandise.id}
      name={merchandise.name}
      description={merchandise.description}
      price={merchandise.price}
      uid={merchandise.uid}
      iref={merchandise.iref}
    />
  ));

  return (
    <section className={classes.merchandise}>
      <CardJ>
        <ul>{merchandiseList}</ul>
      </CardJ>
    </section>
  );
};

export default AvailableMerchandiseJ;
/*
const DUMMY_MERCHANDISE = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];
*/
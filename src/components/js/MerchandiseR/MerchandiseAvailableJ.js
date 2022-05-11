import CardJ from '../UI/CardJ';
import classes from './MerchandiseAvailable.module.css';
import ItemJ from './Item/ItemJ';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMerchandiseData } from '../../../store/redux/action/MerchandiseAction';
import Banner from '../UI/Banner/Banner';

const AvailableMerchandiseJ = () => {
  const dispatch = useDispatch();
  const merchandisel = useSelector(state => state.merchandise.merchandise);
  const fetchMerchandise = async () => {
    dispatch(fetchMerchandiseData(window.sessionStorage.getItem("token")));
  };
  useEffect(() => {
    if (merchandisel.length == 0) {
      fetchMerchandise();
    }
  }, []);

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
      <Banner banner={'cart'} />
    </section>
  );
};

export default AvailableMerchandiseJ;

//import { ServerURL } from '../../../constraint/ServerURL';
  //const [isLoading, setIsLoading] = useState(true);
        //setIsLoading(false);
        //setHttpError(error.message);
  //const [httpError, setHttpError] = useState();
  //const [merchandisel, setMerchandiseList] = useState([]);
    //const stimulus = await fetch("https://merchandise-74a85-default-rtdb.firebaseio.com/merchandise.json").then();
/*const uuid = window.sessionStorage.getItem("useruid");
const stimulus = await fetch(ServerURL + `/api/merchandise/map/${uuid}`);
if (!stimulus.ok) {
  throw new Error(`Something went wrong.Please reload this tab or try again later.`);
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
}*/
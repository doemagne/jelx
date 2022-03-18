import Counter from "./Counter/Counter";
import Auth from './Auth/Auth';
import Header from './Header';

const ReduxStarter = () => {
    return (
        <>
            <Header/>
            <Auth/>
            <Counter />
        </>
    );

};

export default ReduxStarter;
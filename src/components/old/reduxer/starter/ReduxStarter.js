import Counter from "./Counter/Counter";
import Auth from './Auth/Auth';
import Header from './Header';
import UserProfile from './Auth/UserProfile';
import { useSelector } from "react-redux";


const ReduxStarter = () => {
    const isAuth = useSelector((state) => state.auth.authenticated);
    return (
        <>
            <Header/>
            {isAuth ? <UserProfile/> : <Auth/>}
            <Counter />
        </>
    );

};

export default ReduxStarter;
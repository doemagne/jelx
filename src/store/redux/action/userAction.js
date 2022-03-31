import { ServerURL } from "../../../constraint/ServerURL";
import { setAuthenticationState, setAuthenticationTransport } from "../slice/UserSlice";
import { setguid } from "../slice/CartSlice";
import { notify } from '../slice/UISlice';

export const fetchTransportData = () => {
    return (async (dispatch) => {

    });
}
export const authenticateUser = (credentials) => {
    return (async (dispatch) => {
        const sendRequest = async (credentials) => {
            //e.preventDefault();
            const response = await fetch(ServerURL + '/api/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Error: failed to authenticate')
            }
            const content = await response.json();
            //console.log(content);
            return content;
            //include in auth dispatch
        }
        try {
            const content = await sendRequest(credentials);
            //console.log(content);
            //console.log(content.authenticated);
            /*dispatch(setAuthState({
                username: content.name,
                uid: content.uid,
                cartuid: content.cartuid,
            }));*/
            console.log('STATE');
            dispatch(setAuthenticationState(content));
            console.log('TRANSPORT');
            dispatch(setAuthenticationTransport({ id: 1, content }));
            dispatch(setguid(content.cart));
            dispatch(notify({
                status: 'success',
                title: 'success',
                message: 'user authentication was succesful.',
            }));
            //window.location.reload();//workaround
        } catch (error) {
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: `[incorrect username or password]${error.message}`,
            }));
        }

    });
}

    //setRedirect(true);
    //props.setName(content.name);
    //props.setCartuid(content.cartuid)
    //props.setUid(content.uid)
/*let result;// = (e as Error).message;
if (e instanceof Error) {
result = e.message; // works, `e` narrowed to Error
console.log(result);
setError({
title: "An error occured.",
content: `The system encountered an unexpected error:\n ${e} \n Please try again later.`,
});
}*/
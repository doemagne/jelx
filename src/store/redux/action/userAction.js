import { authenticator, setTransport, signout } from "../slice/UserSlice";
import { setredirect, notify, setloading } from '../slice/UISlice';
import { sendGetRequest, sendTokenGetRequest, sendPostRequest, sendTokenPutRequest, sendTokenPostRequest } from "./Request";
import { notificationpending, notificationsent, notificationsignedin, notificationsignedup, notificationfailed } from "../structure/NotifyTPL";
import { updateCart } from "../slice/CartSlice";
//let endpoint;//'/api/signup'

export const updateUserCredential = (data, token) => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        dispatch(notify({
            status: 'pending',
            title: 'update is pending',
            message: 'request pending',
        }));
        try {
            const endpoint = '/api/user/credential';
            const response = await sendTokenPutRequest(data, endpoint, token)
            //set the username update
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'updated profile successfully.',
                message: 'request was successful.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to send',
                message: `[failed to send profile data]${error.message}`,
            }));
        }
    });
}
export const fetchTransportData = (token) => {
    return (async (dispatch) => {
        // console.log("CART:::")
        dispatch(notify({
            status: 'pending',
            title: 'update is pending',
            message: 'request pending',
        }));
        dispatch(setloading(true));
        try {
            const endpoint = '/api/user/restriction';
            //const endpoint = '/api/user';
            const content = await sendTokenGetRequest(endpoint, token);
            //console.log({id:1, transport:content});

            dispatch(setTransport({ id: 1, content: content }));
            dispatch(authenticator(content.authenticated));
            dispatch(updateCart(content.cart));
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'user profile was fetched',
                message: 'continue with your session.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'Unauthenticated',
                message: `Please sign in.`,
            }));
        }
    });
}
export const registerUser = (credentials) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'submitting signup request',
                message: 'registering user signup',
            }));
            dispatch(setloading(true));
            const endpoint = '/api/user/signup';
            //const endpoint = '/api/signup';
            const content = await sendPostRequest(credentials, endpoint);
            //console.log(content);
            dispatch(notify(notificationsignedup));
            dispatch(setloading(false));
            dispatch(setredirect(true));
            dispatch(notify({
                status: 'success',
                title: 'sign up request was submitted to the server.',
                message: 'please signin.',
            }));
        } catch (error) {
            dispatch(notify(notificationfailed));
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to send',
                message: `[failed to fetch cart data]${error.message}`,
            }));
        }
    });
}

export const authenticateUser = (credentials) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'authenticating',
                message: 'system authentication process',
            }));
            dispatch(setloading(true));
            const endpoint = '/api/user/signin';
            //const endpoint = '/api/signin';
            const content = await sendPostRequest(credentials, endpoint);
            dispatch(setTransport({ id: 1, content: content }));
            dispatch(authenticator(content.authenticated));
            dispatch(updateCart(content.cart));
            dispatch(setloading(false));
            // dispatch(notify(notificationsignedin));
            dispatch(setredirect(true));
            dispatch(notify({
                status: 'success',
                title: 'authenticated',
                message: `continue session`,
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: `[incorrect username or password]${error.message}`,
            }));
        }
    });
}

export const signoutUser = () => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'Signing out.',
                message: 'Signing out',
            }));

            dispatch(setloading(true));
            //const endpoint = '/api/signout';
            const endpoint = '/api/user/signout';
            const response = await sendPostRequest(null, endpoint)
            dispatch(signout());
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'you are now signed out',
                message: response.message,
            }));
            window.location.reload();
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify(notificationfailed));
            dispatch(notify({
                status: 'error',
                title: 'failed',
                message: `sign out failed:${error.message}`,
            }));

        }
    })
}


/*
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
        }
*/
import { ServerURL } from "../../../constraint/ServerURL";
import { authenticator, setAuthenticationState, setTransport, signout } from "../slice/UserSlice";
import { setguid } from "../slice/CartSlice";
import { setredirect, notify, setloading } from '../slice/UISlice';

//let endpoint;//'/api/signup'
const notificationsent = {
    status: 'success',
    title: 'success',
    message: 'Request was sent.',
}

const notificationfailed = {
    status: 'failed',
    title: 'failed to send request',
    message: `an error occured`,
}

const sendGetRequest = async (endpoint) => {
    console.log(endpoint);
    const stimulus = await fetch(`${ServerURL}${endpoint}`, {
        headers: { "Content-Type": "application/json", },
        credentials: "include",
    });
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending get request.');
    }
    const response = await stimulus.json();
    //console.log(response);
    return response;
}

const sendPostRequest = async (data, endpoint) => {
    console.log(endpoint);
    const stimulus = await fetch(`${ServerURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending post request.');
    }
    const response = await stimulus.json();
    console.log(response);
    return response;
}

export const fetchTransportData = () => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        try {
            const endpoint = '/api/user';
            const content = await sendGetRequest(endpoint);
            //console.log({id:1, transport:content});
            dispatch(setTransport({ id: 1, content: content }));
            dispatch(authenticator(content.authenticated));
            dispatch(setloading(false));
            dispatch(notify(notificationsent));
        } catch (error) {
            dispatch(notify(notificationfailed));
            dispatch(setloading(false));
        }
    });
}

export const authenticateUser = (credentials) => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        try {
            dispatch(setloading(true));
            const endpoint = '/api/signin';
            const content = await sendPostRequest(credentials, endpoint);
            dispatch(setTransport({ id: 1, content: content }));
            dispatch(authenticator(content.authenticated));
            dispatch(notify(notificationsent));
            dispatch(setredirect(true));
            dispatch(setloading(false));
        } catch (error) {
            dispatch(notify({
                status: 'failed',
                title: 'failed to send',
                message: `[incorrect username or password]${error.message}`,
            }));
            dispatch(setloading(false));
        }
    });
}

export const registerUser = (credentials) => {
    return (async (dispatch) => {
        try {
            dispatch(setloading(true));
            const endpoint = '/api/signup';
            const content = await sendPostRequest(credentials, endpoint);
            console.log(content);
            dispatch(notify(notificationsent));
            dispatch(setloading(false));
            dispatch(setredirect(true));
        } catch (error) {
            dispatch(notify(notificationfailed));
            dispatch(setloading(false));
        }
    });
}
export const signoutUser = () => {
    return (async (dispatch) => {
        try {
            dispatch(setloading(true));
            const endpoint = '/api/signout';
            const response = await sendPostRequest(null, endpoint)
            dispatch(signout());
            dispatch(notify({
                status: 'unauthenticated',
                title: 'you are now signed out',
                message: response.message,
            }));
            dispatch(setloading(false));
            window.location.reload();
        } catch (error) {
            dispatch(notify(notificationfailed));
            dispatch(setloading(false));

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
import { authcookieflag } from "../../../constraint/ServerURL";
import { addToBugs, transportBugs, updateBug } from "../slice/BugSlice";
import { updateTableRow } from "../slice/TableSlice";
import { notify, setloading } from "../slice/UISlice";
import { signout } from "../slice/UserSlice";
import { delayRequest, sendTokenGetRequest, sendTokenPostRequest, sendTokenPutRequest } from "./Request";
// import { signoutUser } from "./userAction";

export const fetchBugMap = (token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'fetching',
                message: 'fetching system bugs.',
            }))
            dispatch(setloading(true));
            const endpoint = '/api/bug/mapping';
            const response = await sendTokenGetRequest(endpoint, token)
            dispatch(transportBugs({ content: response }))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'fetched',
                message: 'fetched all system bugs.',
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error',
                message: 'could not fetch system bugs: ' + error,
            }))
            if (error.message === authcookieflag) {
                console.log(`window.location.reload()`)
                // window.location.reload()
                dispatch(signout())
            }
        }
    })
}
export const updateSystemBug = (data, token) => {
    return (async (dispatch) => {

        try {
            dispatch(setloading(true));
            dispatch(notify({
                status: 'pending',
                title: 'submitting.',
                message: 'submitting reported bug',
            }));
            const endpoint = '/api/bug/update';
            const response = await sendTokenPutRequest(data, endpoint, token)
            dispatch(updateBug(response))
            dispatch(updateTableRow(response))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'updated',
                message: 'system updated bug.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed',
                message: `an error occurred: ${error.message}`,
            }));
        }
    });
}
export const registerSystemBug = (data, token) => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        dispatch(notify({
            status: 'pending',
            title: 'submitting',
            message: 'submitting bug report',
        }));
        try {
            const endpoint = '/api/bug/register';
            const response = await sendTokenPostRequest(data, endpoint, token)
            dispatch(addToBugs({ content: response }))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'submitted',
                message: 'bug was submitted',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed',
                message: `failed to submit bug:${error.message}`,
            }));
        }
    });
}
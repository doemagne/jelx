import { addToBugs, transportBugs, updateBug } from "../slice/BugSlice";
import { updateTableRow } from "../slice/TableSlice";
import { notify, setloading } from "../slice/UISlice";
import { sendTokenGetRequest, sendTokenPostRequest, sendTokenPutRequest } from "./Request";

export const fetchBugMap = (token) => {
    return (async (dispatch) => {
        dispatch(notify({
            status: 'pending',
            title: 'fetching bugs',
            message: 'fetching list of system bugs.',
        }))
        dispatch(setloading(true));
        try {
            const endpoint = '/api/bug/mapping';
            const response = await sendTokenGetRequest(endpoint, token)
            dispatch(transportBugs({ content: response}))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'fetched bugs',
                message: 'fetched list of system bugs.',
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error when fetching bugs',
                message: 'could not fetch list of system bugs: '+error,
            }))
        }
        dispatch(setloading(false));
    })
} 
export const updateSystemBug = (data, token) => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        dispatch(notify({
            status: 'pending',
            title: 'bug report.',
            message: 'submitting reported bug',
        }));
        try {
            // console.log("updating")
            // console.log(data)
            // console.log(token)
            const endpoint = '/api/bug/update';
            const response = await sendTokenPutRequest(data, endpoint, token)
            dispatch(updateBug(response))
            dispatch(updateTableRow(response))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'Bug Updated.',
                message: 'system updated bug successfully.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to update bug',
                message: `failed to update the bug data: ${error.message}`,
            }));
        }
    });
}
export const registerSystemBug = (data, token) => {
    return (async (dispatch) => {
        dispatch(setloading(true));
        dispatch(notify({
            status: 'pending',
            title: 'bug report.',
            message: 'submitting bug report',
        }));
        try {
            const endpoint = '/api/bug/register';
            const response = await sendTokenPostRequest(data, endpoint, token)
            dispatch(addToBugs({content:response}))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'Bug report acknowledged.',
                message: 'system has acknowledged report registration successfully.',
            }));
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'failed to send',
                message: `failed to register the bug data: ${error.message}`,
            }));
        }
    });
}
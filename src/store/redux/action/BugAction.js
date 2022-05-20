import { addToBugs, transportBugs } from "../slice/BugSlice";
import { notify, setloading } from "../slice/UISlice";
import { sendTokenGetRequest, sendTokenPostRequest } from "./Request";

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
            dispatch(notify({
                status: 'success',
                title: 'Bug report acknowledged.',
                message: 'system has acknowledged report registration successfully.',
            }));
            dispatch(setloading(false));
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
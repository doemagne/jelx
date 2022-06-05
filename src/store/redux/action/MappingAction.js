import { authcookieflag } from "../../../constraint/ServerURL";
import { transportTable, transportTableX } from "../slice/MappingSlice";
import { notify, setloading } from "../slice/UISlice";
import { signout } from "../slice/UserSlice";
import { delayRequest, sendTokenGetRequest, updateMediaForm, uploadMediaForm } from "./Request";


export const updateMap = (table, formdata, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: `submitting`,
                message: `submitting new ${table} data`,
            }))
            dispatch(setloading(true));
            const endpoint = `/api/${table}/update`;
            const response = await updateMediaForm(formdata, endpoint, token)
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: `submitted`,
                message: `submitting new ${table} data`,
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error',
                message: `could not submit system ${table} data: ${error.message}`,
            }))
        }
    })
}


export const registerMap = (table, formdata, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: `submitting`,
                message: `submitting new ${table} data`,
            }))
            dispatch(setloading(true));
            const endpoint = `/api/${table}/register`;
            const response = await uploadMediaForm(formdata, endpoint, token)
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: `submitted`,
                message: `submitting new ${table} data`,
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error',
                message: `could not submit system ${table} data: ${error.message}`,
            }))
        }
    })
}

export const fetchMap = (table, token, restrictions) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'fetching',
                message: `fetching system ${table} data`,
            }))
            // await delayRequest(10000)
            dispatch(setloading(true));
            const endpoint = `/api/${table}/mapping`;
            const response = await sendTokenGetRequest(endpoint, token)
            dispatch(transportTableX({ table: table, content: response, restrictions: restrictions }))
            // dispatch(transportTable(response))
            // dispatch(transportTable({ table: table, content: response }))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'fetched',
                message: `fetched all system ${table} data.`,
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error',
                message: `could not fetch system ${table} data: ${error.message}`,
            }))
            if (error.message === authcookieflag) {
                console.log(`window.location.reload()`)
                // window.location.reload()
                dispatch(signout())
            }
        }
    })
}


export const generateHeaders = (headers, token) => {
    return (async (dispatch) => {
        try {
            headers.forEach(h => {
                const ctrl = new AbortController();
                setTimeout(() => ctrl.abort(), 5000);
                const formdata = new FormData();
                // const entries = formdata.entries()
                formdata.append("data", JSON.stringify(h));
                formdata.append("attachment", false)
                dispatch(registerMap("header", formdata, token))
            });
        } catch (error) {
            console.log(error)
        }
    })
}


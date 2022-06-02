import { authcookieflag } from "../../../constraint/ServerURL";
import { transportTable, transportTableX } from "../slice/MappingSlice";
import { notify, setloading } from "../slice/UISlice";
import { signout } from "../slice/UserSlice";
import { delayRequest, sendTokenGetRequest, uploadMediaForm } from "./Request";


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

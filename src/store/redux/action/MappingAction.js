import { authcookieflag } from "../../../constraint/ServerURL";
import { transportTable, transportTableX } from "../slice/MappingSlice";
import { notify, setloading } from "../slice/UISlice";
import { signout } from "../slice/UserSlice";
import { sendTokenGetRequest } from "./Request";

export const fetchMap = (table, token, restrictions) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'fetching',
                message: `fetching system ${table}'s`,
            }))
            dispatch(setloading(true));
            const endpoint = `/api/${table}/mapping`;
            const response = await sendTokenGetRequest(endpoint, token)
            dispatch(transportTableX({ table: table, content: response, restrictions:restrictions }))
            // dispatch(transportTable(response))
            // dispatch(transportTable({ table: table, content: response }))
            dispatch(setloading(false));
            dispatch(notify({
                status: 'success',
                title: 'fetched',
                message: `fetched all system ${table}s.`,
            }))
        } catch (error) {
            dispatch(setloading(false));
            dispatch(notify({
                status: 'error',
                title: 'error',
                message: `could not fetch system ${table}'s: + ${error.message}`,
            }))
            if (error.message === authcookieflag) {
                console.log(`window.location.reload()`)
                // window.location.reload()
                dispatch(signout())
            }
        }
    })
}

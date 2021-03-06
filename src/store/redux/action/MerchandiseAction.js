import { setMerchandise, updateMerchandise } from "../slice/MerchandiseSlice";
import { notify, setloading } from "../slice/UISlice";
import { sendTokenGetRequest, sendGetRequest, uploadMediaForm, sendTokenPostRequest } from "./Request";

export const registerMerchandiseData = (data, token) => {
    return (async (dispatch) => {
        try {
            dispatch(notify({
                status: 'pending',
                title: 'update is pending',
                message: 'request pending',
            }));

            dispatch(setloading(true));
            const endpoint = '/api/merchandise/register/new';
            const content = await sendTokenPostRequest(data, endpoint, token);
            if (content) {
                console.log(content)
                dispatch(updateMerchandise(content))
            }
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
                message: `[failed to send merchandise data]${error.message}`,
            }));
        }
    });
}

export const fetchMerchandiseData = (token) => {
    return (async (dispatch) => {
        try {
            dispatch(setloading(true));
            //const uuid = window.sessionStorage.getItem("cartuid");
            //const endpoint = `/api/merchandise/map/${uuid}`
            const endpoint = `/api/merchandise/mapping/`
            //const response = await sendGetRequest(endpoint)
            //console.log("sending request")
            const response = await sendTokenGetRequest(endpoint, token)

            //console.log(response)
            //const transformation = [];
            /*for (const key in response) {
                if (response[key]) {
                    transformation.push({
                        //id: key,//firebase
                        id: response[key].id,
                        name: response[key].name,
                        description: response[key].description,
                        price: response[key].price,
                        uid: response[key].uid,
                        quantity: response[key].quantity,
                        active: response[key].active,
                        iref: response[key].iref,
                    })

                }
            console.log("parsing response")
            }*/
            //console.log("parsing response")
            //console.log(transformation)
            //dispatch(setMerchandise(transformation));
            dispatch(setMerchandise(response));
            dispatch(setloading(false));
        } catch (error) {
            dispatch(setloading(false));
        }
    });
}


export const uploadMerchandiseData = (formdata) => {
    return (async (dispatch) => {
        try {
            dispatch(setloading(true));
            const endpoint = '/api/merchandise/upload';
            uploadMediaForm(formdata, endpoint)
        } catch (error) {
            dispatch(setloading(false));
        }
    });
}
//
/*
const fetchMerchandise = async () => {
        //const stimulus = await fetch("https://merchandise-74a85-default-rtdb.firebaseio.com/merchandise.json").then();
        const uuid = window.sessionStorage.getItem("cartuid");
        const stimulus = await fetch(ServerURL + `/api/merchandise/map/${uuid}`);
        if (!stimulus.ok) {
            throw new Error(`Something went wrong.Please reload this tab or try again later.`);
        }
        const response = await stimulus.json();
        const transformation = [];
        for (const key in response) {
            transformation.push({
                //id: key,//firebase
                id: response[key].id,
                name: response[key].name,
                description: response[key].description,
                price: response[key].price,
                uid: response[key].uid,
                iref: response[key].iref,
            })
        }*/
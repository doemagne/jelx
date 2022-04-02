
import { ServerURL } from "../../../constraint/ServerURL";

export const sendGetRequest = async (endpoint) => {
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

export const sendPostRequest = async (data, endpoint) => {
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
    //console.log(response);
    return response;
}
export const sendPutRequest = async (data, endpoint) => {
    console.log(endpoint);
    const stimulus = await fetch(`${ServerURL}${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending post request.');
    }
    const response = await stimulus.json();
    //console.log(response);
    return response;
}
export const sendGenericRequest = async (data, endpoint, method) => {
    console.log(endpoint);
    const stimulus = await fetch(`${ServerURL}${endpoint}`, {
        method: method,
        headers: { "Content-Type": "application/json", },
        credentials: "include",
        body: JSON.stringify(data),
    });
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending post request.');
    }
    const response = await stimulus.json();
    //console.log(response);
    return response;
}

export const uploadMediaForm = async (formdata, endpoint) => {
    //try {
    const ctrl = new AbortController();
    setTimeout(() => ctrl.abort(), 5000);
    const stimulus = await fetch(endpoint, {
        method: 'POST',
        body: formdata,
        signal: ctrl.signal,
    });
    console.log(stimulus.status);
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending post request.');
    }
    //} catch (error) {
    //console.log("An error occured when uploading the form data.", error);
    //}
}
/*

        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), 5000);
        const formdata = new FormData();
        formdata.append("merchandise", JSON.stringify(itemdata));
        formdata.append("photo", imageref.current.files[0]);
        try {
            const stimulus = await fetch(ServerURL + '/api/merchandise/upload', {
                method: 'POST',
                body: formdata,
                signal: ctrl.signal,
            });
            console.log(stimulus.status);
        } catch (error) {
            console.log("An error occured when uploading the form data.",error);
        }
*/
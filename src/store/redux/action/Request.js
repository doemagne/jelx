import sha256 from "crypto-js/sha256";
import encBase64 from "crypto-js/enc-base64";
import { enc } from "crypto-js/core";
import { ServerURL } from "../../../constraint/ServerURL";
import aes from "crypto-js/aes";
import cryptoJs from "crypto-js";
import modeCfb from "crypto-js/mode-cfb";
import padNopadding from "crypto-js/pad-nopadding";
import sha512 from "crypto-js/sha512";
import rabbit from "crypto-js/rabbit";

const encrypt = (token) => {
    let secret = 'secret';
    //console.log(`secret: ${secret}`)
    let secretHash = sha256(secret).toString(enc.Hex).slice(0,32);
    //console.log(`secretHash: ${secretHash}`)
    secretHash = cryptoJs.enc.Utf8.parse(secretHash)
    //console.log(`secretHash: ${secretHash}`)
    //btoken = atob(token)
    let b64token = Buffer.from(token, "base64")
    //console.log(`b64token: ${b64token}`)
    let initialvector = Buffer.from("i-n-i-t-i-a-l-i-z-a-t-i-o-n-v-e-c-t-o-r", "base64")
    //console.log(`initialvector: ${initialvector}`)
    let ciphertext = enc.Base64.parse(b64token);
    //console.log(`ciphertext: ${ciphertext}`)
    let iv = enc.Base64.parse(initialvector);
    //console.log(`iv: ${iv}`)
    let decrypted = aes.decrypt({
        ciphertext:ciphertext
    },
    secretHash,{
        mode: modeCfb,
        padding: padNopadding,
        iv: iv,  
    })
    console.log('decrypted token: '+decrypted.toString(enc.Utf8))
}
const secret = 'abc';
export const sendTokenGetRequest = async (endpoint,token) => {
    console.log(endpoint);
    const stimulus = await fetch(`${ServerURL}${endpoint}`, {
        headers: { 
            "Content-Type": "application/json", 
            "X-Csrf-Token": token
        },
        credentials: "include",
    });
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending get request.');
    }
    const response = await stimulus.json();
    let th = stimulus.headers.get('X-Csrf-Token')
    //encrypt(th);
    //th = rabbit.encrypt(th,secret)
    response.token = th
    console.log(response.token);
    console.log(token);
    return response;
}
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
    //console.log(stimulus.ok)
    if (!stimulus.ok) {
        throw new Error('an error occured when the sending post request.');
    }
    const response = await stimulus.json();
    let th = stimulus.headers.get('X-Csrf-Token')
    //encrypt(th);
    //th = rabbit.encrypt(th,secret)
    response.token = th
    console.log(response.token);
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
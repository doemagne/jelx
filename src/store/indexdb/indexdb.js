import Dexie from "dexie";

const indexdb = new Dexie("Merchandiser");

indexdb.version(1).stores({
    transport: "id, transport",
    user:"id, uid, name, username, email, cartuid, cart, address",
    cart:"id, uid, total, quantity, items",
    cartitem:"id, uid, quantity, total, cartuid, latched, merchandise",
    merchandise:"id, uid, name, description, price, iref",
    address:"id, uid, name, description, street, suburb, city, country, postalcode",
});

export default indexdb;
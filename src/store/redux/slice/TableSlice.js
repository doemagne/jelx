import { createSlice } from "@reduxjs/toolkit";
import BugRow from "../../../pages/admin/bug/BugRow";
import TableRow from "../../../pages/admin/bug/TableRow";

const initialState = {
    data: null,
    headers: [],
    items: [],
    default: [],
    output: null,
    restrictions: ["uid", "page",]
}
const desc = `sort-down`
const asc = `sort-up`


const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        filterItems: (state, action) => {
            // if (action.payload.length > 0) {
            const query = action.payload.toLowerCase()
            const tdata = state.default
            const headers = state.headers.slice().reverse()
            const filter = tdata.filter((item) => {
                // const filter = state.items.filter((item) => {
                // headers.forEach
                for (const k in headers) {
                    // for (const k in state.headers) {
                    // console.log(item[state.headers[k].headerCaption])
                    // const header = state.headers[k]
                    const header = headers[k]
                    // console.log(header)
                    const cell = `${item[header.headerCaption.toLowerCase()]}`
                    // const cell = `${item[state.headers[k].headerCaption.toLowerCase()]}`
                    // if (cell) {
                    if (query === '') {
                        return item
                    } else if (cell.includes(query)) {
                        console.log(`${header.headerCaption}: ${cell}`)
                        // if (item[state.headers[k].headerCaption].includes(query)) {
                        return item
                    }
                    // }
                }
            })
            state.items = filter
            // }
        },
        filterItemsI: (state, action) => {
            const query = action.payload.toLowerCase()
            const tdata = state.default
            const filter = tdata.filter((item) => {
                const headers = state.headers.slice().reverse().forEach((header) => {
                    const cell = `${item[header.headerCaption.toLowerCase()]}`
                    if (query === '') {
                        return item
                    } else if (cell.includes(query)) {
                        console.log(`${header.headerCaption}: ${cell}`)
                        return item
                    }
                })
            })
            state.items = filter
        },
        sortascending: (state, action) => {
            const header = action.payload
            const headerIdx = state.headers.findIndex(id => state.headers[header.id] == id)
            state.items = ([]
                .concat(state.items)
                .sort((a, b) => a[header.headerCaption] < b[header.headerCaption] ? 1 : -1)
            )
            state.headers[headerIdx].headerSort = desc
        },
        sortdescending: (state, action) => {
            const header = action.payload
            const headerIdx = state.headers.findIndex(id => state.headers[header.id] == id)
            state.items = ([]
                .concat(state.items)
                .sort((a, b) => a[header.headerCaption] > b[header.headerCaption] ? 1 : -1)
            )
            state.headers[headerIdx].headerSort = asc
        },
        loadTableData: (state, action) => {
            const pay = action.payload.content
            const restrictions = action.payload.restrictions
            state.restrictions = state.restrictions.concat(restrictions)
            console.log(restrictions)
            if (pay) {
                state.data = initialState.data
                state.headers = []
                state.output = initialState.output
                state.items = initialState.items
                state.default = initialState.default
                // state.restrictions = initialState.restrictions
                // console.log(action.payload)
                state.data = pay    // let headers
                let i = 0
                for (const k in pay[0]) {
                    // console.log(pay[0][k])
                    let restricted = false
                    for (const r in state.restrictions) {
                        if (state.restrictions[r] == k) {
                            // console.log(`${state.restrictions[r]} ${k}`)
                            restricted = true
                            // break
                        }
                    }
                    if (restricted) {
                        continue
                    }
                    const header = {
                        id: i,
                        headerCaption: k,
                        headerSort: desc,
                        active: true,
                    }
                    i++
                    if (header) {
                        // console.log(header)
                        state.headers.push(header)
                    }
                }
                let items = []
                for (const k in pay) {
                    if (k === "token") {
                        continue
                    }
                    const item = pay[k]
                    if (state.items) {
                        // console.log(k)
                        items.push(item)
                    }
                }
                if (items.length > 0) {
                    state.items = items
                    state.default = items
                }
                // const outputlist = state.items.map((item) => (<TableRow key={item.id} celldata={item}/>))
                // state.output = outputlist
                // console.log(state.output)
            }
        },
    }
});

export const { filterItemsI, filterItems, sortdescending, sortascending, loadTableData } = tableSlice.actions;

export default tableSlice.reducer;
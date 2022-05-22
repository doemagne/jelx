import { createSlice } from "@reduxjs/toolkit";
// import BugRow from "../../../pages/admin/bug/BugRow";
// import TableRow from "../../../pages/admin/table/TableRow";

const initialState = {
    data: null,
    headers: [],
    items: [],
    default: [],
    output: null,
    restrictions: ["uid", "page",],
    current: null,
    query: "",
}
const desc = `sort-down`
const asc = `sort-up`


const tableSlice = createSlice({
    name: 'table',
    initialState: initialState,
    reducers: {
        appendTableRow: (state, action) => {
            const pay = action.payload.content
            pay.id = state.default.length + 1
            state.default.push(pay)
        },
        setTableSelection: (state, action) => {
            if (action.payload) {
                const b = state.items.find(bi => bi.id === action.payload)
                if (b) {
                    // console.log(`${b}`)
                    state.current = b
                }
            }
        },
        updateTableRow: (state, action) => {
            const pay = action.payload
            const b = state.items.findIndex(bi => bi.id === pay.id)

            if (state.items[b]) {
                // console.log(state.items[b])
                state.items[b] = pay
                // state.items[b] = state.current
            }
            // const c = state.default.findIndex(bi => bi.id === pay.id)
            // if (state.default[c]) {
            //     // state.default[c] = { pay }
            //     state.items[b] = state.current
            // }
            // const d = state.data.findIndex(bi => bi.id === pay.id)
            // if (state.default[d]) {
            //     // state.default[d] = { pay }
            //     state.items[d] = state.current
            // }
        },
        filterItems: (state, action) => {
            // if (action.payload.length > 0) {
            const query = action.payload.toLowerCase().substring(1, action.payload.length)
            const tdata = state.default.slice().reverse()
            const headers = state.headers.slice().reverse()
            if (action.payload.length > 0) {
                state.query = action.payload
            }
            // let stack = []
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
                    // const existing = stack.find(i => i.id == item.id)
                    // const cell = `${item[state.headers[k].headerCaption.toLowerCase()]}`
                    // if (cell) {
                    if (query === '') {
                        // stack.concat(item)
                        // if (!existing) { stack.push(item) }
                        return item
                    } else if (cell.includes(query)) {
                        // if (item[state.headers[k].headerCaption].includes(query)) {
                        // if (!existing) { stack.push(item) }
                        return item
                    }
                    // console.log(`${header.headerCaption}: ${cell}`)
                    // }
                }
            })
            // state.items = stack
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
                        // console.log(`${header.headerCaption}: ${cell}`)
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
            // console.log(restrictions)
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
                        headerSort: asc,
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
                    state.items = items.slice().reverse()
                    state.default = items
                }
                // const outputlist = state.items.map((item) => (<TableRow key={item.id} celldata={item}/>))
                // state.output = outputlist
                // console.log(state.output)
            }
        },
    }
});

export const { appendRow, setTableSelection, updateTableRow, filterItemsI, filterItems, sortdescending, sortascending, loadTableData } = tableSlice.actions;

export default tableSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const mapping = {
    name: "empty",
    data: null,
    headers: [],
    items: [],
    default: [],
    output: null,
    restrictions: ["uid", "page",],
    current: null,
    query: "",
}

const initialState = {
    mappings: [],
    mapping: mapping,
}
const desc = `sort-down`
const asc = `sort-up`

// const p = {"s":{}}

const mappingSlice = createSlice({
    name: 'mapping',
    initialState: initialState,
    reducers: {
        transportTable: (state, action) => {
            const pay = action.payload
            console.log(pay)
            let mapkey = ''
            for (const k in pay) {
                if (k === "token") { continue }
                if (k.length > 0) {
                    mapkey = k
                    console.log(k)
                    break
                }
            }
        },
        transportTableX: (state, action) => {

            const table = state.mappings.find((t) => t.name === action.payload.table)
            if (table) {
                const prior = state.mappings.findIndex((t) => t.name === state.mapping.name)
                state.mappings[prior] = state.mapping
                state.mapping = table
            } else {
                const pay = action.payload.content
                console.log(pay)
                const restrictions = action.payload.restrictions
                state.mapping.restrictions = state.mapping.restrictions.concat(restrictions)
                state.mapping.name = action.payload.table
                if (pay) {
                    state.mapping.data = pay    // let headers
                    let i = 0
                    for (const k in pay[0]) {
                        let restricted = false
                        for (const r in state.mapping.restrictions) {
                            if (state.mapping.restrictions[r] == k) {
                                restricted = true
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
                            state.mapping.headers.push(header)
                        }
                    }
                    let items = []
                    for (const k in pay) {
                        if (k === "token") {
                            continue
                        }
                        const item = pay[k]
                        if (state.mapping.items) {
                            items.push(item)
                        }
                    }
                    if (items.length > 0) {
                        state.mapping.items = items.slice().reverse()
                        state.mapping.default = items
                    }
                    state.mappings.push(state.mapping)
                }
            }
        },
        appendTableRow: (state, action) => {
            const pay = action.payload.content
            pay.id = state.mapping.default.length + 1
            state.mapping.default.push(pay)
        },
        setTableSelection: (state, action) => {
            if (action.payload) {
                const b = state.mapping.items.find(bi => bi.id === action.payload)
                if (b) {
                    state.mapping.current = b
                }
            }
        },
        updateTableRow: (state, action) => {
            const pay = action.payload
            const b = state.mapping.items.findIndex(bi => bi.id === pay.id)

            if (state.mapping.items[b]) {
                state.mapping.items[b] = pay
            }
        },
        filterItems: (state, action) => {
            const query = action.payload.toLowerCase().substring(1, action.payload.length)
            const tdata = state.mapping.default.slice().reverse()
            const headers = state.mapping.headers.slice().reverse()
            if (action.payload.length > 1) {
                state.mapping.query = action.payload
            } else {
                state.mapping.query = ''
            }
            const filter = tdata.filter((item) => {
                for (const k in headers) {
                    const header = headers[k]
                    const cell = `${item[header.headerCaption.toLowerCase()]}`
                    if (query === '') {
                        return item
                    } else if (cell.includes(query)) {
                        return item
                    }
                }
            })
            state.mapping.items = filter
        },
        sortascending: (state, action) => {
            const header = action.payload
            const headerIdx = state.mapping.headers.findIndex(id => state.mapping.headers[header.id] == id)
            state.mapping.items = ([]
                .concat(state.mapping.items)
                .sort((a, b) => a[header.headerCaption] < b[header.headerCaption] ? 1 : -1)
            )
            state.mapping.headers[headerIdx].headerSort = desc
        },
        sortdescending: (state, action) => {
            const header = action.payload
            const headerIdx = state.mapping.headers.findIndex(id => state.mapping.headers[header.id] == id)
            state.mapping.items = ([]
                .concat(state.mapping.items)
                .sort((a, b) => a[header.headerCaption] > b[header.headerCaption] ? 1 : -1)
            )
            state.mapping.headers[headerIdx].headerSort = asc
        },
        loadTableDataX: (state, action) => {
            const pay = action.payload.content
            const restrictions = action.payload.restrictions
            state.mapping.restrictions = state.mapping.restrictions.concat(restrictions)
            // console.log(restrictions)
            if (pay) {
                state.mapping.data = initialState.mapping.data
                state.mapping.headers = []
                state.mapping.output = initialState.mapping.output
                state.mapping.items = initialState.mapping.items
                state.mapping.default = initialState.mapping.default
                // state.restrictions = initialState.restrictions
                // console.log(action.payload)
                state.mapping.data = pay    // let headers
                let i = 0
                for (const k in pay[0]) {
                    // console.log(pay[0][k])
                    let restricted = false
                    for (const r in state.mapping.restrictions) {
                        if (state.mapping.restrictions[r] == k) {
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
                        state.mapping.headers.push(header)
                    }
                }
                let items = []
                for (const k in pay) {
                    if (k === "token") {
                        continue
                    }
                    const item = pay[k]
                    if (state.mapping.items) {
                        // console.log(k)
                        items.push(item)
                    }
                }
                if (items.length > 0) {
                    state.mapping.items = items.slice().reverse()
                    state.mapping.default = items
                }
            }
        },
    }
});

export const { transportTableX, appendRow, setTableSelection, updateTableRow, filterItemsI, filterItems, sortdescending, sortascending, loadTableDataX } = mappingSlice.actions;

export default mappingSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

class mapX {
    constructor(id, name, query, restrictions, data, items, defaultdata, current) {
        this.id = id
        this.name = name
        this.query = query
        this.restrictions = restrictions
        this.data = data
        this.items = items
        this.default = defaultdata
        this.current = current
    }
}
let mappingz = new mapX(0, "default", "", [], [], [], [], null)
let mapping = {
    id: 0,
    name: "default",
    data: null,
    headers: [],
    items: [],
    default: [],
    output: null,
    restrictions: [],
    current: null,
    query: "",
}

let mappingsX = new Map([
    ["default", mapping],
])
let initialState = {
    mappings: [],
    // mappings: [mapping],
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
            const table = state.mappings.findIndex((t) => t.name === action.payload.table)
            if (state.mappings[table]) {
                console.log(`mapping for ${table} already exists`)
            } else {
                let map = {
                    id: 0,
                    name: "default",
                    data: null,
                    headers: [],
                    items: [],
                    default: [],
                    output: null,
                    restrictions: [],
                    current: null,
                    query: "",
                }
                // state.mapping = null
                const pay = action.payload.content
                // console.log(pay)
                map.id = state.mappings.length
                const restrictions = action.payload.restrictions
                map.restrictions = state.mapping.restrictions.concat(restrictions)
                let name = action.payload.table
                let pre = name.substring(0, 1).toUpperCase()
                let fix = name.substring(1, name.length)
                let prefix = `${pre}${fix}`
                map.name = prefix
                // console.log(prefix)
                // map.name = action.payload.table
                if (pay) {
                    map.data = pay    // let headers
                    let i = 0
                    for (const k in pay[0]) {
                        let restricted = false
                        for (const r in state.mapping.restrictions) {
                            if (state.mapping.restrictions[r] == k) { restricted = true }
                        }
                        if (restricted) { continue }
                        const header = {
                            id: map.headers.length,
                            headerCaption: k,
                            headerSort: asc,
                            active: true,
                            map: map.id,
                        }
                        i++
                        if (header) { map.headers.push(header) }
                    }
                    let items = []
                    for (const k in pay) {
                        if (k === "token") { continue }
                        const item = pay[k]
                        if (map.items) { items.push(item) }
                    }
                    if (items.length > 0) {
                        map.items = items.slice().reverse()
                        map.default = items
                    }
                    state.mappings.push(map)
                }
            }
        },
        appendTableRow: (state, action) => {
            const pay = action.payload.content
            pay.id = state.mapping.default.length + 1
            state.mapping.default.push(pay)
        },
        setTableSelection: (state, action) => {
            // if (action.payload) {
            const pay = action.payload
            const b = state.mappings[pay.map].items.find(bi => bi.id === pay.item.id)
            if (b) {
                state.mappings[pay.map].current = b
                console.log(b.id)
            }
            // }
        },
        updateTableRow: (state, action) => {
            const pay = action.payload
            const b = state.mapping.items.findIndex(bi => bi.id === pay.id)

            if (state.mapping.items[b]) {
                state.mapping.items[b] = pay.item
            }
        },
        filterItems: (state, action) => {
            const pay = action.payload
            const query = pay.query.toLowerCase().substring(1, pay.query.length)
            const tdata = state.mappings[pay.map].default.slice().reverse()
            const headers = state.mappings[pay.map].headers.slice().reverse()
            if (pay.query.length > 1) {
                state.mappings[pay.map].query = pay.query
            } else {
                state.mappings[pay.map].query = ''
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
            state.mappings[pay.map].items = filter
        },
        sortascending: (state, action) => {
            const header = action.payload
            // const headerIdx = state.mappings[header.map].headers.findIndex(id => state.mappings[header.map].headers[header.id] === id)
            console.log(state.mappings[header.map].headers[header.id].headerCaption)
            state.mappings[header.map].items = ([]
                .concat(state.mappings[header.map].items)
                .sort((a, b) => a[header.headerCaption] < b[header.headerCaption] ? 1 : -1)
            )
            // if (state.mappings[header.map].headers[header.id]) {
            state.mappings[header.map].headers[header.id].headerSort = desc
            console.log(state.mappings[header.map].headers[header.id].headerSort)
            // }
        },
        sortdescending: (state, action) => {
            const header = action.payload
            // const headerIdx = state.mappings[header.map].headers.findIndex(id => state.mappings[header.map].headers[header.id] == id)
            console.log(state.mappings[header.map].headers[header.id])
            // console.log(state.mappings[header.map].id)
            state.mappings[header.map].items = ([]
                .concat(state.mappings[header.map].items)
                .sort((a, b) => a[header.headerCaption] > b[header.headerCaption] ? 1 : -1)
            )
            // if (state.mappings[header.map].headers[header.id]) {
            state.mappings[header.map].headers[header.id].headerSort = asc
            console.log(state.mappings[header.map].headers[header.id].headerSort)
            // }
        },
        loadTableData: (state, action) => {
            // state.mapping = null
            const table = state.mappings.findIndex((t) => t.name === action.payload.table)
            if (state.mappings[table]) {
                console.log("loading table data " + table)
                // state.mapping = null
                state.mapping.data = initialState.mapping.data
                state.mapping.headers = []
                state.mapping.output = initialState.mapping.output
                state.mapping.items = initialState.mapping.items
                state.mapping.default = initialState.mapping.default
                state.mapping = state.mappings[table]
                console.log(state.mapping.name)
                // const prior = state.mappings.findIndex((t) => t.name === state.mapping.name)
                // state.mappings[prior] = state.mapping
                // console.log(state.mapping.name)
            }
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
                    if (restricted) { continue }
                    const header = {
                        id: i,
                        headerCaption: k,
                        headerSort: asc,
                        active: true,
                    }
                    i++
                    if (header) { state.mapping.headers.push(header) }
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

export const { transportTableX, appendRow, setTableSelection, updateTableRow, filterItemsI, filterItems, sortdescending, sortascending, loadTableDataX, loadTableData } = mappingSlice.actions;

export default mappingSlice.reducer;
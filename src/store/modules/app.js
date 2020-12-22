const app = {
    state: {
        nationwide: false,
        cardShow: false,
        showErrorTable: false,
        showModuleOptions: false,
        moduleOptions: {}
    },
    mutations: {
        SET_NATIONWIDE: (state, nationwide) => {
            state.nationwide = nationwide
        },
        SET_CARDSHOW: (state, cardShow) => {
            state.cardShow = cardShow
        },
        SET_SHOWERRORTABLE: (state, showErrorTable) => {
            state.showErrorTable = showErrorTable
        },
        SET_SHOWMODULEOPTIONS:(state,showModuleOptions)=>{
            state.showModuleOptions = showModuleOptions
        },
        SET_MODULEOPTIONS: (state, moduleOptions) => {
            state.moduleOptions = moduleOptions
        },
    },
    actions: {

    }
}

export default app
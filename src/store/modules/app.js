const app = {
    state: {
        nationwide: false,
        cardShow: false,
        showErrorTable: false,
        showModuleOptions: false,
        moduleOptions: {
            unitStatistics: true,
            unitStatisticsRannking: true,
            onlineUnitActivationInfo: true,
            deviceStatistics: true,
            deviceTypeInfo: true,
            onlineDeviceInfor: true,
            comprehensiveStatistics: true,
            equipmentAbnormality: true,
            deviceStatisticsFloat: true,
            drawersNumber: true,
            documentOperation: true,
            cabinetDistributionNumber: true,
            cabinetDistributionUnit: true,
            callDistribution: true
        },
        isErrorDetails: true
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
        SET_SHOWMODULEOPTIONS: (state, showModuleOptions) => {
            state.showModuleOptions = showModuleOptions
        },
        SET_MODULEOPTIONS: (state, moduleOptions) => {
            state.moduleOptions = moduleOptions
        },
        SET_ERRORDETAILS:(state,isErrorDetails)=>{
            state.isErrorDetails = isErrorDetails
        }
    },
    actions: {

    }
}

export default app
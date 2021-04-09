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
        isErrorDetails: false,
        adcode: '100000',
        timer: 3000,
        whichClick: 1
    },
    mutations: {
        // 是否显示左右侧边信息
        SET_NATIONWIDE: (state, nationwide) => {
            state.nationwide = nationwide
        },
        SET_CARDSHOW: (state, cardShow) => {
            state.cardShow = cardShow
        },
        // 是否显示异常列表
        SET_SHOWERRORTABLE: (state, showErrorTable) => {
            state.showErrorTable = showErrorTable
        },
        // 是否显示展示项
        SET_SHOWMODULEOPTIONS: (state, showModuleOptions) => {
            state.showModuleOptions = showModuleOptions
        },
        SET_MODULEOPTIONS: (state, moduleOptions) => {
            state.moduleOptions = moduleOptions
        },
        // 是否显示省市区的头部信息
        SET_ERRORDETAILS: (state, isErrorDetails) => {
            state.isErrorDetails = isErrorDetails
        },
        SET_ADCODE: (state, adcode) => {
            state.adcode = adcode
        },
        SET_TIMER: (state, timer) => {
            state.timer = timer
        },
        // 顶部数据展示功能点击
        SET_WHICHCLICK: (state, whichClick) => {
            state.whichClick = whichClick
        }
    },
    actions: {

    }
}

export default app
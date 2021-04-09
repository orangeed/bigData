import request from '../utils/request'

// 设备统计信息
export const deviceStatistics = (params) => {
    return request({
        url: '/deviceStatistics',
        method: 'get',
        params
    })
}

// 实施设备激活信息
export const realTimeDeviceActivation = (params) => {
    return request({
        url: '/realTimeDeviceActivation',
        method: 'get',
        params
    })
}

// 设备异常统计信息
export const deviceErrorInfo = (params) => {
    return request({
        url: '/deviceErrorInfo',
        method: 'get',
        params
    })
}

// 设备类型统计信息
export const deviceTypeInfo = (params) => {
    return request({
        url: '/deviceTypeInfo',
        method: 'get',
        params
    })
}

// 设备抽屉状态
export const deviceDrawerState = (params) => {
    return request({
        url: '/deviceDrawerState',
        method: 'get',
        params
    })
}

// 抽屉操作情况
export const deviceDrawerOp = (params) => {
    return request({
        url: '/deviceDrawerOp',
        method: 'get',
        params
    })
}
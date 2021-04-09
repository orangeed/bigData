import request from '../utils/request'

// 设备总量热力图
export const heatMapDeviceAll = (params) => {
    return request({
        url: '/heatMapDeviceAll',
        method: 'get',
        params
    })
}

// 设备在线量热力图
export const heatMapDeviceOnline = (params) => {
    return request({
        url: '/heatMapDeviceOnline',
        method: 'get',
        params
    })
}

// 设备异常量热力图
export const heatMapDeviceError = (params) => {
    return request({
        url: '/heatMapDeviceError',
        method: 'get',
        params
    })
}
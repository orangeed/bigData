import request from '../utils/request'

// 单位数量统计信息
export const unitStatistics = (params) => {
    return request({
        url: '/unitStatistics',
        method: 'get',
        params
    })
}

// 省份或者城市的单位数量统计
export const provinceCityStatistics = (params) => {
    return request({
        url: '/provinceCityStatistics',
        method: 'get',
        params
    })
}

// 实时单位激活信息
export const realTimeUnitActivation = (params) => {
    return request({
        url: '/realTimeUnitActivation',
        method: 'get',
        params
    })
}
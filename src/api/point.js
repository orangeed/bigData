import request from '../utils/request'

// 点位信息
export const pointInfo = (params) => {
    return request({
        url: '/pointInfo',
        method: 'get',
        params
    })
}

// 点位详情信息
export const pointInfoDetal = (params) => {
    return request({
        url: '/pointInfoDetal',
        method: 'get',
        params
    })
}
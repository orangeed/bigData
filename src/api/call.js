import request from '../utils/request'

// 催缴信息
export const call = (params) => {
    return request({
        url: '/call',
        method: 'get',
        params
    })
}
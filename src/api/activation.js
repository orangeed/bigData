import request from '../utils/request'

// 激活统计信息
export const activation = (params) => {
    return request({
        url: '/activation',
        method: 'get',
        params
    })
}
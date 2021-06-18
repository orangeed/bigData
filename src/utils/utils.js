var infoWin;
var tableDom;
/**
 * 封装便捷的撞题
 * @param {AMap.Map} map
 * @param {Array} event
 * @param {Object} content
 */
export const openInfoWin = (map, event, content) => {
    if (!infoWin) {
        infoWin = new AMap.InfoWindow({
            autoMove: false,
            isCustom: true, //使用自定义窗体
            offset: new AMap.Pixel(130, 100)
        });
    }

    var x = event.offsetX;
    var y = event.offsetY;
    var lngLat = map.containerToLngLat(new AMap.Pixel(x, y));

    if (!tableDom) {
        let infoDom = document.createElement('div');
        infoDom.className = 'info';
        tableDom = document.createElement('table');
        infoDom.appendChild(tableDom);
        infoWin.setContent(infoDom);
    }

    var trStr = '';
    for (var name in content) {
        var val = content[name];
        trStr +=
            '<tr>' +
            '<td class="label">' + name + '</td>' +
            '<td>&nbsp;</td>' +
            '<td class="content">' + val + '</td>' +
            '</tr>'
    }

    tableDom.innerHTML = trStr;
    infoWin.open(map, lngLat);
}

export const closeInfoWin = () => {
    if (infoWin) {
        infoWin.close();
    }
}

/**
 * 对象数组数字中的值排序
 */
export const sortObjectArray = (objArray) => {
    return objArray.slice(0).sort(function (a, b) {
        return b.value - a.value;
    });

}

/**
 * 将数组对象中的制定字段的值返回成为一个数组
 * @param {Array} val
 * @param {String} key
 * @returns
 */
export const returnArr = (val, key) => {
    // console.log('11111', val);
    // 非数组或数据长度为0抛出异常
    if (!(val instanceof Array) || val.length === 0) {
        throw new Error('过滤的数据类型不是数组或者长度不能为0')
    }
    const cache = []
    val.forEach(v => {
        if (Object.keys(v).includes(key)) {
            Object.keys(v).forEach((item, index) => {
                if (key === item) {
                    cache.push(Object.values(v)[index])
                }
            })
        } else {
            throw new Error('没有相对应的字段')
        }
    })
    return cache
}
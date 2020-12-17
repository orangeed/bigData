# 大屏展示项目

> 公司项目展示大数据的项目

## components
### data-bottom 
data-bootom 是页面底部的组件，用于展示新激活的设别数量以及新注册的单位数量

### data-left
data-left 是左边页面显示的组件，用于展示单位信息的一系列统计

### data-right
data-right 是右边页面显示的组件，用于展示设备信息的一系列统计

### data-notice
data-notice 是提示框

### data-map
data-map 是地图组件,世界地图,中心区域为中国地图,作为项目的背景

### data-top
data-top 是大屏展示的最顶部标题

### data-nationwide
data-nationwide 是显示全国设备信息的组件,当地图切换到省份及以下的级别时候才显示,左右两边的信息也将随之改变.当点击点位的时候,该组件照样显示,但是左右两边的数据不再显示,而是弹出卡片,展示该点位的信息.

### data-card
data-card 是显示点位信息的组件,和左右两边的数据是共存的.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

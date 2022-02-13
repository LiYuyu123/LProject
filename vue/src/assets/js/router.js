export const factorMonitor = {
    name: '要素监测',
    routePath: '/factorMonitor',
    children: [
        { name: '综合描述', routeName: 'Description',childrenData:[
                { name: '最高气温', routeName: 'Temp' },
                { name: '最低气温', routeName: 'Temp'},
                { name: '高温日数', routeName: 'HightTempDays'},
                { name: '低温日数', routeName: 'LowTempDays'},
                { name: '降水总量', routeName: 'Rainfall' },
                { name: '降水日数', routeName: 'RainfallDays' },
                { name: '暴雨日数', routeName: 'HeavyRainDays'},
                { name: '日照时数', routeName: 'Sunlight'},
                { name: '无日照日', routeName: 'WithoutSunlight'  },
                { name: '风向风速', routeName: 'WindSpeed' },]},
        { name: '综合描述', routeName: 'Description',childrenData:[
                { name: '最高气温', routeName: 'Temp' },
                { name: '最低气温', routeName: 'Temp'},
                { name: '高温日数', routeName: 'HightTempDays'},
                { name: '低温日数', routeName: 'LowTempDays'},
                { name: '降水总量', routeName: 'Rainfall' },
                { name: '降水日数', routeName: 'RainfallDays' },
                { name: '暴雨日数', routeName: 'HeavyRainDays'},
                { name: '日照时数', routeName: 'Sunlight'},
                { name: '无日照日', routeName: 'WithoutSunlight'  },
                { name: '风向风速', routeName: 'WindSpeed' },]},
    ]
}
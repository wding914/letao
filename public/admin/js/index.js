$(function () {

    //插件echarts:
    //柱状图------------------------------------------------------------
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".canvas .left"));
    // 指定图表的配置项和数据

    //后台传入数据
    var data = {
        title: '2019年注册人数',
        list: [
            { month: "1月", count: 1200 },
            { month: "2月", count: 1300 },
            { month: "3月", count: 1400 },
            { month: "4月", count: 1000 },
            { month: "5月", count: 200 },
            { month: "6月", count: 800 },
        ]
    }
    var months = [];
    var counts = [];
    for (var i = 0; i < data.list.length; i++) {
        months.push(data.list[i].month);
        counts.push(data.list[i].count);
    }
    var option = {
        title: {
            text: data.title
        },
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: months
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: counts
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    //饼状图-------------------------------------------------------------
    var myChart = echarts.init(document.querySelector(".canvas .right"));
    option = {
        title: {
            text: '热门品牌销售',
            subtext:'2019年3月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '新百伦', '李宁', '阿迪王']
        },
        series: [
            {
                name: '热门品牌销售',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪' },
                    { value: 234, name: '新百伦' },
                    { value: 135, name: '李宁' },
                    { value: 1548, name: '阿迪王' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
})

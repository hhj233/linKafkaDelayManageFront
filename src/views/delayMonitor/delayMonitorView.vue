<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import ajax from '@/components/ajax/ajax'
const REQUEST = {
  getDetailMonitor: {
    'url': '/delayMessageMonitor/monitor',
    'method': 'post'
  }
}
export default {
  name: "delayMonitorView",
  data: function data() {
    return {
      monitor: [],
      chart: {},
    }
  },
  mounted() {
    setInterval(this.getData, 1000);
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(this.$refs.chart);

    // 图表的配置
    const option = {
      title: {
        text: '消息延时转发实时监控'
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6', '7']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.monitor,
        type: 'line'
      }]
    };

    // 使用刚指定的配置项和数据显示图表
    this.chart.setOption(option);


  },
  methods: {
    getData() {
      ajax({
        ...REQUEST['getDetailMonitor']
      }).then(res => {
        console.log(res)
        if (res.code = 200) {
          this.monitor= res.data
          this.renderChart()
        }
      })
    },
    renderChart() {
      const option = {
        xAxis: {
          type: 'category',
          data: Array.from({ length: 1000 }, (_, i) => i)
        },
        yAxis: {
          type: 'value',
          name: '转发时延 /ms'
        },
        series: [{
          data: this.monitor,
          type: 'line'
        }]
      };
      this.chart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>
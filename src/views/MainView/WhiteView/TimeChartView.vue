<template>
  <div id="chart-view">
    <div ref="heatMap" id="heatMap">
    </div>
  </div>
</template>

<script>
import api from "@/service/timeChart";
import {mapState} from "vuex";

export default {
  name: "TimeChartView",
  data() {
    return {
      timeScale: null,
      width: 0,
      height: 0
    }
  },
  methods: {
    async fetchRecordsData() {
      let res = await api.getRecords(this.date)
      const heatMapData = res["data"][0]["heatMap"];
      let position = res["data"][0]["position"]

      let data = []
      for (let y = 0; y < position.length; ++y) {
        let p = position[y]
        let heatInfo = heatMapData[p]
        for (let x = 0; x < 24; ++x) {
          let tmp = []

          tmp.push(x)
          tmp.push(y)
          tmp.push(heatInfo[x] || '-')
          data.push(tmp)

        }
      }
      this.drawHeatMap(data, position)

    },
    drawHeatMap(data, position) {
      let chart = this.$echarts.getInstanceByDom(this.$refs["heatMap"]);
      if (chart == null) {
        chart = this.$echarts.init(this.$refs["heatMap"]);
      }
      // prettier-ignore
      const hours = [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ];
      let option = {
        tooltip: {
          position: 'top'
        },
        grid: {
          height: '90%',
          width: '80%',
          top: '0%',
          left: '20%',
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            // show: true,
            // fontSize: 10,
          },
        },
        yAxis: {
          type: 'category',
          data: position,
          splitArea: {
            show: true
          },
          splitLine: {
            show: true
          },
          axisLabel: {
            show: true,
            rotate: 0,
            fontSize: 10,
            interval: 0,
          },
        },
        visualMap: {
          min: 0,
          max: 300,
          calculable: true,
          orient: 'horizontal',
          left: '40%',
          itemWidth: 4,
          bottom: '0%',
          textStyle: {
            fontSize: 10
          }

        },
        series: [
          {
            type: 'heatmap',
            data: data,
            label: {
              // show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(12,12,12,0.5)',
              },
            },
          }
        ]
      };
      chart.setOption(option)
      chart.on('click', function (item) {
        console.log(item)
      })
    },
    dataUpdate() {
      if (this.date) {
        this.fetchRecordsData()
      }
    },
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
      dateChanged: state => state.dateChanged,
      recordLimitChanged: state => state.recordLimitChanged
    })
  },
  watch: {
    dateChanged() {
      this.dataUpdate()
    },
  },
  mounted() {
    this.fetchRecordsData()
  }
}
</script>

<style scoped lang="scss">
#chart-view {
  height: 100%;

  #heatMap {
    margin-top: 10px;
    height: calc(98% - 10px);
    width: calc(95% - 2 * var(--boundary-width));
  }

}
</style>

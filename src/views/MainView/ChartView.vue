<template>
  <div id="chart-view">
    <el-col style="height: 100%;">
      <el-row style="height: 100%;">
        <div ref="overall" id="overall"/>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import api from "@/service/charts";

export default {
  name: "ChartView",
  data() {
    return {};
  },
  mounted() {
    this.drawOverall();
  },
  methods: {
    async drawOverall() {
      let chart = this.$echarts.getInstanceByDom(this.$refs["overall"]);
      if (chart == null) {
        chart = this.$echarts.init(this.$refs["overall"]);
      }
      const res = await api.getCommunityCnt();
      const data = res["data"];

      let _this = this
      chart.setOption(
          {
            graphic: _this.genterateGraphic(data["finishedCnt"], data["totalCount"] - data["finishedCnt"], "统计结果", "right"),
            title: {
              text: "白名单核酸情况总况",
              // left: "center",
              x: "27%"
            },
            tooltip: {
              trigger: "item"
            },
            legend: {
              orient: "vertical",
              left: "left"
            },
            series: [
              {
                name: "Access From",
                type: "pie",
                radius: "70%",
                center: ["40%", "50%"],
                label: {
                  formatter: '{c}',
                  position: 'inside',
                  fontSize: 20
                },
                data: [
                  {value: data["finishedCnt"], name: "已完成"},
                  {value: data["totalCount"] - data["finishedCnt"], name: "未完成"}
                ]
              }
            ]
          },
          true
      );
    },
    genterateGraphic(finishedCnt, unFinishedCnt = 0, label, left) {
      const data = {
        elements: [
          {
            type: 'group',
            left: left,
            top: '100',
            children: [
              {
                type: 'text',
                style: {
                  text: '{a|' + label + '}',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 0,
              },
              {
                type: 'text',
                style: {
                  text: '{a|总人数(白名单)}',
                  rich: {
                    a: {
                      fontSize: 12,
                    }
                  },
                  fill: '#ccc'
                },
                top: 30,
              },
              {
                type: 'text',
                style: {
                  text: '{a|' + (unFinishedCnt + finishedCnt) + '}',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 45,
              },
              {
                type: 'text',
                style: {
                  text: '已完成：',
                  fill: '#ccc',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },

                top: 75
              },
              {
                type: 'text',
                style: {
                  text: '{a|' + (100 * (finishedCnt / (finishedCnt + unFinishedCnt)).toFixed(2)) + '%}',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 90
              },
              {
                type: 'text',
                style: {
                  text: '未完成',
                  fill: '#ccc',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 120
              },
              {
                type: 'text',
                style: {
                  text: '{a|' + (100 * ((unFinishedCnt) / (finishedCnt + unFinishedCnt)).toFixed(2)) + '%}',
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 135
              }
            ]
          }
        ]

      }
      return data;
    },
  },

};
</script>

<style scoped lang="scss">
#chart-view {
  height: 100%;

  #overall {
    margin-top: 10px;
    height: calc(98% - 10px);
    //aspect-ratio: 1/1;
    width: calc(95% - 2 * var(--boundary-width));
  }
}
</style>

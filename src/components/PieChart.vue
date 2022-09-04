<template>
  <div id="pie-chart" ref="piechart"/>
</template>

<script>
export default {
  name: "PieChart",
  methods: {
    drawPieChart(data) {
      const {title, finishedCnt, totalCnt} = data;
      const unfinishedCnt = totalCnt - finishedCnt;

      let chart = this.$echarts.getInstanceByDom(this.$refs["piechart"]);
      if (chart == null) {
        chart = this.$echarts.init(this.$refs["piechart"]);
      }

      chart.setOption(
          {
            graphic: this.generateGraphic(finishedCnt, unfinishedCnt, totalCnt,
                "统计结果", "right"),
            title: {
              text: title,
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
                  formatter: "{c}",
                  position: "inside",
                  fontSize: 20
                },
                data: [
                  {value: finishedCnt, name: "已完成"},
                  {value: unfinishedCnt, name: "未完成"}
                ]
              }
            ]
          },
          true
      );
    },
    generateGraphic(finishedCnt, unFinishedCnt, totalCnt, label, left) {
      return {
        elements: [
          {
            type: "group",
            left: left,
            top: "100",
            children: [
              {
                type: "text",
                style: {
                  text: "{a|" + label + "}",
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 0,
              },
              {
                type: "text",
                style: {
                  text: "{a|总人数}",
                  rich: {
                    a: {
                      fontSize: 12,
                    }
                  },
                  fill: "#ccc"
                },
                top: 30,
              },
              {
                type: "text",
                style: {
                  text: "{a|" + (totalCnt) + "}",
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 45,
              },
              {
                type: "text",
                style: {
                  text: "已完成：",
                  fill: "#ccc",
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },

                top: 75
              },
              {
                type: "text",
                style: {
                  text: `{a|${(finishedCnt / totalCnt * 100).toFixed(2)}%}`,
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 90
              },
              {
                type: "text",
                style: {
                  text: "未完成",
                  fill: "#ccc",
                  rich: {
                    a: {
                      fontSize: 14,
                    }
                  }
                },
                top: 120
              },
              {
                type: "text",
                style: {
                  text: `{a|${(unFinishedCnt / totalCnt * 100).toFixed(2)}%}`,
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
      };
    },
  }
};
</script>

<style scoped>
#pie-chart {
  width: 100%;
  height: 100%;
}
</style>

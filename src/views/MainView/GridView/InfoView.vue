<template>
  <div id="info-view">
    <div id="left" class="boundary">
      <pie-chart ref="piechart"/>
    </div>

    <div id="right" class="boundary">
      <span id="title">名单列表</span>

      <div id="table" ref="infotable">
        <el-table v-if="tableHeight"
                  :data="getPageData()"
                  stripe :height="tableHeight" :max-height="tableHeight">
          <el-table-column v-for="(item, index) in columns" :key="`${index}${item}`"
                           :label="item" :width="wideColumns.includes(item)?'210px':'120px'">
            <template slot-scope="scope">
              {{ scope.row[item] }}
            </template>
          </el-table-column>
        </el-table>

        <div id="pagination">
          <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="currentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/service/grids";
import PieChart from "@/components/PieChart";

export default {
  name: "InfoView",
  components: {PieChart},
  data() {
    return {
      grid: this.$route.query.grid,
      date: this.$route.query.date,
      recordLimit: this.$route.query.recordLimit,
      type: this.$route.query.type,

      columns: null,
      gridPeople: null,
      tableHeight: 0,
      wideColumns: ["证件号码", "出生年月", "户籍地址", "工作单位地址",
        "楼栋编码", "房屋编码", "审核时间", "灰名单原因", "上次核酸检测时间"],

      pageSize: 10,
      currentPage: 1,
      total: 0
    };
  },
  async mounted() {
    this.tableHeight = this.$refs.infotable.clientHeight;
    let cnt;
    let res;
    // cnt = await api.getGridCnt({
    //   "grid": this.grid,
    //   "date": this.date,
    //   "recordLimit": this.recordLimit
    // })
    if (this.type === "white"){
      cnt = await api.getGridCnt({
        "grid": this.grid,
        "date": this.date,
        "recordLimit": this.recordLimit
      })
      res = await api.getGridPeople({"grid": this.grid, "date": this.$store.state.datastore.date});

    }else{
      cnt = await api.getGridGreyCnt({
        "grid": this.grid,
        "date": this.date,
        "recordLimit": this.recordLimit
      })
      res = await api.getGridGreyPeople({"grid": this.grid, "date": this.$store.state.datastore.date});
    }
    const {finishedCnt, totalCnt} = cnt["data"][0];
    this.$refs["piechart"].drawPieChart({
      title: this.type === "white" ? "白名单核酸情况总况" : "灰名单核酸情况总况",
      finishedCnt: finishedCnt,
      totalCnt: totalCnt
    });

    const {columns, people} = res["data"][0];
    this.columns = columns;
    this.gridPeople = people.map(function (row) {
      return row.reduce(function (result, field, index) {
        result[columns[index]] = field;
        return result;
      }, {});
    });
    this.total = this.gridPeople.length;
  },
  methods: {
    getPageData() {
      if(this.gridPeople !== null) {
        return this.gridPeople.slice((this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize);
      }
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
  }
};
</script>

<style scoped lang="scss">
#info-view {
  height: 100%;
  width: 100%;

  #left {
    float: left;
    width: calc(40% - 2 * var(--boundary-width));
    height: calc(45% - 2 * var(--boundary-width));
  }

  #right {
    margin-left: 40%;
    width: calc(60% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));

    #title {
      line-height: 40px;
      font-weight: bold;
    }

    #table {
      width: 100%;
      height: calc(100% - 90px);

      #pagination {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>

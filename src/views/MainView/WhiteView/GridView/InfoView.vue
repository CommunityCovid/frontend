<template>
  <div id="info-view">
    <div id="info-chart" class="boundary">
      <pie-chart ref="piechart"/>
    </div>
    <div id="info-table" class="boundary" ref="infotable">
      <el-table v-if="tableHeight"
                :data="gridPeople"
                stripe :max-height="tableHeight">
        <el-table-column v-for="(item, index) in columns" :key="`${index}${item}`"
                         :label="item" width="150px">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
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

      columns: null,
      gridPeople: null,
      tableHeight: 0
    };
  },
  async mounted() {
    this.tableHeight = this.$refs.infotable.clientHeight;

    const cnt = await api.getGridCnt({
      "grid": this.grid,
      "date": this.date,
      "recordLimit": this.recordLimit
    });
    const {finishedCnt, totalCnt} = cnt["data"][0];
    this.$refs["piechart"].drawPieChart({
      title: "白名单核酸情况总况",
      finishedCnt: finishedCnt,
      totalCnt: totalCnt
    });

    const res = await api.getGridPeople({"grid": this.grid});
    const {columns, people} = res["data"][0];
    this.columns = columns;
    this.gridPeople = people.map(function (row) {
      return row.reduce(function (result, field, index) {
        result[columns[index]] = field;
        return result;
      }, {});
    });
    this.gridPeople = this.gridPeople.slice(2, 20); // todo
  },
  methods: {}
};
</script>

<style scoped lang="scss">
#info-view {
  height: 100%;
  width: 100%;

  #info-chart {
    float: left;
    width: calc(40% - 2 * var(--boundary-width));
    height: calc(45% - 2 * var(--boundary-width));
  }

  #info-table {
    margin-left: 40%;
    width: calc(60% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));
  }
}
</style>

<template>
  <div id="info-view">
    <div id="info-chart" class="boundary">

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

export default {
  name: "InfoView",
  data() {
    return {
      grid: this.$route.query.grid,
      columns: null,
      gridPeople: null,
      tableHeight: 0
    };
  },
  async mounted() {
    this.tableHeight = this.$refs.infotable.clientHeight;

    const res = await api.getGridPeople({"grid": this.grid});
    const {columns, people} = res["data"][0];
    this.columns = columns;
    this.gridPeople = people.map(function (row) {
      return row.reduce(function (result, field, index) {
        result[columns[index]] = field;
        return result;
      }, {});
    });
    this.gridPeople = this.gridPeople.slice(2, 20);

    // const gridsData = this.$store.state.datastore["gridsData"];
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
#info-view {
  height: 100%;
  width: 100%;

  #info-chart {
    float: left;
    width: calc(40% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));
  }

  #info-table {
    margin-left: 40%;
    width: calc(60% - 2 * var(--boundary-width));
    height: calc(100% - 2 * var(--boundary-width));
  }
}
</style>

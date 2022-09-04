<template>
  <div id="grey-list-view">
    <span id="title">灰名单列表</span>
    <div id="grey-list-table" ref="greylistview">
      <el-table v-if="tableHeight"
                :data="greyListPeople"
                stripe :max-height="tableHeight">
        <el-table-column v-for="(item, index) in columns" :key="`${index}${item}`"
                         :label="item" :width="wideColumns.includes(item)?'210px':'120px'">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/service/greyList";

export default {
  name: "GreyListView",
  data() {
    return {
      tableHeight: 0,
      columns: null,
      greyListPeople: null,
      wideColumns: ["证件号码", "出生年月", "户籍地址", "工作单位地址",
        "楼栋编码", "房屋编码", "审核时间", "灰名单原因", "上次核酸检测时间"]
    };
  },
  mounted() {
    this.tableHeight = this.$refs.greylistview.clientHeight;

    this.getGreyList();
  },
  methods: {
    async getGreyList() {
      const res = await api.getGreyListPeople();
      const {columns, people} = res["data"][0];
      this.columns = columns;
      this.greyListPeople = people.map(function (row) {
        return row.reduce(function (result, field, index) {
          result[columns[index]] = field;
          return result;
        }, {});
      });
      this.greyListPeople = this.greyListPeople.slice(2, 20); // todo
    }
  }
};
</script>

<style scoped lang="scss">
#grey-list-view {
  width: 100%;
  height: 100%;

  #title {
    line-height: 40px;
    font-weight: bold;
  }

  #grey-list-table {
    width: 100%;
    height: calc(100% - 45px);
  }
}
</style>

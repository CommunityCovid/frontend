<template>
  <div id="grey-list-view">
    <span id="title">灰名单列表</span>

    <div id="grey-list-table" ref="greylistview">
      <el-table v-if="tableHeight && greyListPeople"
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
        "楼栋编码", "房屋编码", "审核时间", "灰名单原因", "上次核酸检测时间"],
      pageSize: 10,
      currentPage: 1,
      total: 0
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
      this.total = this.greyListPeople.length;
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getPageData() {
      return this.greyListPeople.slice((this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize);
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
    height: calc(100% - 100px);
  }

  #pagination {
    text-align: center;
    margin-top: 10px;
  }
}
</style>

<template>
  <div id="control-view">
    <el-row :gutter="5" style="margin-left: 2px; margin-top: 5px">
      <el-col :span="1">
        <el-upload
            class="upload-demo"
            action=""
            :multiple="false"
            :http-request="uploadFileHandle">
          <el-button size="small" type="info" plain>上传文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="1" :offset="1">
        <div class="block">
          <el-date-picker
              v-model="chosenDate"
              type="date"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择分析日期">
          </el-date-picker>
        </div>
        <!--        <el-popover-->
        <!--            placement="bottom"-->
        <!--            width="200"-->
        <!--            trigger="click">-->
        <!--          <div>calendar</div>-->
        <!--          <el-button slot="reference" size="small" type="info" plain>选择日期</el-button>-->
        <!--        </el-popover>-->
      </el-col>
      <el-col :span="9" :offset="3">
        <div style="margin-top: calc(3%)">
          <el-radio-group v-model="dateNotDone">
            <el-radio :label="1">1天</el-radio>
            <el-radio :label="3">3天</el-radio>
            <el-radio :label="7">7天</el-radio>
            <el-radio :label="14">14天</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-select v-model="timeGranularity" placeholder="请选择"
                   size="small">
          <el-option key="hour" label="小时" value="hour"/>
          <el-option key="day" label="天" value="day"/>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/service/control";

export default {
  name: "ControlView",
  methods: {
    async uploadFileHandle(param) {
      api.uploadFile(param.file);
    }
  },
  data() {
    return {
      chosenDate: "",
      dateNotDone: 3,
      timeGranularity: "day"
    };
  },
  watch: {
    chosenDate(nVal) {
      this.$store.commit("datastore/changeDate", {date: nVal});
    },
    dateNotDone(nVal) {
      this.$store.commit("datastore/changeRecordLimit", {recordLimit: nVal});
    },
    timeGranularity(nVal) {
      this.$store.commit("datastore/changeTimeGranularity", nVal);
    }
  }
};
</script>

<style scoped lang="scss">
#control-view {
  height: 100%;
  overflow: hidden;
}
</style>

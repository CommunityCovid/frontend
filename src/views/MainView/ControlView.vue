<template>
  <div id="control-view">
    <el-row id="control-row" type="flex" justify="flex-start" align="middle"
            :gutter="20">
      <el-col :span="2">
        <el-upload
            class="upload-demo"
            action=""
            :multiple="false"
            :show-file-list = "false"
            :http-request="uploadFileHandle"
            v-loading.fullscreen="loading">
          <el-button size="small" type="info" plain>上传文件</el-button>
        </el-upload>
      </el-col>

      <el-col :span="4">
        <el-date-picker
            v-model="chosenDate"
            type="date"
            size="small"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择分析日期">
        </el-date-picker>
      </el-col>

      <el-col :span="6">
        <el-radio-group v-model="dateNotDone">
          <el-radio :label="1">1天</el-radio>
          <el-radio :label="3">3天</el-radio>
          <el-radio :label="7">7天</el-radio>
          <el-radio :label="14">14天</el-radio>
        </el-radio-group>
      </el-col>

      <el-col :span="3">
        <el-select v-model="timeGranularity" placeholder="请选择"
                   size="small">
          <el-option key="white" label="白名单" value="white"/>
          <el-option key="grey" label="灰名单" value="grey"/>
          <el-option key="hour" label="小时" value="hour"/>
          <el-option key="community" label="小区/工业园" value="community"/>
        </el-select>
      </el-col>

      <el-col :span="2">
        <el-button size="small" plain @click="exportReports">导出报表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/service/control";

export default {
  name: "ControlView",
  data() {
    return {
      chosenDate: "",
      dateNotDone: 1,
      timeGranularity: "white",
      loading: false,
    };
  },
  methods: {
    async uploadFileHandle(param) {
      this.loading = true;
      try{
        await api.uploadFile(param.file);
        this.loading = false;
      }catch(error){
        this.loading = false;
      }
    },
    exportReports() {
      api.getExportReport({"date": this.$store.state.datastore.date});
    }
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

  #control-row {
    height: 100%;
  }
}
</style>

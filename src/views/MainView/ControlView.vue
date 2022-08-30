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
    </el-row>
  </div>
</template>

<script>
import api from "@/service/control";

export default {
  name: "ControlView",
  methods: {
    async uploadFileHandle(param) {
      api.uploadFile(param.file)
    }
  },
  data() {
    return {
      chosenDate: ''
    }
  },
  watch: {
    chosenDate(nVal, oVal) {
      console.log(oVal, nVal)
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

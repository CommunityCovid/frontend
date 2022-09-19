<template>
  <div id="hourly-view">
    <div id="charts">
      <el-row v-for="i in 8" :key="`line${i}`" class="line">
        <el-col v-for="j in 10" :key="`block${j}`" class="block">
          <bar-chart :ref="`barchart${i}${j}`"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart";
import api from "@/service/barchart";
import housingApi from "@/service/housingList";
import {mapState} from "vuex";

export default {
  name: "CommunityView",
  components: {BarChart},
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const data = {
        "date": this.$store.state.datastore.date,
        "recordLimit": this.$store.state.datastore.recordLimit,
      };
      const res = await api.getHousingTimeInfo(data);
      const {positions, recordsTime} = res["data"][0];

      if (!this.$store.state.datastore.housingsData) {
        const housingsCnt = await housingApi.getHousingCnt(data);
        const housingsData = housingsCnt["data"][0];
        this.$store.commit("datastore/setHousingsData", housingsData);
      }

      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 10; j += 1) {
          const num = i * 10 + j;
          if (!positions[num]) {
            break;
          }
          const gridName = positions[num];
          let records = recordsTime[gridName], done = [], notDone = [];
          const totalCnt = this.$store.state.datastore.housingsData[gridName]["totalCnt"];

          let cnt = 0;
          records.forEach(val => {
            cnt += val;
            done.push(cnt);
            notDone.push(totalCnt - cnt);
          });
          this.$refs[`barchart${i + 1}${j + 1}`][0].drawBarChart({
            "gridName": gridName,
            "records": records,
            "done": done,
            "notDone": notDone
          });
        }
      }
    },
    dataUpdate() {
      if (this.date && this.recordLimit) {
        this.init()
      }
    }
  },
  computed: {
    ...mapState("datastore", {
      date: state => state.date,
      recordLimit: state => state.recordLimit,
      dateChanged: state => state.dateChanged,
      recordLimitChanged: state => state.recordLimitChanged
    })
  },
  watch: {
    dateChanged() {
      this.dataUpdate()
    },
    recordLimitChanged() {
      this.dataUpdate()
    }
  },
};
</script>

<style scoped lang="scss">
#hourly-view {
  width: 100%;
  height: 100%;

  #charts {
    --padding: 5px;

    width: calc(100% - 2 * var(--padding));
    height: calc(100% - 2 * var(--padding));
    padding: var(--padding);

    .line {
      margin: 5px 0 5px 0;
      height: calc((100% - 11 * var(--padding)) / 8); // todo: 奇怪间距
      width: 100%;
    }

    .block {
      margin: 0 5px 0 5px;
      height: 100%;
      width: calc((100% - 20 * var(--padding)) / 10);
    }
  }
}
</style>

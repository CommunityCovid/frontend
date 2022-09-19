<template>
  <div id="main-view">
    <div id="top" class="boundary">
      <control-view/>
    </div>
    <div id="bottom">
      <div id="hourly-view" v-if="timeGranularity==='hour'">
        <hourly-view/>
      </div>
      <div id="white-view" v-else-if="timeGranularity==='white'">
        <white-view/>
      </div>
      <div id="grey-view" v-else-if="timeGranularity==='grey'">
        <grey-view/>
      </div>
      <div id="community-view" v-else-if="timeGranularity==='community'">
        <community-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ControlView from "@/views/MainView/ControlView";
import HourlyView from "@/views/MainView/HourlyView";
import WhiteView from "@/views/MainView/WhiteView";
import GreyView from "@/views/MainView/GreyView";
import CommunityView from "./MainView/CommunityView";

export default {
  name: "MainView",
  components: {GreyView, WhiteView, HourlyView, ControlView, CommunityView},
  data() {
    return {};
  },
  created() {
  },
  watch: {},
  computed: {
    ...mapState("datastore", {
      timeGranularity: state => state.timeGranularity
    })
  }
};
</script>

<style scoped lang="scss">
#main-view {
  width: 100%;
  height: 100%;

  #top {
    width: 100%;
    height: calc(6% - 2 * var(--boundary-width));
  }

  #bottom {
    width: 100%;
    height: 95%;

    #hourly-view {
      width: 100%;
      height: 100%;
    }

    #white-view {
      width: 100%;
      height: 100%;
    }

    #grey-view {
      width: 100%;
      height: 100%;
    }

    #community-view {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

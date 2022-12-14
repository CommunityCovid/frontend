// import {GridModel} from "@/models/gridModel";
// import api from "@/service/grids";

const state = () => ({
    gridsData: null, // 白名单
    greyGridsData: null, // 灰名单
    housingsData: null, //小区
    dateChanged: false,
    date: new Date().toLocaleDateString().replaceAll("/", "-"),

    recordLimitChanged: false,
    recordLimit: 1,

    timeGranularity: "white"
});

const actions = {};

const mutations = {
    setGridsData(state, payload) {
        state.gridsData = payload;
    },
    setHousingsData(state, payload) {
        state.housingsData = payload;
    },
    setGreyGridsData(state, payload) {
        state.greyGridsData = payload;
    },
    changeDate(state, {date: date}) {
        state.date = date;

        state.dateChanged = !state.dateChanged;
    },
    changeRecordLimit(state, {recordLimit: recordLimit}) {
        state.recordLimit = recordLimit;

        state.recordLimitChanged = !state.recordLimitChanged;
    },
    changeTimeGranularity(state, payload) {
        state.timeGranularity = payload;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

// import {GridModel} from "@/models/gridModel";
// import api from "@/service/grids";

const state = () => ({
    gridsData: null,
    dateChanged: false,
    date: '2022-08-25',

    recordLimitChanged: false,
    recordLimit: 3,
})

const actions = {};

const mutations = {
    setGridsData(state, payload) {
        state.gridsData = payload;
    },
    changeDate(state, {date: date}){
        state.date = date

        state.dateChanged = !state.dateChanged
    },
    changeRecordLimit(state, {recordLimit: recordLimit}){
        state.recordLimit = recordLimit

        state.recordLimitChanged = !state.recordLimitChanged
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

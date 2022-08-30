// import {GridModel} from "@/models/gridModel";
// import api from "@/service/grids";

const state = () => ({
    // grids: [],
    // gridMap: new Map()
    dateChanged: false,
    date: '2022-08-25',

    recordLimitChanged: false,
    recordLimit: 3,
})

const actions = {};

const mutations = {
    changeDate(state, {date: date}){
        state.date = date

        state.dateChanged = !state.dateChanged
    },
    changeRecordLimit(state, {recordLimit: recordLimit}){
        state.recordLimit = recordLimit

        state.recordLimitChanged = !state.recordLimitChanged
    }

    // async initGrids(state) {
    //     const res = await api.getGridsCnt();
    //     const gridsData = res["data"][0];
    //     for (const key in gridsData) {
    //         let grid = new GridModel(key, gridsData[key]["totalCnt"], gridsData[key]["finishedCnt"])
    //         state.grids.push(grid)
    //         state.gridMap.set(key, grid)
    //     }
    // }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

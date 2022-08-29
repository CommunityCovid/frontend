import {GridModel} from "../../models/gridModel";
import api from "@/service/grids";

const state = () => ({
    grids: [],
    gridMap: new Map()
})

const actions = {}

const mutations = {
    async initGrids(state) {
        const res = await api.getGridsCnt();
        const gridsData = res["data"][0];
        for (const key in gridsData) {
            let grid = new GridModel(key, gridsData[key]["totalCnt"], gridsData[key]["finishedCnt"])
            state.grids.push(grid)
            state.gridMap.set(key, grid)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
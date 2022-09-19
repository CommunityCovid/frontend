import request from "@/service/dataService";

export default {
    getGridsCnt(data) {
        return request({
            url: "/api/getGridsCnt",
            method: "POST",
            data
        });
    },
    getGridsGreyCnt(data) {
        return request({
            url: "/api/getGridsGreyCnt",
            method: "POST",
            data
        });
    },
    getGridCnt(data) {
        return request({
            url: "/api/getGridCnt",
            method: "POST",
            data
        });
    },
    getGridPeople(data) {
        return request({
            url: "/api/getGridPeople",
            method: "POST",
            data
        });
    }
};

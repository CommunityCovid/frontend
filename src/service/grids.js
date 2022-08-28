import request from "@/service/dataService";

export default {
    getGridsCnt(){
        return request({
            url: "/api/getGridsCnt",
            method: "get"
        });
    },
    getGridPeople(){
        return request({
            url: "/api/getGridPeople",
            method: "get"
        });
    }
};

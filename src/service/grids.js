import request from "@/service/dataService";

export default {
    getGridsCnt(){
        return request({
            url: "/api/getGridsCnt",
            method: "POST"
        });
    },
    getGridPeople(){
        return request({
            url: "/api/getGridPeople",
            method: "GET"
        });
    }
};

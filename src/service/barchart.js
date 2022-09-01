import request from "@/service/dataService";

export default {
    getGridsTimeInfo(data){
        return request({
            url: "/api/getGridsTimeInfo",
            method: "POST",
            data
        });
    }
};

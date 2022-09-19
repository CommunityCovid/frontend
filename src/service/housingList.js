import request from "@/service/dataService";

export default {
    getHousingCnt(data) {
        return request({
            url: "/api/getHousingCnt",
            method: "POST",
            data
        });
    },
};

import request from "@/service/dataService";

export default {
    getRecords() {
        return request({
            url: "/api/getRecords",
            method: "GET",
        });
    }
};

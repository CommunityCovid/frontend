import request from "@/service/dataService";

export default {
    getGridsCnt(date, recordLimit) {
        return request({
            url: "/api/getGridsCnt",
            method: "POST",
            data: {
                date: date,
                recordLimit: recordLimit
            }
        });
    },
    getGridPeople() {
        return request({
            url: "/api/getGridPeople",
            method: "POST"
        });
    }
};

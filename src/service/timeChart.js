import request from "@/service/dataService";

export default {
    getRecords(date, recordLimit) {
        return request({
            url: "/api/getRecords",
            method: "POST",
            data: {
                date: date,
                recordLimit: recordLimit
            }
        });
    }
};

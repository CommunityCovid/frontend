import request from "@/service/dataService";

export default {
    getRecords(date) {
        return request({
            url: "/api/getRecords",
            method: "POST",
            data: {
                date: date,
                // recordLimit: recordLimit
            }
        });
    }
};

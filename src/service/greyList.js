import request from "@/service/dataService";

export default {
    getGreyListPeople(data) {
        return request({
            url: "/api/getGreyListPeople",
            method: "POST",
            data

        });
    }
};

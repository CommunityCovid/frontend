import request from "@/service/dataService";

export default {
    getGreyListPeople() {
        return request({
            url: "/api/getGreyListPeople",
            method: "POST"
        });
    }
};

import request from "@/service/dataService";

export default {
    getCommunityCnt(){
        return request({
            url: "/api/getCommunityCnt",
            method: "post"
        });
    }
};

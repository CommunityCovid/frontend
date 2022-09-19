import request from "@/service/dataService";

export default {
    getCommunityCnt(data){
        return request({
            url: "/api/getCommunityCnt",
            method: "POST",
            data
        });
    },

    getCommunityGreyCnt(data){
        return request({
            url: "/api/getCommunityGreyCnt",
            method: "POST",
            data
        });
    }
};

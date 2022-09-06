import request from "@/service/dataService";

export default {
    uploadFile(file) {
        let form = new FormData()
        form.append("file", file)
        form.append("name", file.name)
        return request({
            url: "/api/uploadFile",
            method: "POST",
            transformRequest: [function (data, headers) {
                delete headers.post['Content-Type']
                return data
            }],
            headers: {'Content-Type': 'multipart/form-data'},
            data: form
        });
    },
    getExportReport(data){
        return request({
            url: "/api/getExportReport",
            method: "POST",
            data
        });
    }
};

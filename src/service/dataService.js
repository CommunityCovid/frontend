import Vue from "vue";
import axios from "axios";

Vue.prototype.axios = axios;

const dataServerUrl = "http://10.16.3.177:9999";

const service = axios.create({
    baseURL: dataServerUrl,
    timeout: 500000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const code = response.status;
        if (code !== 200) {
            return Promise.reject(response);
        } else {
            return Promise.resolve(response);
        }
    },
    error => {
        let code = 0;
        try {
            code = error.response.data.status;
        } catch (e) {
            if (error.toString().indexOf("Error: timeout") !== -1) {
                Notification.error({
                    title: "网络请求超时",
                    duration: 5000
                });
                return Promise.reject(error);
            }
        }
        if (code) {
            if (code === 500) {
                Notification.error({title: "backend error"});
            }
        }
        return Promise.reject(error.response);
    }
);


export default service;

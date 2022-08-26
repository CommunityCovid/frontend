import Vue from 'vue'
import Vuex from 'vuex'
import datastore from "./models/datastore";

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        datastore
    },
    // strict: debug,
    strict: false,
})

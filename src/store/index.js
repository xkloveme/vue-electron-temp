import Vue from 'vue'
import Vuex from 'vuex'
import db from './../db.js'
console.log('🐛:: db', db)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: db
  },
  getters: {
    // 参数列表state指的是state数据
    getUser (state) {
      return state.user
    },
    getOther ({ user }) {
      return user.other
    },
    getTableStatus ({ user }) {
      return user.tableStatus
    },
    getNotRushEstate ({ user }) {
      return user.notRushEstate
    },
    getHomestead ({ user }) {
      return user.homestead
    },
    // 股票
    getStock ({ user }) {
      return user.stock
    },
    // 基金
    getFund ({ user }) {
      return user.fund
    },
    // 期货
    getFutures ({ user }) {
      return user.futures
    },
    getWorkingList ({ user }) {
      return user.workingList
    },
    getNetworking ({ user }) {
      return user.networking
    },
    getWorkAssessment ({ user }) {
      return user.workAssessment
    },
    getRecommendation ({ user }) {
      return user.recommendation
    },
    getPunishment ({ user }) {
      return user.punishment
    },
    getMarriage ({ user }) {
      return user.marriage
    },
    getTravelDocuments ({ user }) {
      return user.travelDocuments
    },
    getTravelAbroad ({ user }) {
      return user.travelAbroad
    },
    getChildMarriageForeigners ({ user }) {
      return user.childMarriageForeigners
    },
    getChildMarriageTaiwan ({ user }) {
      return user.childMarriageTaiwan
    },
    getChildMoved ({ user }) {
      return user.childMoved
    },
    getPractice ({ user }) {
      return user.practice
    },
    getCriminal ({ user }) {
      return user.criminal
    },
    getRealEstate ({ user }) {
      return user.realEstate
    },
    getPartnership ({ user }) {
      return user.partnership
    },
    getCar ({ user }) {
      return user.car
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user// 将传参设置给state的city
    },
    setOther (state, other) {
      state.user.other = other// 将传参设置给state的city
    },
    setStockAllMarketValue (state, allMarketValue) {
      state.user.stock.allMarketValue = allMarketValue// 将传参设置给state的city
    },
    setStockDesc (state, desc) {
      state.user.stock.desc = desc// 将传参设置给state的city
    },
    setFundAllMarketValue (state, allMarketValue) {
      state.user.fund.allMarketValue = allMarketValue
    },
    setFuturesAllMarketValue (state, allMarketValue) {
      state.user.futures.allMarketValue = allMarketValue
    }
  },
  actions: {
    updateUser ({ commit, state }, user) {
      // 跟后台打交道
      // 调用mutaions里面的方法
      commit('setUser', user)
    },
    updateOther ({ commit, state }, other) {
      commit('setOther', other)
    },
    updateStockAllMarketValue ({ commit, state }, allMarketValue) {
      commit('setStockAllMarketValue', allMarketValue)
    },
    updateStockDesc ({ commit, state }, desc) {
      commit('setStockDesc', desc)
    },
    updateFundAllMarketValue ({ commit, state }, allMarketValue) {
      commit('setFundAllMarketValue', allMarketValue)
    },
    updateFuturesAllMarketValue ({ commit, state }, allMarketValue) {
      commit('setFuturesAllMarketValue', allMarketValue)
    }
  },
  modules: {}
})

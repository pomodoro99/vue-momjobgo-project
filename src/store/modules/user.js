/**
 * 유저정보와 토큰을 set하고 
 * 토큰여부를 확인하는 내용을 작성
 */
export default {

    namespaced: true,

    state: {
        token: sessionStorage.getItem("s-token"),
        user: {
            id: '',
            name: '',
        }
    },

    getters: {
        getUserName (state) {
            return state.user.name
        },
        getUserId (state) {
            return state.user.id
        },

        token (state) {
            return state.token
        },

        hasToken (state) {
            console.log(`hasToken[${state.token}]`)
            // console.log(`token[${state.token}]`)
            return !!state.token
            //return false
        }
    },

    mutations: {
        setToken (state, token) {
            state.token = token
            sessionStorage.setItem("s-token", token);       //세션에 토큰 저장
        },
        setUserName (state, name) {
            state.user.name = name
            //sessionStorage.setItem("s-user", name);     //세션에 유저네임 저장해서 새로고침하더라도 가져올 수 있도록..but 로그아웃 시 에러로 인해 변경
        },
        setUserId (state, id) {
            state.user.id = id
        },
    },

    actions: {
        setToken ({ commit }, token) {
            commit('setToken', token)
        },

        setUserName ({ commit }, name) {
            //console.log(`setUserName[${name}]`)
            commit('setUserName', name)
        },

        setUserId ({ commit }, id) {
            commit('setUserId', id)
        }

    }
}
import Vue from 'vue';

function generateStore(registeredRequests) {
    let state = generateState(registeredRequests);
    let getters = generateGetters(registeredRequests);
    let mutations = generateMutations(registeredRequests);
    let actions = generateActions(registeredRequests);

    let store = {
        namespaced: true,
        state,
        actions,
        getters,
        mutations,
    };

    return store;
}

function generateState(registeredRequests) {
    let state = {};

    Object.keys(registeredRequests).forEach(type => {
        state[type] = false;
    });

    return state;
}

function generateGetters(registeredRequests) {
    let getters = {};

    Object.keys(registeredRequests).forEach(type => {
        getters[type] = (state) => () => {
            return state[type];
        }
    });

    return getters;
}

function generateMutations(registeredRequests) {
    let mutations = {};

    Object.keys(registeredRequests).forEach(type => {
        mutations[type] = (state, value) => {
            return Vue.set(state, type, value);
        }
    });

    return mutations;
}

function generateActions(registeredRequests) {
    let actions = {};

    Object.keys(registeredRequests).forEach(type => {
        actions[type] = ({commit}, value) => {
            commit(type, value);
        }
    });

    return actions;
}

export default generateStore;
import storeSetup from './src/store/module'
import interceptorSetup from './src/interceptors'
import packageConfig from './config'
import getRequestTypes from './src/requestTypes'

function install(Vue, options = {}) {
    if ( ! options.store ) {
        console.error('Pending request tracker: Please provide a store!');
    }

    if ( ! options.axios ) {
        console.error('Pending request tracker: Please provide an axios instance!');
    }

    let registeredRequests = getRequestTypes(options.endpoints);

    if (Object.keys(registeredRequests).length > 0) {
        let vuexNamespace = (typeof options.vuexNamespace === 'undefined') ?
        packageConfig.vuexNamespace : options.vuexNamespace;

        options.store.registerModule(vuexNamespace, storeSetup(registeredRequests));

        interceptorSetup(registeredRequests, options.axios, options.store, vuexNamespace);
    } else {
        console.error('Pending request tracker: Please provide some endpoints!');
    }
}

export default install;
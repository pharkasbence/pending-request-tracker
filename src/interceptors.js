export default function setup(registeredRequests, axios, vuexStore, vuexNamespace) {
    axios.interceptors.request.use(function(request) {
        let currentRequestName = getCurrentRequest(registeredRequests, request.url);

        if (vuexStore.getters[vuexNamespace + '/' + currentRequestName]() === false) {
            setRequestPending(currentRequestName, vuexStore, vuexNamespace);

            return request;
        }
    }, function (error) {
        setRequestFinished(error, registeredRequests, vuexStore, vuexNamespace);

        return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response) {
        setRequestFinished(response, registeredRequests, vuexStore, vuexNamespace);

        return response;
    }, function(error) {
        setRequestFinished(error, registeredRequests, vuexStore, vuexNamespace);

        return Promise.reject(error);
    });
}

function setRequestPending(currentRequestName, vuexStore, vuexNamespace) {
    if (currentRequestName) {
        vuexStore.dispatch(vuexNamespace + '/' + currentRequestName, true);
    }
}

function setRequestFinished(response, registeredRequests, vuexStore, vuexNamespace) {
    let currentRequestName = getCurrentRequest(registeredRequests, response.config.url);

    if (currentRequestName) {
        vuexStore.dispatch(vuexNamespace + '/' + currentRequestName, false);
    }
}

function getCurrentRequest(registeredRequests, url) {
    let requestTypes = Object.keys(registeredRequests);

    for (let i = 0; i < requestTypes.length; i++) {
        let currentRequestName = requestTypes[i];

        if (registeredRequests[currentRequestName] === url) {
            return currentRequestName;
        }
    }

    return null;
}
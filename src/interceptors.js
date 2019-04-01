export default function setup(registeredRequests, axios, vuexStore, vuexNamespace) {
    axios.interceptors.request.use(function(request) {
        setRequestPending(request, registeredRequests, axios, vuexStore, vuexNamespace);

        return request;
    }, function (error) {
        setRequestFinished(error, registeredRequests, axios, vuexStore, vuexNamespace);

        return Promise.reject(error);
    });

    axios.interceptors.response.use(function(response) {
        setRequestFinished(response, registeredRequests, axios, vuexStore, vuexNamespace);

        return response;
    }, function(error) {
        setRequestFinished(error, registeredRequests, axios, vuexStore, vuexNamespace);

        return Promise.reject(error);
    });
}

function setRequestPending(request, registeredRequests, axios, vuexStore, vuexNamespace) {
    let requestTypes = Object.keys(registeredRequests);

    for (let i = 0; i < requestTypes.length; i++) {
        let currentRequestName = requestTypes[i];

        if (registeredRequests[currentRequestName] === request.url) {
            vuexStore.dispatch(vuexNamespace + '/' + currentRequestName, true);

            break;
        }
    }
}

function setRequestFinished(response, registeredRequests, axios, vuexStore, vuexNamespace) {
    let requestTypes = Object.keys(registeredRequests);

    for (let i = 0; i < requestTypes.length; i++) {
        let currentRequestName = requestTypes[i];

        if (registeredRequests[currentRequestName] === response.config.url) {
            vuexStore.dispatch(vuexNamespace + '/' + currentRequestName, false);
            
            break;
        }
    }
}
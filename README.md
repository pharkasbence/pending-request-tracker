# pending-request-tracker

This package generates a vuex module to track async requests 'pending' status.

When you send a request to one of the registered endpoints or receive a response from one of them, it sets the proper 'pending' state value (true or false) via axios interceptors.

## Installation

npm i pending-request-tracker --save

## Usage

### Example

#### register package

```javascript
import Vue from 'vue'
import store from './your/vuex-store/path'
import axios from './your/axios-config/path'
import pendingRequestTracker from 'pending-request-tracker'

let endpoints = ['/your/endpoint', '/your/another/endpoint', '/your/third-endpoint'];

Vue.use(pendingRequestTracker, { axios, store, endpoints });
...
```

#### vue component

```javascript
...
computed: {
    isYourRequestPending() {
        return this.$store.getters['pendingRequestTracker/your:endpoint']();
    },
    isYourSecondRequestPending() {
        return this.$store.getters['pendingRequestTracker/your:another:endpoint']();
    },
    isYourThirdRequestPending() {
        return this.$store.getters['pendingRequestTracker/your:thirdEndpoint']();
    },
}
...
```

## Options

#### 1. Vuex namspace

You can define the vuex module namspace for the package with the 'vuexNamespace' key. Default namespace is 'pendingRequestTracker'.

```javascript
Vue.use(pendingRequestTracker, { axios, store, vuexNamespace: 'yourNamespace' });
```
#### 2. Endpoints

You can define the endpoint collection with an obejct: 

```javascript
let endpoints = {
    yourRequestName: '/your/endpoint',
    yourGroup: {
        yourGroupRequestName1: '/your/another/endpoint',
        yourGroupRequestName2: '/your/third-endpoint',
    }
};
```

Store names will be generated from the urls directly, not from the object key names (just like with the array version).

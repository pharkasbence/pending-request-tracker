export default function getRequestTypes(endpoints) {
    let types = [];

    for (let key in endpoints) {
        if (typeof endpoints[key] === 'object') {
            let p = types;

            types = extend(p, getRequestTypes(endpoints[key]));
        } else {
            let dashParts = endpoints[key].split('-');
            let endpointTypeName = '';
            let i = 0;

            for (let partKey in dashParts) {
                if (dashParts[partKey].length > 0) {
                    if (i == 0) {
                        endpointTypeName += dashParts[partKey];
                    } else {
                        endpointTypeName += dashParts[partKey].charAt(0).toUpperCase() + dashParts[partKey].slice(1);
                    }

                    i++;
                }
            }

            if (endpointTypeName.length > 0 && endpoints[key].length > 0) {
                endpointTypeName = endpointTypeName.replace(new RegExp('/', 'g'), ':');
                endpointTypeName = endpointTypeName[0] == ':' ? endpointTypeName.slice(1) : endpointTypeName;
                types[endpointTypeName] = endpoints[key];
            }
        }
    }

    return types;
}

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
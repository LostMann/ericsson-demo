// Shared service-call.js file
const ServiceCall = require("sf-extension-utils/lib/service-call");
const config = require("config");
const currentEnvironment = config.currentEnvironment;
const { baseServiceUrl } = config[currentEnvironment];
const sc = new ServiceCall({
    baseUrl: baseServiceUrl,
    logEnabled: true
});
module.exports = exports = sc;

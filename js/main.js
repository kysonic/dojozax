/**
 * Dojo project
 * @type {{Object}} - Base config object
 */
dojoConfig = {
    parseOnLoad: true,
    isDebug: true,
    // Packages
    packages: [
        {
            name: "zax",
            location: "/dojozax/js/zax"
        },
        {
            name: "app",
            location: "/dojozax/js/app"
        }
    ],
    async: true,
    deps: ["dojo/parser","dojo/domReady!"],
    callback: function (parser) {

    }
};

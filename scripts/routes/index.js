const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const backClose = require("sf-extension-utils/lib/router/back-close");
backClose.dissmissBuilder = (match, routeData, router, pageInstance, pageProps, route) => {
    return { text: global.lang.done, position: "left" };
};

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({ getPageClass: () => require("pages/page1"), headerBarStyle: { visible: true } })
                }),
                StackRouter.of({
                    path: "/pages/modal",
                    to: "/pages/modal/haberler",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/modal/haberler",
                            build: buildExtender({ getPageClass: () => require("pages/page2"), headerBarStyle: { visible: true } })
                        }),
                        Route.of({
                            path: "/pages/modal/haberler2",
                            build: buildExtender({ getPageClass: () => require("pages/page2"), headerBarStyle: { visible: true } })
                        }),
                    ]
                })
            ]
        })
    ]
});

const unlisten = router.listen((location, action) => {
    console.log(`new route action :  ${action} path : ${location.url}`);
});

module.exports = router;

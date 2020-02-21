const touch = require("sf-extension-utils/lib/touch");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");
const PageTitleLayout = require("components/PageTitleLayout");
const guid = require("sf-extension-utils/lib/guid");
const extend = require("js-base/core/extend");
const System = require("sf-core/device/system");
const FlWait = require("components/FlWait");
const Dialog = require("sf-core/ui/dialog");
const { getProfile } = require("service/profile");

// Get generated UI code
const Page1Design = require("ui/ui_page1");

const Page1 = extend(Page1Design)(
    // Constructor
    function (_super, routeData, router) {
        // Initalizes super class for this page scope
        _super(this);
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnNext.onPress = () => {
            this.router.push("/pages/modal", { message: "Hello World!" });
        };
    });

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();

    let dialog = new Dialog();
    let flWait = new FlWait();
    componentContextPatch(dialog, `dialog${guid()}`);
    dialog.layout.addChild(flWait, `flWait${guid()}`, ".flWait");
    dialog.layout.applyLayout();
    dialog.show();

    getProfile("8e4a94a1-c1cf-4ead-b45c-125ecc02c65a")
        .then(profile => {
            console.log("profile", profile);
        })
        .catch(e => {
            console.error("error", e);
        })
        .finally(e => {
            dialog.hide();
        })




}
/**
 * 
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
}

module.exports = Page1;

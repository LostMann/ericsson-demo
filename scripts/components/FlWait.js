const extend = require('js-base/core/extend');
const FlWaitDesign = require('library/FlWait');

const FlWait = extend(FlWaitDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = FlWait;

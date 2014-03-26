/*
 * gtm-custom-events 
 * Fire Google Analytics Events when using Google Tag Manager
 * https://github.com/nquinlan/gtm-custom-events
 *
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <nick@nicholasquinlan.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Nick Quinlan 
 * ----------------------------------------------------------------------------
 */

function gtmEvent() {
	if(typeof arguments[0] === "object"){
		var customEvent = arguments[0];
		customEvent.event = 'customEvent';
	}

	if(typeof arguments[0] === "string"){
		var customEvent = {
			event: 'customEvent',
			'eventCategory' : arguments[0],
			'eventAction' : arguments[1],
			'eventLabel' : typeof arguments[2] !== "undefined" ? arguments[2] : "",
			'eventValue' : typeof arguments[3] !== "undefined" ? arguments[3] : ""
		};
		if (arguments[4] && typeof arguments[4] === "object" && typeof arguments[4].nonInteraction !== "undefined") {
				customEvent.nonInteraction = arguments[4].nonInteraction;
		}
	}

	if(customEvent){
		var processed = dataLayer.push(customEvent);
		if (customEvent.debug || (arguments[4] && typeof arguments[4] === "object" && typeof arguments[4].debug)) {
			console.debug("Custom Event Processed?", !processed, customEvent);
		}
	}
}

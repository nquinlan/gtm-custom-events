# Google Tag Manager Custom Events
_Fire Google Analytics Events when using Google Tag Manager_

This script plus extensive Tag Manager setup allows you to proxy `ga('send', 'event', ...)` or `_gaq.push('trackEvent', ...)` when using Google Tag manager.

## Usage
To use this script you must [setup Google Tag Manager, as described in the setup section](#setup). Then include `gtm-custom-events.js` anywhere on your site.

You may then call `gtmEvent(...)` to broadcast an event to GA. `gtmEvent()` roughly follows [analytics.js' event tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events), so transistion (if necessary) should be simple.

### Usage Options

```js
gtmEvent(eventCategory, eventAction [, eventLabel [, eventValue, [, additionalArguments]]])
```

```js
gtmEvent({
	'eventCategory' : eventCategory,
	'eventAction' : eventAction,
	'eventLabel' : eventLabel,
	'eventValue' : eventValue,
	'nonInteraction' : nonInteraction,
	'debug' : debug
})
```

### Parameters

| Parameter | Required | Type | Description |
| ----------- | --------- | ---- | ------------- |
| `eventCategory` | Yes | `string` | The category of the event to be passed to Google Analytics |
| `eventAction` | Yes | `string` | The action of the event to be passed to Google Analytics |
| `eventLabel` | No | `string` | The label of the event to be passed to Google Analytics |
| `eventValue` | No | `string` | The value of the event to be passed to Google Analytics |
| `additionalArguments` | No | `object` |  An object including additional arguments, acceptable keys: `nonInteraction` and `debug` |
| `nonInteraction` | No | `boolean` | The non-interaction value of the event to be passed to Google |
| `debug` | No | `boolean` | Whether or not to turn on debug mode (causes `console.debug()` calls. |

#### Usage Examples

```js
gtmEvent('button', 'click', 'nav buttons', 4);

gtmEvent('category', 'action',  'nav buttons',  undefined, {'nonInteraction': 1});

gtmEvent({
  'eventCategory': 'button', 
  'eventAction': 'click', 
  'eventLabel': 'nav buttons',
  'eventValue': 4
});
```

## Setup
A great deal of setup in Google Tag Manager is required to get this to work.

### Macros
First you must setup a number of macros, one for each of the parameters that are passed on to Google: `eventCategory`, `eventAction`, `eventLabel`, `eventValue`, and `nonInteraction`.

Those should be setup as follows:

![Macro Example](https://raw.githubusercontent.com/nquinlan/gtm-custom-events/master/images/macro.png)

As a whole your macro pane should include the following:

![Macros Example](https://raw.githubusercontent.com/nquinlan/gtm-custom-events/master/images/macros.png)

### Rule
You must further setup a rule to be triggered at the event `customEvent`, as such:

![Rule Example](https://raw.githubusercontent.com/nquinlan/gtm-custom-events/master/images/rule.png)

### Tag
Finally, you must setup a tag. This may be either Google Analytics Universal or Google Analytics Classic. Configure the "Track Type" to be event and the "Event Tracking Parameters" to be as such:

![Tag Example](https://raw.githubusercontent.com/nquinlan/gtm-custom-events/master/images/tag.png)

## Library Free

The script included in this repo is extremely light weight. If you don't want to have the additional script on your page you can simply use Google Tag Manager's Data Layer as such:

```js
dataLayer.push({
  'event' : 'customEvent'
  'eventCategory': 'button', 
  'eventAction': 'click', 
  'eventLabel': 'nav buttons',
  'eventValue': 4
});
```

`dataLayer.push` will return false if it triggers something and true if it doesn't. _Don't ask me the logic behind that._

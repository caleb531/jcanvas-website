---
layout: page
title: Support
subtitle: Need something?
permalink: /support/
id: support
show_ads: true
---

## License

jCanvas is licensed under the MIT license. This means you can use jCanvas for whatever purpose under two conditions:

- Leave the copyright notice as it is
- Don't sue me

You can read the full license [on GitHub](https://github.com/caleb531/jcanvas/blob/master/LICENSE.txt).

## Frequently Asked Questions

### Why are my jCanvas shapes mispositioned?

By default, jCanvas considers a shape's center at its (`x`, `y`) position. You can change this behavior using the `fromCenter` property, which will measure a shape's (`x`, `y`) from its top-left corner.

For consistency, the same behavior applies when cropping an image, which also can be reverted using the `cropFromCenter` property.

It is also important to note that for numerical jCanvas properties such as `x`, `y`, `height`, `strokeWidth`, *etc.*, jCanvas requires that their respective values be numbers, *not* strings.

### My jCanvas handles don't rotate!

That's because I haven't added official support for rotation to my Handles plugin. I have [an experimental branch](https://github.com/caleb531/jcanvas/tree/feature-handles-rotation/plugins) on GitHub where I am testing support for rotation, however please be aware that the implementation is rather buggy. Writing the code for dragging rotated handles is surprisingly tricky; I welcome pull requests from any brave souls who wish to give it a try.

### How do I use custom web fonts with jCanvas?

If your web font CSS is embedded on the page via `<link>`, then the success of your font loading in jCanvas is completely contingent on your font loading before your jCanvas code executes. To ensure this, wrap your relevant jCanvas code in a `window` `load` event callback.

```javascript
$(window).load(function () {
  // Add jCanvas text drawings here
});
```

### setPixels() doesn't work locally!

This is probably because you are testing your app from a `file://` URL, which most browsers won't allow; you need to serve your app from a local server instead. See [this StackOverflow post](http://stackoverflow.com/questions/19869150/getimagedata-cross-origin-error) for more details. 

### How do I temporarily show/hide a layer?

To toggle the visibility of a layer, You can use the `setLayer()` method to set the layer's `visible` property to either `true` or `false` (depending on whether you want to show or hid it):

```javascript
// Hide layer temporarily
$('#mycanvas').setLayer('myLayerName', {
  visible: false
});
```

```javascript
// Show layer again
$('#mycanvas').setLayer('myLayerName', {
  visible: true
});
```

## Bug Reports

If you are experiencing an issue with jCanvas, please ensure that you are using the [latest version of jCanvas](https://github.com/caleb531/jcanvas) before contacting me.

If you are contacting me to report a jCanvas bug, please include the following information:

- The version of jCanvas you used
- A complete code sample that reproduces the issue
- What you expected to happen
- What happened instead

Remember, the more you tell me, the more I can help. ;)

## Contact Me

If you have any questions regarding jCanvas or have a bug report to submit, please first check the Documentation or the FAQ above; your question may be already answered there! If you still can't find an answer, you can contact me in several ways

- [Email me](mailto:caleb@calebevans.me)
- [Submit an issue on GitHub](https://github.com/caleb531/jcanvas/issues)
- [Tweet me on Twitter](https://twitter.com/caleb531) (only for quick questions, please)

If you choose to submit an issue on GitHub, please don't submit a follow-up email notifying me that you submitted an issue. I receive immediate notification for all new emails and GitHub issues, so rest assured I will see your post.

## Plugins

If you wish to extend jCanvas with your own methods, you can learn to do so using the [Plugin API]({{ site.baseurl }}/docs/extending/).

If you would like to submit your jCanvas plugin to the public gallery, follow [the procedure for submitting a plugin]({{ site.baseurl }}/lugins/submitting/).

## Gallery

If you would like to submit your jCanvas project to the [public gallery]({{ site.baseurl }}/gallery/), please contact me (see above) with the following information:

- A link to your site/app
- A name to display publicly as the app's author (could be you or someone else)
- A short description of your site/app (I would include this in the gallery)
- Anything else you'd like me to know (link to GitHub, *etc.*)
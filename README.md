# scrollCue.js
scrollCue.js is a JavaScript plugin that works without jQuery.  
Show elements by scrolling.

## Demo
* [Usage](https://prjct-samwest.github.io/scrollCue/)  
* [Examples](https://prjct-samwest.github.io/scrollCue/examples.html)  
* [CSS Customize](https://prjct-samwest.github.io/scrollCue/customize.html)

## Install

### npm Install
```
npm install scrollcue
```

### File Download
https://github.com/prjct-samwest/scrollCue/archive/v1.0.1.zip


## Usage

### Step.1 - Include CSS and Javascript file
Add a CSS link to `<head>` tag.
```html
<link rel="stylesheet" href="scrollCue.css">
```
Add a JavaScript link to just before the `</body>` tag.
```html
<script src="scrollCue.min.js"></script>
```
### Step.2 - HTML Mark up

#### Basic
Set the `"data-cue"` attribute in the target element and specify the animation type.
```html
<img src="001.jpg" data-cue="fadeIn">...</img>
```

#### Parent wrap
You can wrap it in a parent element by setting the `"data-cues"` attribute.
```html
<div data-cues="fadeIn">
    <img src="001.jpg">
    <img src="002.jpg">
    <img src="003.jpg">
    <img src="004.jpg">
    <img src="005.jpg">
    <img src="006.jpg">
</div>
```


#### Grouping wrap
You can group target elements by setting the `"data-group"` attribute.  
With grouping, when the first element is triggered, the remaining elements are also triggered sequentially, regardless of the scroll amount.
```html
<div data-cues="fadeIn" data-group="images">
    <img src="001.jpg">
    <img src="002.jpg">
    <img src="003.jpg">
    <img src="004.jpg">
    <img src="005.jpg">
    <img src="006.jpg">
</div>
```



#### Animations
There are 15 different animations available.

* fadeIn
* slideInLeft
* slideInRight
* slideInDown
* slideInUp
* zoomIn
* zoomOut
* rotateIn
* bounceIn
* bounceInLeft
* bounceInRight
* bounceInDown
* bounceInUp
* flipInX
* flipInY

You can add / custom animation by editing slideCue.css  
*  [CSS Customize](https://prjct-samwest.github.io/scrollCue/customize.html)

### Step.3 - Initialize scrollCue.js
```javascript
scrollCue.init();
```

### More examples
See below for animation confirmation and other markup.  
* [Examples](https://prjct-samwest.github.io/scrollCue/examples.html)  


## Options
|Option|Type|Default|Description|
|---|---|---|---|
|duration|Number|600|Time to show the element.(ms)|
|interval|Number|-0.7|Time interval for showing side-by-side elements. (Integer or Real number)<br> You can use negative numbers.<br>`Integer` : (ms)<br>`Real number` : Percentage of duration time of the previous element.|
|percentage|Number|0.75|Percentage of screen height to start showing elements.(Real number from 0 to 1)|


## Methods
|Method|Arguments|Description|
|---|---|---|
|init|options|Initialize scrollCue.js|
|update| |Update scrollCue.js|


## Browser support
scrollCue.js works on modern browser as Chrome, Firefox, Safari, Edge, IE11.

## Version
The latest version is 1.0.1

## License
Created by SamWest.  
Copyright (c) 2020 SamWest.  
This plugin is released under the MIT License.

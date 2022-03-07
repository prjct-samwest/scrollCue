# scrollCue.js
scrollCue.js is a JavaScript plugin that works without jQuery.  
Show elements by scrolling.  
It works on modern browser as Chrome, Firefox, Safari, Edge, IE11.

## Demo & Document
* [Demo page](https://prjct-samwest.github.io/scrollCue/)
* [Document](https://prjct-samwest.github.io/scrollCue/document.html)

## Install & getting started
Install with npm:
```
npm install scrollCue
```

Install with yarn:
```
yarrn add scrollCue
```

## How to use?
scrollCue.js is a standalone JavaScript plugin with no dependencies. Include the file in the footer of your page and initialise it or use `import`:

```javascript
import { scrollCue } from "scrollcue/scrollCue.js"

scrollCue.init({
  interval: -400,
  duration: 700,
  percentage: 0.8
});
scrollCue.update();
```

## License
Created by SamWest.  
Copyright (c) 2020 SamWest.  
This plugin is released under the MIT License.

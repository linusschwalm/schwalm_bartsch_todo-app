## Chapter 1: Introduction to JavaScript in the Browser

## DOM (Document Object Model) 😍

* **Definition:**  The DOM is a tree-like representation of the HTML structure of a web page.  Each HTML element becomes a node in this tree.
* **Important Note:**  The browser maintains a clear separation between the raw HTML code and its in-memory DOM representation.

<img src="https://miro.medium.com/v2/resize:fit:1046/1*gnC86h8PSwSoXl_IbTEpEg.png" style="margin-left: 75px" width="700"/>

<br>
<hr>

## CSSOM (CSS Object Model) 😍
**Definition:** CSSOM is a tree-like representation of the CSS styles and their associated elements, including both styles from your stylesheets and inline styles.

<img src="https://web.dev/static/articles/critical-rendering-path/constructing-the-object-model/image/dom-tree-827d5511a67a3_1920.png" style="margin-left: 200px" width="500"/>

<br>
<hr>

## DOM vs. CSSOM 🧐
* **CSSOM:** Similar to the DOM, the CSSOM is a tree-like representation of the CSS styles and their associated elements, including both styles from your stylesheets and inline styles.
* **How They Work Together:**  The browser combines the DOM and CSSOM to determine the final visual presentation of the page.  It calculates which styles apply to each element, taking into account things like specificity and inheritance.

<br>
<hr>


## How the Browser Parses `index.html` 🤯
Parsing of html is the process of converting raw bytes of HTML data into a structured tree of nodes that the browser can understand.
We can conceptually think the browser parses the index.html from top to bottom, building the DOM and CSSOM as it goes.
1. **Bytes to Characters:**  The browser receives raw bytes of HTML data from the server. It decodes these bytes into characters.
2. **Tokenization:**  The browser breaks the HTML into tokens, identifying things like start tags (`<div>`) , end tags (`</div>`) , attribute names, etc.
3. **DOM Construction:**  Tokens are converted into DOM nodes, forming the tree structure.
4. **CSSOM Construction:**  In parallel, a similar  process builds the CSSOM.
5. **Render Tree:** Finally, the browser combines the DOM and CSSOM to create the render tree.
   The render tree contains all the information necessary to calculate the visual layout of each element, including:
  * Which elements are visible and which are hidden (e.g., `display: none`).
  * The exact size and position of each element based on the CSS box model.
  * Computed styles after resolving things like inheritance and which CSS rules take precedence.
6. **Paint:** Paint the individual nodes to the screen, which is an expensive operation.
   Therefore, browsers try to optimize this process as much as possible.
   However, rendering can be slow if the render tree is large and if the DOM/CSSOM is manipulated frequently.

![RenderTree](https://web.dev/static/articles/critical-rendering-path/render-tree-construction/image/dom-cssom-are-combined-8de5805b2061e_1920.png)

* **Deep Dive Links:**
  - [Object Model Construction](https://web.dev/articles/critical-rendering-path/constructing-the-object-model?hl=en)
  - [Render Tree Construction](https://web.dev/articles/critical-rendering-path/render-tree-construction)

<br>
<hr>

## **Script Tags Considerations: `<script>`** 🧐

- **Normal Scripts:**  Blocks HTML parsing and executes immediately.
- **Deferred Scripts:**  Downloaded in parallel and executed after HTML parsing is finished.
- **Module Scripts:**  Downloaded in parallel and executed after HTML parsing is finished, with their own isolated scope.


- **Location Matters:**  The location of the script tag affects when the script is executed and whether it has access to the DOM.
- **Best Practice:**  Use `module` scripts for modern JavaScript development and place them in the `<head>`.
- **DOMContentLoaded Event:**  See section `When to access the DOM` below for more details of that event.


### **Examples**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>

  <!-- Blocks HTML parsing and executes immediately,
       does not have access to DOM, unless via DOMContentLoaded Event -->
  <script src="script.js"></script>

  <!-- Downloaded in parallel and executed after HTML parsing is finished,
       does have access to DOM -->
  <script defer src="script.js"></script>

  <!-- Downloaded in parallel and executed after HTML parsing is finished,
       does have access to DOM. Scrips are ES6 modules. -->
  <script type="module" src="script.js"></script>
</head>
<body>
  <h1>Hello, World!</h1>

  <!-- Blocks HTML parsing and executes immediately,
       does have access o DOM -->
  <script src="script.js"></script>
</body>
</html>
```

<br>
<img src="https://i.stack.imgur.com/wfL82.png.png" style="margin-left: 100px" width="600"/>
<br>
<hr>


## Browser Rendering Engines 🤔
* **Definition:**  The rendering engine is the component of the browser that displays the visual representation of a web page.
* **Core Components:**  The engine consists of a parser, a layout engine, and a painter.
* **Parsing:**  The parser converts HTML, CSS into a Document Object Model (DOM) and a CSS Object Model (CSSOM).
* **Layout:**  The layout engine calculates the position and size of each element on the page.
* **Painting:**  The painter renders the elements to the screen.

### Rendering Engines in Popular Browsers
* **Blink:**  Blink is an open-source rendering engine used `Chrome`.
* **WebKit:**  WebKit is an open-source rendering engine used in `Safari`.
* **Gecko:**  Gecko is an open-source rendering engine used in `Firefox`.


<br>
<hr>

## Browser JavaScript Engines 🤔
* **Definition:**  The JavaScript execution engine is the component of the browser that interprets and executes JavaScript code.
* **Core Components:**  The engine consists of a parser, an interpreter, and a compiler.
* **Parsing:**  The parser converts JavaScript code into an Abstract Syntax Tree (AST).
* **Interpretation:**  The interpreter executes the AST directly.
* **Compilation:**  The compiler translates frequently executed code into optimized machine code.
* **Optimization:**  Modern engines use Just-In-Time (JIT) compilation to optimize code execution.

### JavaScript Engines in Popular Browsers
* **V8:**  V8 is an open-source JavaScript engine used in the `Chrome`.
* **SpiderMonkey:**  SpiderMonkey is an open-source JavaScript engine used in `Firefox`.
* **JavaScriptCore:**  JavaScriptCore is an open-source JavaScript engine used in `Safari`.



### Browser Engines Overview

* **Note** Nowadays the Edge browser internally switched to `Chromium`, which is based on Blink and V8 engine.

<br>
<img src="https://www.lambdatest.com/blog/wp-content/uploads/2019/08/browserrenders.jpg" style="margin-left: 75px" width="800"/>
<br>
<hr>

## Google's V8 JavaScript Engine 😎
V8 is an open-source JavaScript engine developed by Google for the Chrome browser.
It is also used in Node.js and other environments.
Node.js is a runtime that allows you to run JavaScript code outside of the browser.

* **Key Components:**
  - **Parser:**  Converts JavaScript code into an Abstract Syntax Tree (AST).
  - **Interpreter:**  Executes the AST directly.
  - **Compiler:**  Translates frequently executed code into optimized machine code.


* **Ignition and TurboFan:**  V8 uses a two-tiered approach to optimize JavaScript execution.
  - **Ignition:**  A lightweight `interpreter` for fast startup and memory savings.
  - **TurboFan:**  An optimizing `compiler` for maximum performance of frequently executed code.
    <br>

![V8 Engine](https://v8.dev/_img/ignition-interpreter/ignition-pipeline.png)

<br>

* **Deep Dive Links:**
  - [V8 JavaScript Engine](https://v8.dev/)
  - [V8 Internals](https://v8.dev/blog/ignition-interpreter)


<br>
<hr>

## What is an Abstract Syntax Tree (AST) anyway? 🧐

* **Definition:** ASTs are tree structures making it easier for programs to analyze and manipulate code as just text.
* **Parsing:**  The process of converting code form text into an AST.
* **DOM and AST:** Browser engines internally create ASTs from HTML and CSS to understand their structure and render them to the screen.
* **JavaScript and AST:** JavaScript engines internally create ASTs from JavaScript code to understand its structure and execute it.


<img src="https://ruslanspivak.com/lsbasi-part7/lsbasi_part7_ast_01.png" style="margin-left: 75px" width="800"/>
<br>
<hr>

## Just-In-Time (JIT) Compilation 😎

* **Just-In-Time Compilation (JIT):** A technique where code is translated into machine-executable instructions during program execution (at runtime). This allows for optimizations based on the code's actual behavior.


### JIT in Google's V8 Engine

* **Ignition Interpreter:** Handles initial execution, generating bytecode for quick startup and reduced memory usage.
* **TurboFan Optimizing Compiler:** Identifies "hot functions" (executed frequently) and compiles them into highly optimized machine code for maximum performance.

### JIT in the Java Virtual Machine (JVM)

* **JVM's and JIT:** The Java Virtual Machines (JVMs) use JIT compilation to improve the performance of long-running apps.
* **HotSpot:** The HotSpot JVM is a popular JVM that uses JIT compilation to optimize Java code execution.

### JIT Key Points

* **JIT Focus:** Both V8 and popular JVMs use JIT compilation to enhance code execution speed.
* **Dynamic Optimization:** JIT compilers adapt optimizations to the code's actual runtime behavior, leading to performance gains not always possible with static, ahead-of-time compilation.

### JIT vs AOT Compilation

* **Just-In-Time (JIT):**  JIT compilation occurs at runtime, translating code into machine instructions as needed.
* **Ahead-Of-Time (AOT):**  AOT compilation occurs before runtime, translating code into machine instructions before execution.
* **Key Differences:**  JIT adapt optimizations based on runtime behavior, while AOT optimizes the entire program before execution.
* **Compiled Languages:** C/C++ use AOT compilation, while JavaScript/Java use JIT compilation.

<br>
<hr>


## What are Viritual Machines (VMs) anyway? 🤯

* **Definition:**  A virtual machine is a software-based emulation of a physical computer that runs programs like a physical machine.
* **JavaScript VMs:**  JavaScript engines like V8 use virtual machines to execute JavaScript code.
* **Java VMs:**  Java Virtual Machines (JVMs) run Java bytecode on different platforms.
* **Why VMs Matter:** VMs provide an execution environment, regardless of the underlying hardware or operating system.

<br>
<hr>


## **The `window` Object** 😍

![img_5.png](img_5.png)

* **Global Object:** The `window` object is the global object in the browser environment.
* **Properties and Methods:**  The `window` object provides numerous properties and methods to interact with the browser environment.

  - `window.location`: The location of the current page.
  - `window.document`: The document object representing the DOM.
  - `window.localStorage`: A key-value store for persisting data across sessions.
  - `window.history`: The browser's history object.
  - `window.navigator`: Information about the browser and the user's system.
  - `window.screen`: Information about the user's screen.

<br>
<hr>

## The `document` Object 😍


![img_2.png](img_2.png)

* **Gateway to the DOM:** In JavaScript, the `document` object is your entry point to interacting with the DOM.
* **Properties and Methods:**  The `document` object provides numerous properties and methods to access and manipulate elements.


* **Common Properties:**
  - `document.head`, The `<head>` element.
  - `document.body`: The `<body>` element.
  - `document.links`: A list of all `<a>` tags.
  - `document.images`: A list of all `<img>` tags.
  - `document.styleSheets`: A list of all stylesheets.
  - `document.scripts`: A list of all scripts.
  - `document.location`: The location of the document. e.g. `https://www.orf.at`


* **Common Methods:**
  - `document.querySelector()`:  Returns the first element that matches a CSS selector.
  - `document.createElement()`:  Creates a new element.
  - `parent.append()`:  Adds an element to the parent element.
  - `element.addEventListener()`:  Adds an event listener to an element.
  - `element.textContent`:  Sets the text content of an element.
  - `element.innerHTML`:  Sets the HTML content of an element.

<br>
<hr>


## DOM Playground 😍

Let's take a closer look at the `document` object, which represents the DOM in JavaScript.

### Time to experiment! 👩‍💻🧑‍💻
For all code snippets below, try them out in the browser console on www.orf.at.<br>
Try to play around with the code snippets to get a better understanding of the DOM.


![img_6.png](img_6.png)

* **Querying DOM Nodes** 😇
```javascript

// The document.querySelector() method returns the first element
//   that matches a specified CSS selector
const header = document.querySelector('header');
console.log(header);

// The document.querySelectorAll() method returns a NodeList of all elements
//   that match a specified CSS selector
const headings = document.querySelectorAll('h1');
console.log(headings);
```


* **Iterating over DOM Nodes** 😇
```javascript
// Query all h1 elements in the document
const headings = document.querySelectorAll('h1');
console.log(headings);

// Iterate over the NodeList of h1 elements
for (const element of headings) {
  // Log the text content of each h1 to the console after removing extra whitespaces
  console.log(element.textContent.replace(/\s+/g, " "));

  // Change the color of each paragraph element to red
  element.style.color = 'red';
}
```

* **Iterating over direct Child Nodes** 😇
```javascript
// Iterate over direct child nodes of the document head
for (const childNode of document.head.childNodes) {
  // Log each child node to the console
  console.log(childNode);
}
```


* **Iterating over CSS Stylesheets** 😇
```javascript
// Iterate over all stylesheets in the document
for (const styleSheet of document.styleSheets) {
  // Disable each stylesheet
  styleSheet.disabled = true;
}
```

* **Creating DOM Nodes**  😇
```javascript
// Create a new h1 element
const newHeading = document.createElement('h1');

// Set the text content and color of the h1 element
newHeading.textContent = 'BREAKNG NEWS: JavaScript is awesome 🚀 ';
newHeading.style.color = 'red';

// Add the new h1 element to the end of the document body
document.body.append(newHeading);
```

* **Adding/Removing DOM Nodes** 😇
```javascript
// Create a new h1 element
const newHeading = document.createElement('h1');
// ..

// Remove an element from the parent element
newHeading.remove();
```

* **DOM Nodes Class Manipulation** 😇
```javascript
// Add a class to an element
const button = document.createElement('button');
button.classList.add('new-class');

// Remove a class from an element
button.classList.remove('old-class');

// Toggle means add the class if it's not there, and remove it if it is.
button.classList.toggle('active');
```

* **Example 1: Creation of DOM Nodes via JavaScript:** 😍
```html
<button id="my-button">
  <img src="https://www.example.com/icon.png"> Click Me!
</button>
```
```javascript
// Create the button element via JavaScript
const button = document.createElement('button');
button.id = 'my-button';

// Create the image element via JavaScript
const img = document.createElement('img');
img.src = 'https://www.example.com/icon.png';

// Append the image to the button
button.append(img);
button.textContent = 'Click Me!';

// Append the button to the body
document.body.append(button);
```

* **Example 2: Creation of DOM Nodes via Template Strings** 😍
```html
<button id="my-button">
  <img src="https://www.example.com/icon.png"> Click Me!
</button>
```
```javascript

// Create the button as a DOM string template
const buttonTemplate = `<button id="my-button">
  <img src="https://www.example.com/icon.png"> Click Me!
</button>`;

// Append the DOM String template into the body via insertAdjacentHTML
document.body.insertAdjacentHTML('beforeend', buttonTemplate);

// Append the DOM String template into the body via innerHTML
document.body.innerHTML += buttonTemplate;
```

<br>
<hr>

## Event based programming 🥳
* **Definition:** Event based programming is a programming paradigm in which the flow of the program is determined by events such as user actions.
* **What is a paradigm?:** A paradigm is a way of thinking about and solving problems.
* **What is a Event?:** An event is a signal that something has happened, such as a mouse click, keypress, or page load.

### Hollywood Principle: *"Don't call us, we'll call you."*

* **Event Listeners:**  Event listeners are functions that listen for specific events and execute code when those events occur.
* **Callback Functions:**  Event listeners there often called `callback functions` because they are called back when the event occurs.
* **Who calls back?** The browser calls the callback function when the event occurs.
* **Event Types:**  Common event types include `click`, `submit`, `change`, `keypress`, `mousemove`, etc.
* **Event Targets:**  Event listeners can be attached to specific DOM Nodes e.g. `document`, `window`, or individual elements.

### Setup Event Listeners

* **Event Listener as Named Function** 😇
```javascript
// We setup a click event listener (aka callback function) as a named function
// This function is called by the browser when the click event happens.
function handleClick(event) {
  console.log('Clicked at:', event.clientX, event.clientY);
}
// We pass the name of the event and the function to addEventListener
document.addEventListener('click', handleClick);
```

* **Event Listener as Anonymous Function** 😇
```javascript
// We setup the click event listener (aka callback function) as an anonymous function
document.addEventListener('click', function(event) {
  console.log('Clicked at:', event.clientX, event.clientY);
});
```
### Event Listener Examples

* **Adding a Key Press Listener** 😇
```javascript
// Add an event listener to the document for keypress events
document.addEventListener('keypress', function(event) {
  console.log('Key pressed:', event.key);
});
```

* **Adding a Mouse Move Listener** 😇
```javascript
// Add an event listener to the document for mousemove events
document.addEventListener('mousemove', function(event) {
  console.log('Mouse moved at:', event.clientX, event.clientY);
});
```

### Event Based Programming Flow

- The flow of event-based programming is different from traditional procedural programming e.g. in Java.
- In procedural programming, the code runs in a linear sequence from top to bottom.
- In event-based programming, the code is executed in response to events, which can happen at any time.

### Event Listener Click Flow
- (1) First we declare the event listener.
- (3) Then we register the event listener with the event target.
- (2) Finally, the browser calls the event listener when the event occurs.

* **The order of execution is: 1 -> 3 -> ...User Click... -> 2**

```javascript
// (1) Declaring the event listener (aka callback function)
function handleClick(event) {
  // (2) Executed when the click event happens
  console.log('Clicked at:', event.clientX, event.clientY);
}
// (3) Registering the event listener with the event target
document.addEventListener('click', handleClick);
```


<br>
<hr>


## Key Stages of Page Loading Events

A page goes through several key stages during the loading process, from the initial request to the final rendering on the screen.
There are certain events that occur at each stage, which can be useful for measuring performance and optimizing the user experience.

### DOMContentLoaded Event
* **Definition:** The `DOMContentLoaded` event fires when the page has been completely loaded and parsed,  but *NOT including* all stylesheets, images.
* **Use Case:**  The `DOMContentLoaded` event is useful for tasks that require access to the DOM, such as adding event listeners or manipulating elements.
* **Defer scripts:**  `defer` or `module` scripts are executed after the `DOMContentLoaded` event fires, so they have access to the DOM.
* **Normal scripts:**  Could listen to the `DOMContentLoaded` event to ensure they have access to the DOM.

```javascript
// Listen for the DOMContentLoaded event in normal scripts, in defer/module scripts it's not necessary
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  // Do something with the DOM
});
```


### Load Event
* **Definition:** The `load` event fires when the page has finished loading and parsing, but *including* all stylesheets, images.
* **Use Case:**  The `load` event is useful for tasks that require the entire page to be loaded, such as measuring page load time or setting up complex interactions.

```javascript
// Listen for the load event
window.addEventListener('load', function(event) {
  console.log('Page fully loaded');
  // Do something after the page has fully loaded
});
```

### Key Performance Metrics
Page Speed Metrics are essential for understanding how quickly a page loads and how responsive it is to user interactions.

* **Time to First Byte (TTFB):** Measures server responsiveness (< 200ms is good, shows server performance).
* **First Contentful Paint (FCP):** When the user starts seeing content on the screen. (< 1.8s is good).
* **First Meaningful Paint (FMP):** When the main, useful content becomes visible. (< 2.5s is good).
* **DOMContentLoaded Event:** When the HTML document is parsed. (Useful for accessing the DOM).
* **Time to Interactive (TTI):** When the page shows a visual reaction after any user input e.g. button click. (< 100ms).
* **Load Event:** When all resources have finished loading. (Useful for complex interactions).

<img src="https://d33wubrfki0l68.cloudfront.net/96ec9d1d49c0dfe04df454a6acdfae2915471925/d1c78/assets/images/posts/timeline-performance-metrics.svg" style="margin-left: 75px" width="800"/>
<br>
<img src="https://docs.kadiska.com/img/product/exp-metrics/lcp_example.png" style="margin-left: 75px" width="800"/>


* **Links:**
  - [Core Web Vitals](https://web.dev/vitals/)
  - [Performance Metrics](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming)
    <br>
<hr>

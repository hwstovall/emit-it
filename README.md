emit-it
=======

A simple event emitter that can be used standalone or subclassed in ES6.

## Installation

`npm install emit-it --save`

## Usage

Import the module using your packaging system. The emitter can be used on its own, or as a base class.

##### Standalone

Using browserify

```javascript
var EmitIt = require('emit-it');
var emitter = new EmitIt();

emitter.subscribe('example', function() { 
    console.log('example event emitted') 
});
 
emitter.emit('example'); //example event emitted
```
Using ES6/Babel

```javascript
import EmitIt from 'emit-it';
let emitter = new EmitIt();

emitter.subscribe('example', function() { 
    console.log('example event emitted') 
});
 
emitter.emit('example'); //example event emitted
```

##### Base Class (ES6/Babel)

```javascript
import EmitIt from 'emit-it';

class Foo extends EmitIt{
    constructor(){
        this.message = "event emitted from class";
    }
    someMethod(){
        this.emit('example');
    }
}

let foo = new Foo();
foo.subscribe('example', function(bar) { 
    console.log(bar.message) 
});
 
foo.someMethod(); //event emitted from class
```

## Methods
 * `subscribe(to, subscriber)` - Subscribes the subscriber function to the specified event
    * `returns` A subscriber object containing the event name and the index of the subscriber that can be passed to `unsubscribe`
* `unsubscribe(ticket)` - Unsubscribes a subscriber from an event
    * `returns` Success {boolean}  
* `emit(event [, ...args])` -  Emits the specified event passing your class (`this`) and any additional arguments to the subscriber
* `event(event)` - Gets the specified event
    * `returns` An object containing methods `remove` and `clear`
* `event(event).remove` - Removes the specified event and all subscribers
* `event(event).clear` - Clears all subscribers from an event

## Tests

`npm test`

## Release History

* 0.1.0 Initial release
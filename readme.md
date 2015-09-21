"Dependency injection" is a somewhat scary term to explain loading modules and making sure
memory footprint is minimal.

I've been thinking a lot about Angular's `$injector` and how I might build a dependency injector
from scratch.

## A thing that creates things

À la angular, I wanted an `injector` as the global namespace, a `module` method that allows
me to both read and create modules. Let's start with creating a module.

We want the interface to be something like

```js
injector.module("egg",[],{
  hatch: function(){
    console.log("chirp chirp")
  }
})
```

Where the name of the module is the first argument, the second argument is
an array of dependencies, and the third argument is the module's prototype.

```js
var injector = {
  module: function(name, dependencies, prototype){


  }
}
```

If there is only the first argument, the injector returns the module's prototype.

```js
injector.module("egg").hatch()
```
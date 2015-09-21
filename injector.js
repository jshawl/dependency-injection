var injector = {
  module: function(name, arrayOfDependencies, proto){
    if(!arrayOfDependencies){
      return this._modules[name]
    }
    var mod = {
      name: name,
      dependencies: arrayOfDependencies
    }
    for( var k in proto ){
      mod[k] = proto[k]
    }
    this._modules[name] = mod
    for( var i = 0; i < arrayOfDependencies.length; i++ ){
      var dep = arrayOfDependencies[i]
      var met = this._modules[dep] && dep ? true : false
      if (typeof dep == "function"){
	var modules = arrayOfDependencies.map(function(d){
          return this._modules[d]	
	}.bind(this))
	dep.apply(this, modules)
	return
      } else if(!met){
	throw new Error("Dependency " + dep + " not met.")
	return
      }
    }
    return mod
  },
  _modules: {}
}

injector.module('pizza',[], {
  slice: function(){
    console.log("nom nom")
  }
})

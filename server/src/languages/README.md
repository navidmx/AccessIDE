# Language Support
Codeable is designed in a way that easily allows for support and implementation of new languages

## Default Commands
The following commands have been predefined and will automatically be called within codeable. 

### Creation
* `createFunction: `
  - `name`: Name of the function, as a string
  - `parameters`: Any parameters for the function, as an array of strings (default: `[]`)

* `createVariable: `
  - `name`: Name of the variable, as a string
  - `value`: Value of variable, as any data type

* `createConstant: `
  - `name`: Name of the constant, as a string
  - `value`: Value of constant, as any data type

* `createForLoop: `
  - `start`: Initial flag value, as a number (default: `0`)
  - `end`: Final flag value, as a number
  - `step`: Value to step by, as a number (default: `1`)
  - `flag`: Name of sentinel variable (default: `i`)
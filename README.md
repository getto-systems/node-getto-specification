# getto-specification

predicate factory : caching return value of boolean-returning-function and compose them

```javascript
const specification = require("getto-specification");

const spec = specification.init();

const conditionA = spec.init(() => {
  return heavy_condition_checker(); // return Promise
});

const text = "text";
const conditionB = spec.init(() => {
  return (text === "text");
});

const compose = spec.all([
  conditionA,
  spec.not(conditionB),
]);

const result = await compose.matches();
console.log(result);
```


###### Table of Contents

- [Requirements](#Requirements)
- [Usage](#Usage)
- [License](#License)

## Requirements

- Node.js : 10.16.0


## Usage

```javascript
const specification = require("getto-specification");

const spec = specification.init();

const conditionA = spec.init(() => {
  return heavy_condition_checker(); // return Promise
});

const text = "text";
const conditionB = spec.init(() => {
  return (text === "text");
});

const compose = spec.all([
  conditionA,
  spec.not(conditionB),
]);

const result = await compose.matches();
console.log(result);
```

### methods

#### init

```javascript
const condition = spec.init(() => {
  return BOOLEAN;
});
```

`spec.init()` is caching function result

#### not

```javascript
const condition = spec.not(another_condition);
```

return invert condition

#### all

```javascript
const condition = spec.all([
  conditionA,
  conditionB,
]);
```

all conditions are sync-checking

```javascript
matches: async () => {
  for(let i in conditions) {
    const condition = conditions[i];
    if (!(await condition.matches())) {
      return false;
    }
  }

  return true;
}
```


### Install

```bash
npm install --save getto-specification
```


## License

getto-specification is licensed under the [MIT](LICENSE) license.

Copyright &copy; since 2019 shun@getto.systems


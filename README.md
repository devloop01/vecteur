# Vecteur

Vecteur (Frech for `vector`) is a simple `vector` library for Javascript/Typescript.

## Installation

```bash
# npm
npm install vecteur
# yarn
yarn add vecteur
# pnpm
pnpm add vecteur
```

## Basic Usage

```js
import { vec2 } from 'vecteur/2d';

const v = vec2(1, 2);

console.log(v.toString()) // x: 1, y: 2

v.add(2, 3).sub(1).mult(-1)

console.log(v.toString()) // x: -2, y: -4
```

import from specific file for smaller bundle size (tree shaking)

```js
import { vec2, ... } from 'vecteur/2d'; // only 2d vector
import { vec3, ... } from 'vecteur/3d'; // only 3d vector
import { vec2, vec3, ... } from 'vecteur'; // both 2d and 3d vector
```

## Inspiration

While working on a project, I needed a simple vector library. I found [Victor](https://github.com/maxkueng/victor) but it was not maintained anymore. I also found [p5.Vector](https://p5js.org/reference/#/p5.Vector) but it was too heavy for my needs. So I decided to create my own library.

While it might not be as complete as the two libraries mentioned above, it is enough for my needs. I will add more features as I need them.

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

#### Built with ❤️ by [Sikriti Dakua](https://github.com/devloop01)

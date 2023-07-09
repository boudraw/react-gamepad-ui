# React Gamepad UI

React Gamepad UI is a set of UI components and hooks that simplify the process of creating user interfaces that can be interacted with using game controllers. The UI Kit is built with React and TypeScript, making it easy to develop, customize and extend according to your needs.

## Features

- **Components**: Pre-built components for quick implementation.
- **Event Callback Driven**: Easy state management with the hooks provided.
- **Fully Customizable**: Styled-components allow for full customization of the UI.
- **TypeScript Support**: Full TypeScript support to catch issues upfront and allow for better refactoring.

## Installation

Install React Gamepad UI into your project by running:

```bash
yarn add react-gamepad-ui
```

or with pnpm:

```bash
pnpm add react-gamepad-ui
```

## Usage

Here's an example of how to use a component and hook from React Gamepad UI:

```jsx
import React from "react";
import { Button, useGamepad } from "react-gamepad-ui";

const MyComponent = () => {
  const gamepad = useGamepad();

  return <Button onPress={gamepad.isButtonPressed("A")}>Press A</Button>;
};

export default MyComponent;
```

Please note that this is a simple example. You can view more examples and API documentation at the [official documentation site](#).

## Development

To set up your environment to develop this tool, start by cloning the repo:

```bash
git clone https://github.com/boudraw/react-gamepad-ui.git
```

Then, install dependencies using yarn:

```bash
cd react-gamepad-ui
yarn install
```

To link your local development version of `react-gamepad-ui` to a demo project, follow these steps:

1. In `react-gamepad-ui`, run:

```bash
yarn link
```

2. In your demo project, run:

```bash
yarn link react-gamepad-ui
```

Now, changes you make in the `react-gamepad-ui` directory will be reflected in your demo project.

## Contributing

Contributions, issues, and feature requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

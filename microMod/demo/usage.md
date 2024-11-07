---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MicroMod from "microMod";

class App extends Component {
  render() {
    return (
      <div>
        <MicroMod />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

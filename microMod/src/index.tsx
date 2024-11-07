import React from "react";
import "./index.scss";

type ComponentProps = {
  title: string;
  [k: string]: any;
};

export default function ExampleComponent(props: ComponentProps) {
  const { type, ...others } = props;

  return (
    <div className="ExampleComponent" {...others}>
      Hello Mod
    </div>
  );
}

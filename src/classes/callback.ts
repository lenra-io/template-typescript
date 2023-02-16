import { Component, IComponent } from "@lenra/components";

export type View = (data: any, props: any) => Component<IComponent> | IComponent;

export type Listener = (props: any, event: any, api: any) => any;
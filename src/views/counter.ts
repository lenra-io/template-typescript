import { Flex, Text, Button, Component, IComponent } from '@lenra/components';
import { Counter } from '../classes/Counter';
import { listeners } from '../index.gen';

export default function (counters: Counter[], { text }): Component<IComponent> | IComponent {
  const counter = counters[0];
  return Flex([
    Text(`${text}: ${counter.count}`),
    Button("+")
      .onPressed(listeners.increment, {
        "id": counter._id
      })
  ])
    .spacing(16)
    .mainAxisAlignment("spaceEvenly")
    .crossAxisAlignment("center")
}


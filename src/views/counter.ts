import { Flex, Text, Button, Component, IComponent } from '@lenra/components';
import { listeners } from '../index.gen';

export default function ([counter], { text }): Component<IComponent> | IComponent {
  return Flex([
    Text(`${text}: ${counter.count}`),
    Button("+")
      .onPressed(listeners.increment, {
        "id": counter._id,
        "datastore": counter.datastore
      })
  ])
    .spacing(16)
    .mainAxisAlignment("spaceEvenly")
    .crossAxisAlignment("center")
}


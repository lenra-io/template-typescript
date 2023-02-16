import { Component, Flex, IComponent, View } from "@lenra/components"
import { views } from "../index.gen"


export default function (_data, _props): Component<IComponent> | IComponent {
  return Flex([
    View(views.menu),
    View(views.home)
  ])
    .direction("vertical")
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}


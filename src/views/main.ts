import { Component, Flex, IComponent, View } from "@lenra/components"
import { data, props } from "../classes/types"
import { views } from "../index.gen"


export default function (_data: data, _props: props): Component<IComponent> | IComponent {
  return Flex([
    View(views.menu),
    View(views.home)
  ])
    .direction("vertical")
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}


import { Component, Flex, IComponent, View } from "@lenra/components"
import { views } from "../index.gen"

export default function (_data, _props): Component<IComponent> | IComponent {
    return Flex([
        View(views.counter)
            .data("counter", {
                "user": "@me"
            })
            .props({ text: "My personnal counter" }),
        View(views.counter)
            .data("counter", {
                "user": "global"
            })
            .props({ text: "The common counter" }),
    ])
        .direction("vertical")
        .spacing(16)
        .mainAxisAlignment("spaceEvenly")
        .crossAxisAlignment("center")
}


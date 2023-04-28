import { data, DataApi, props } from "@lenra/app-server"
import { Component, Flex, IComponent, View } from "@lenra/components"
import { Counter } from "../classes/Counter.js"
import { views } from "../index.gen.js"

export default function (_data: data, _props: props): Component<IComponent> | IComponent {
    return Flex([
        View(views.counter)
            .data(DataApi.collectionName(Counter), {
                "user": "@me"
            })
            .props({ text: "My personnal counter" }),
        View(views.counter)
            .data(DataApi.collectionName(Counter), {
                "user": "global"
            })
            .props({ text: "The common counter" }),
    ])
        .direction("vertical")
        .spacing(16)
        .mainAxisAlignment("spaceEvenly")
        .crossAxisAlignment("center")
}


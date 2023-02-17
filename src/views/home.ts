import { Component, Flex, IComponent, View } from "@lenra/components"
import { Api } from "../classes/Api"
import { Counter } from "../classes/Counter"
import { data, props } from "../classes/types"
import { views } from "../index.gen"

export default function (_data: data, _props: props): Component<IComponent> | IComponent {
    return Flex([
        View(views.counter)
            .data(Api.collectionName(Counter), {
                "user": "@me"
            })
            .props({ text: "My personnal counter" }),
        View(views.counter)
            .data(Api.collectionName(Counter), {
                "user": "global"
            })
            .props({ text: "The common counter" }),
    ])
        .direction("vertical")
        .spacing(16)
        .mainAxisAlignment("spaceEvenly")
        .crossAxisAlignment("center")
}


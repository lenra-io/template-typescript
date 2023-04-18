import { data, props } from '@lenra/app-server'
import { Container, Flex, colors, padding, Image, Flexible, Text, Component, IComponent } from '@lenra/components'

export default function (_data: data, _props: props): Component<IComponent> | IComponent {
  return Container(
    Flex([
      Container(
        Image("logo.png")
      )
        .width(32)
        .height(32),
      Flexible(
        Container(
          Text("Hello World")
            .textAlign("center")
            .style({
              "fontWeight": "bold",
              "fontSize": 24,
            })
        )
      )
    ])
      .fillParent(true)
      .mainAxisAlignment("spaceBetween")
      .crossAxisAlignment("center")
      .padding({ right: 32 })
  )
    .color(colors.Colors.white)
    .boxShadow({
      blurRadius: 8,
      color: 0x1A000000,
      offset: {
        dx: 0,
        dy: 1
      }
    })
    .padding(padding.symmetric(32, 16))
}


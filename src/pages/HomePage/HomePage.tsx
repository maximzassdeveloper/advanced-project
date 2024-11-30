import { FC } from 'react'
import { PostComments } from '@/widgets/PostComments'
import { Collapse } from '@/shared/ui/Collapse'
import { Carousel, CarouselList, Slide } from '@/shared/ui/Carousel'

export const HomePage: FC = () => {
  return (
    <div style={{ maxWidth: 800, width: '100%', margin: '80px auto' }}>
      <PostComments />

      {/* <Carousel>
        <CarouselList>
          <Slide>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt saepe officia nam
              voluptatum voluptates ab, deleniti incidunt sunt. Sed alias accusamus totam voluptatum
              itaque obcaecati, dolorem quod fuga tempora ipsam!
            </p>
          </Slide>

          <Slide>
            <p style={{ background: 'darkgreen' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt saepe officia nam
              voluptatum voluptates ab, deleniti incidunt sunt. Sed alias accusamus totam voluptatum
              itaque obcaecati, dolorem quod fuga tempora ipsam!
            </p>
          </Slide>

          <Slide>
            <p style={{ background: 'darkred' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt saepe officia nam
              voluptatum voluptates ab, deleniti incidunt sunt. Sed alias accusamus totam voluptatum
              itaque obcaecati, dolorem quod fuga tempora ipsam!
            </p>
          </Slide>
        </CarouselList>
      </Carousel> */}

      {/* <Collapse
        title='Как сделать чтобы все работало?'
        // eslint-disable-next-line
        content='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptatum perspiciatis nemo quas. Consectetur, esse dolorem iure ad amet dignissimos aliquam totam ullam repellendus nobis porro placeat magni dolorum ea consequatur eaque magnam provident sit aperiam quae? Vel, sunt dicta!'
      />

      <Collapse
        title='Как сделать чтобы все 22222?'
        defaultExpanded
        // eslint-disable-next-line
        content='Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptatum perspiciatis nemo quas. '
      /> */}

      <p>Элементы далее</p>
    </div>
  )
}

export default HomePage

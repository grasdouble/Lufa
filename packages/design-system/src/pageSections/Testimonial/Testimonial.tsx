import { TestimonialOne } from "./variants/TestimonialOne";
import { TestimonialThree } from "./variants/TestimonialThree";
import { TestimonialTwo } from "./variants/TestimonialTwo";

export type TestimonialStyleProps = {
  imgUrl: string;
  testimonial: string;
  from: string;
  position: string;
};

type TestimonialProps = TestimonialStyleProps & {
  style: number;
};

export const Testimonial = ({
  imgUrl,
  testimonial,
  from,
  position,
  style = 1,
}: TestimonialProps) => {
  switch (style) {
    case 1:
      return <TestimonialOne {...{ imgUrl, testimonial, from, position }} />;
    case 2:
      return <TestimonialTwo {...{ imgUrl, testimonial, from, position }} />;
    case 3:
      return <TestimonialThree {...{ imgUrl, testimonial, from, position }} />;
    default:
      return <TestimonialOne {...{ imgUrl, testimonial, from, position }} />;
  }
};

import { TestimonialStyleProps } from "../Testimonial";

export const TestimonialTwo = ({
  imgUrl,
  testimonial,
  from,
  position,
}: TestimonialStyleProps) => (
  <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
    <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
    <div className="mx-auto max-w-2xl lg:max-w-4xl">
      <figure className="mt-10">
        <blockquote className="text-center text-xl leading-8 font-semibold text-gray-900 sm:text-2xl sm:leading-9">
          <p>{testimonial}</p>
        </blockquote>
        <figcaption className="mt-10">
          <img className="mx-auto h-10 w-10 rounded-full" src={imgUrl} alt="" />
          <div className="mt-4 flex items-center justify-center space-x-3 text-base">
            <div className="font-semibold text-gray-900">{from}</div>
            <svg
              viewBox="0 0 2 2"
              width="3"
              height="3"
              aria-hidden="true"
              className="fill-gray-900"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div className="text-gray-600">{position}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
);

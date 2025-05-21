import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons
import Bob from '../assets/bob.jpg';
import Blake from '../assets/blake.jpg';
import Erica from '../assets/Erica.jpg';

const testimonials = [
  {
    name: 'ROB AALDERS',
    image: Bob,
    quote: " I began investing in cryptocurrency in 2017, and at that time, I would rate my knowledge level as a 4 out of 10. However, I have since acquired a solid understanding of the fundamentals, and thanks to my investments with DefiSkySpace, I have already made over 11 million. This sets me apart from several of my friends who chose to invest their money elsewhere..",
    rating: 5,
  },
  {
    name: 'BLAKE JOHNSON',
    image: Blake,
    quote: 'Investing is the key to financial independence. Through careful planning and strategic investments, I have managed to achieve financial stability and a comfortable lifestyle. The journey was not easy, but the rewards have been worth the effort.',
    rating: 4,
  },
  {
    name: 'ERICA WILLIAMS',
    image: Erica,
    quote: 'Understanding the market trends and making informed investment decisions has significantly improved my financial situation. The support and guidance from experienced investors have been invaluable in my investment journey.',
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex justify-center items-center mt-2">
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={`text-yellow-500 ${index < rating ? 'fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <div className="w-full h-[45rem] mt-3 flex justify-around items-center flex-col phone:h-auto">
      <div className="w-full h-[20%] flex justify-around flex-col items-center">
        <p className="text-3xl font-bold text-center">INVESTORS <span className="text-blue-500">TESTIMONIALS</span></p>
        <div className="w-[40%] h-[50%] text-gray-400 phone:w-[80%]">
          <p className="text-center">Here are a few words from our most trusted investors. These words are like guides to us, and they help weave our deep legal and technical experience into our financial and investment services.</p>
        </div>
      </div>
      <div className="w-[96%] h-[70%] flex justify-around gap-6 flex-wrap items-center">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 30, mass: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="Testicard w-[26%] h-[90%] bg-white flex justify-around shadow-xl rounded-lg items-center flex-col"
          >
            <div className="w-full h-[40%] flex justify-center items-center">
              <div className="w-[150px] h-[150px] rounded-full flex justify-center items-center">
                <img src={testimonial.image} alt={testimonial.name} className='w-full h-full object-cover rounded-full' />
              </div>
            </div>
            <div className='w-full h-[10%] flex justify-center items-center'>
              <p className='font-semibold text-xl'>{testimonial.name}</p>
            </div>
            <div className='w-[90%] h-[45%] flex justify-center items-center flex-col'>
              <p className='text-sm text-center'>{testimonial.quote}</p>
              <StarRating rating={testimonial.rating} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

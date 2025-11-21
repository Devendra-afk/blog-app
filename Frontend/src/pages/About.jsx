import CallToAction from '../components/CallToAction';

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Aditya's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Aditya’s Blog!
              This blog was created by Aditya Khatri as a personal project to share his thoughts, experiences, and ideas with the world.
              Aditya is a passionate developer who enjoys writing about technology, coding, and everything that inspires him.
            </p>

            <p> On this blog, you’ll find regular articles and tutorials on topics like web development, software engineering, and modern programming languages. Aditya is constantly exploring new tools and technologies, so you can always expect fresh and insightful content. </p> <p> Feel free to join the conversation! You can leave comments on posts, like others’ thoughts, and reply to ongoing discussions. We believe that a collaborative learning community helps everyone grow and become better together. </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
export default About
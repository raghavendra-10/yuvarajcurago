import Section from "./Section";

export default function ForumSection() {
  const forumQuestions = [
    {
      question: "Is it normal to feel bloated after water?",
      answer: "This could indicate visceral hypersensitivity. Let's evaluate your gut-brain axis function.",
      timeAgo: "2 hours ago",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      question: "Why do I get stomach pain before important meetings?",
      answer: "The gut-brain connection is very real. Stress signals travel via the vagus nerve directly to your digestive system.",
      timeAgo: "5 hours ago",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      question: "Can gut issues cause brain fog?",
      answer: "Absolutely. The enteric nervous system produces 90% of your body's serotonin. Gut dysfunction affects cognitive function.",
      timeAgo: "1 day ago",
      color: "from-pink-500/20 to-blue-500/20"
    }
  ];

  const testimonials = [
    {
      quote: "After 5 years of 'normal' endoscopies, Dr. Yuvaraj finally explained why I was in pain. The membership gave me peace of mind.",
      author: "Anonymous Member",
      condition: "IBS Patient",
      rating: 5
    },
    {
      quote: "The WhatsApp access is a game-changer. I no longer panic when symptoms flare up because I know expert help is just a message away.",
      author: "Member since 2024",
      condition: "GERD & Anxiety",
      rating: 5
    },
    {
      quote: "Finally, a doctor who understands that my gut issues aren't just in my head. The gut-brain approach transformed my treatment.",
      author: "Priority Circle Member",
      condition: "Functional Dyspepsia",
      rating: 5
    }
  ];

  return (
    <Section bgColor="bg-gradient-to-br from-gray-50 via-white to-primary-50/30" id="community">
      {/* 3D Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side - Live Forum Feed */}
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500/10 to-accent-600/10 backdrop-blur-sm border border-accent-500/20 text-accent-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              Anonymous Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Private Forum
            </h2>
            <p className="text-lg text-gray-700">
              Real questions, expert answers. All anonymous, all verified by Dr. Yuvaraj.
            </p>
          </div>

          {/* Glassmorphism Container */}
          <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/40 shadow-2xl">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 bg-accent-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Live Forum Feed</span>
                </div>
                <span className="text-xs text-gray-600 bg-white/50 px-3 py-1 rounded-full border border-gray-200/50">Updated in real-time</span>
              </div>

              <div className="space-y-5">
                {forumQuestions.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Gradient background on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-semibold text-gray-900 mb-3 leading-relaxed">
                            {item.question}
                          </p>

                          {/* Glassmorphism Answer Box */}
                          <div className="relative bg-gradient-to-br from-primary-500/10 to-primary-600/10 backdrop-blur-sm border-l-4 border-primary-600 p-4 rounded-r-xl shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex-shrink-0 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-xs font-bold text-primary-700 tracking-wide uppercase">Doctor's Verified Answer</span>
                            </div>
                            <p className="text-sm text-gray-800 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-gray-500 font-medium">{item.timeAgo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-gray-700 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 inline-block shadow-md">
                  🔒 Join Priority Circle 365 to access the full forum
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Testimonials */}
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/10 to-primary-600/10 backdrop-blur-sm border border-primary-500/20 text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Member Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Members Say
            </h2>
            <p className="text-lg text-gray-700">
              Real experiences from people who found answers.
            </p>
          </div>

          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="absolute -top-2 -left-2 text-primary-200/40 text-6xl font-serif leading-none">"</div>

                  {/* Rating with glassmorphism */}
                  <div className="flex gap-1 mb-6 relative">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="relative">
                        <svg className="w-6 h-6 text-yellow-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="text-gray-800 mb-6 leading-relaxed text-base font-medium relative z-10">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info with glassmorphism */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                    <div className="flex items-center gap-4">
                      {/* Avatar with gradient */}
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600 bg-gray-100/50 backdrop-blur-sm px-3 py-1 rounded-full inline-block mt-1">
                          {testimonial.condition}
                        </p>
                      </div>
                    </div>

                    {/* Verified badge */}
                    <div className="bg-accent-500/10 backdrop-blur-sm border border-accent-500/20 p-2 rounded-full">
                      <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

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

  return (
    <Section bgColor="bg-gradient-to-br from-beige-200 via-white to-accent-50/30" id="community">
      {/* 3D Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent-200/30 to-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-500/10 to-accent-600/10 backdrop-blur-sm border border-accent-500/20 text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
              Anonymous Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              The Private Forum
            </h2>
            <p className="text-lg text-primary-800">
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
                  <span className="text-sm font-bold text-primary-900">Live Forum Feed</span>
                </div>
                <span className="text-xs text-primary-700 bg-white/50 px-3 py-1 rounded-full border border-primary-200/50">Updated in real-time</span>
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
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-beige-200 to-beige-300 rounded-full flex items-center justify-center shadow-md">
                          <svg className="w-5 h-5 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-base font-semibold text-primary-900 mb-3 leading-relaxed">
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
                            <p className="text-sm text-primary-800 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 mt-3">
                            <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-primary-600 font-medium">{item.timeAgo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm font-medium text-primary-800 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-primary-200/50 inline-block shadow-md">
                  🔒 Join Priority Circle 365 to access the full forum
                </p>
              </div>
            </div>
          </div>
      </div>
    </Section>
  );
}

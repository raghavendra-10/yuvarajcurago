import Section from "./Section";
import Button from "./Button";

export default function PriorityCircleSection() {
  const benefits = [
    {
      number: "1",
      title: "Direct WhatsApp Oversight",
      description: "Guidance on flare-ups and report reviews whenever you need it.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      number: "2",
      title: "Priority Virtual Consults",
      description: "Skip the wait for expert diagnostic sessions with your dedicated gastroenterologist.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "3",
      title: "The Private Forum",
      description: "An anonymous community to ask questions and get surgical-grade answers.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      number: "4",
      title: "Specialist Network",
      description: "Priority access to my physical clinic in Mumbai if 'mechanical' issues are detected.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      number: "5",
      title: "Priority Access",
      description: "Priority access at a special price to all of CuraGo's services.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: "6",
      title: "Easier Rescheduling",
      description: "Flexible appointment management to fit your schedule.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "7",
      title: "Upgrade to Family Coverage",
      description: "Extend benefits to your loved ones with family plan options.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      number: "8",
      title: "Overall Medical Guidance",
      description: "Holistic health support beyond just gastroenterology.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <Section bgColor="bg-white" id="priority-circle">
      <div className="text-center mb-16">
        <div className="inline-block bg-accent-100 text-accent-700 px-6 py-2 rounded-full text-sm font-semibold mb-6">
          The Solution
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          A 365-Day Partnership for{" "}
          <span className="text-primary-600">Your Gut Health</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Priority Circle 365: Continuous care, expert guidance, and peace of mind—all year round.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group bg-gray-50 p-6 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {benefit.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 p-8 md:p-12 rounded-2xl border-2 border-primary-200 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to Take Control of Your Gut Health?
        </h3>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join Priority Circle 365 and get year-round expert support for your digestive wellness.
        </p>
        <Button variant="primary" size="large" href="#apply">
          Apply for Priority Circle 365
        </Button>
      </div>
    </Section>
  );
}

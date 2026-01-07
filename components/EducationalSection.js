import Section from "./Section";

export default function EducationalSection() {
  const theories = [
    {
      title: "Visceral Hypersensitivity",
      description: "Your brain's 'volume control' for gut pain is turned up too high.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "The Vagus Highway",
      description: "Your brain and gut send 100,000 signals a minute. When this communication is 'noisy,' digestion fails.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "The Enteric Nervous System",
      description: "Your gut has its own brain. We don't just treat the stomach and intestines; we recalibrate the connection.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  return (
    <Section bgColor="bg-primary-900" id="science">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          It's not in your head.{" "}
          <span className="text-accent-400">It's in your nerves.</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-xl text-beige-200 mb-6 italic">
            "As a Gastrosurgeon, I see the disoriented Gut-Brain Axis everyday"
          </p>
          <p className="text-lg text-beige-300">
            Few theories that explain the GBA (Gut Brain Axis)
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-primary-800 p-8 md:p-12 rounded-2xl shadow-xl border border-primary-700">
        <div className="space-y-6">
          {theories.map((theory, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center text-accent-400">
                {theory.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  {theory.title}
                </h3>
                <p className="text-beige-200 text-sm leading-relaxed">
                  {theory.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center max-w-4xl mx-auto bg-primary-800 p-8 rounded-xl border border-accent-500">
        <svg className="w-12 h-12 text-accent-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-lg text-white leading-relaxed">
          <strong>The key insight:</strong> We don't just treat the stomach and intestines. We recalibrate the complex bidirectional communication between your gut and brain to restore normal function.
        </p>
      </div>
    </Section>
  );
}

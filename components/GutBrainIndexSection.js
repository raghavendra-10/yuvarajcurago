import Section from "./Section";
import Button from "./Button";

export default function GutBrainIndexSection() {
  return (
    <Section bgColor="bg-white" id="gut-brain-index">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-block bg-primary-100 text-primary-700 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Free Clinical Assessment
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          Understand Your{" "}
          <span className="text-primary-600">Gut-Brain Sensitivity Index</span>
        </h2>

        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Take the 5-minute clinical profiler designed by a Surgical Gastroenterologist.
          Get personalized insights into your gut-brain connection and understand what your symptoms really mean.
        </p>

        <div className="bg-gray-50 p-8 md:p-12 rounded-2xl shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evidence-Based</h3>
              <p className="text-gray-600 text-sm">
                Based on validated clinical research and gastroenterology standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Just 5 Minutes</h3>
              <p className="text-gray-600 text-sm">
                Quick yet comprehensive assessment of your gut-brain symptoms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Confidential</h3>
              <p className="text-gray-600 text-sm">
                Your responses are secure and reviewed by a specialist
              </p>
            </div>
          </div>

          <Button variant="primary" size="large" className="w-full md:w-auto">
            Start My Free Gut Brain Sensitivity Index
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          ✓ No credit card required • ✓ Instant results • ✓ Doctor-reviewed insights
        </p>
      </div>
    </Section>
  );
}

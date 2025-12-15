import Layout from "../components/Layout";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card fade-in">
        <h1 className="text-4xl font-bold mb-6 gradient-text">Terms of Service</h1>
        <p className="text-slate-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing and using NepEarn ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
            <p className="text-slate-300 leading-relaxed">
              NepEarn is an earning platform that allows users to earn coins by completing various tasks, including:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Playing games (scratch cards, spin wheels, puzzles, quizzes)</li>
              <li>Completing offers through our offerwall</li>
              <li>Watching advertisements</li>
              <li>Referring friends</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-3">
              Coins earned can be converted to real money and withdrawn through approved payment methods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. User Accounts</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">3.1 Registration</h3>
              <p className="text-slate-300 leading-relaxed">
                To use our service, you must:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Use a valid email address</li>
                <li>Maintain the security of your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">3.2 Account Responsibility</h3>
              <p className="text-slate-300 leading-relaxed">
                You are responsible for all activities that occur under your account. You agree not to share your account credentials with any third party.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Earning and Rewards</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">4.1 Coin Earning</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Coins are earned by completing tasks as described in the app</li>
                <li>Coin values may vary by task type</li>
                <li>We reserve the right to adjust coin values and task availability</li>
                <li>Daily earning limits may apply</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">4.2 Withdrawals</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Minimum withdrawal amount applies (as specified in the app)</li>
                <li>Withdrawal requests are processed within 7-14 business days</li>
                <li>We reserve the right to verify your identity before processing withdrawals</li>
                <li>Withdrawal methods are subject to availability in your region</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Prohibited Activities</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Use automated scripts, bots, or any fraudulent methods to earn coins</li>
              <li>Create multiple accounts to circumvent limits</li>
              <li>Attempt to hack, reverse engineer, or compromise the platform</li>
              <li>Share or sell your account</li>
              <li>Engage in any activity that violates applicable laws</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use the service for any illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Fraud Detection</h2>
            <p className="text-slate-300 leading-relaxed">
              We employ automated fraud detection systems. If fraudulent activity is detected, we reserve the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Suspend or terminate your account</li>
              <li>Forfeit earned coins</li>
              <li>Block future earnings</li>
              <li>Take legal action if necessary</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Intellectual Property</h2>
            <p className="text-slate-300 leading-relaxed">
              All content, features, and functionality of the Service are owned by NepEarn and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Limitation of Liability</h2>
            <p className="text-slate-300 leading-relaxed">
              NepEarn shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service. Our total liability shall not exceed the amount you have earned in the past 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Modifications to Service</h2>
            <p className="text-slate-300 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the service at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Termination</h2>
            <p className="text-slate-300 leading-relaxed">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Governing Law</h2>
            <p className="text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of [Your Country/Jurisdiction], without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">12. Contact Information</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300">
                <strong>Email:</strong> support@nepearn.com<br />
                <strong>Website:</strong> <a href="/contact" className="text-emerald-400 hover:text-emerald-300">Contact Page</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


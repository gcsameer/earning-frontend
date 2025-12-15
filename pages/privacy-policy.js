import Layout from "../components/Layout";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card fade-in">
        <h1 className="text-4xl font-bold mb-6 gradient-text">Privacy Policy</h1>
        <p className="text-slate-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
            <p className="text-slate-300 leading-relaxed">
              Welcome to NepEarn ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our earning application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">2.1 Personal Information</h3>
              <p className="text-slate-300 leading-relaxed">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Username and email address</li>
                <li>Phone number</li>
                <li>Password (encrypted)</li>
                <li>Referral code</li>
                <li>Payment and withdrawal information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4">2.2 Usage Information</h3>
              <p className="text-slate-300 leading-relaxed">
                We automatically collect certain information when you use our service:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                <li>Device information (device ID, type, operating system)</li>
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Task completion history</li>
                <li>Transaction history</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your account</li>
              <li>Send you notifications about your account and earnings</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
              <li>Personalize your experience</li>
              <li>Analyze usage patterns to improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Advertising and Ad Networks</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              Our application uses Google AdSense and Google AdMob to display advertisements. These services may:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Use cookies and similar technologies to serve personalized ads</li>
              <li>Collect information about your device and browsing behavior</li>
              <li>Use your location data (with your consent) for ad targeting</li>
            </ul>
            <p className="text-slate-300 leading-relaxed mt-3">
              You can opt out of personalized advertising by visiting{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                Google Ad Settings
              </a>
              {" "}or adjusting your device settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Data Sharing and Disclosure</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Service Providers:</strong> With third-party service providers who assist in operating our platform</li>
              <li><strong>Ad Networks:</strong> With Google AdSense and AdMob for advertising purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Your Rights</h2>
            <p className="text-slate-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent at any time</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Cookies and Tracking Technologies</h2>
            <p className="text-slate-300 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Children's Privacy</h2>
            <p className="text-slate-300 leading-relaxed">
              Our service is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">10. Changes to This Privacy Policy</h2>
            <p className="text-slate-300 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">11. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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


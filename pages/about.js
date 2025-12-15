import Layout from "../components/Layout";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card fade-in">
        <h1 className="text-4xl font-bold mb-6 gradient-text">About NepEarn</h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              NepEarn is a legitimate earning platform designed to help users earn extra income by completing simple tasks, playing games, and engaging with advertisements. We believe in providing a fair, transparent, and rewarding experience for all our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">How It Works</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">1. Sign Up</h3>
                <p className="text-slate-300">Create a free account with your email address</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">2. Complete Tasks</h3>
                <p className="text-slate-300">Earn coins by completing various tasks including games, offers, and watching ads</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">3. Earn Rewards</h3>
                <p className="text-slate-300">Accumulate coins that can be converted to real money</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">4. Withdraw</h3>
                <p className="text-slate-300">Request withdrawals through approved payment methods</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Features</h2>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li><strong>Game-Based Tasks:</strong> Play scratch cards, spin wheels, puzzles, and quizzes to earn coins</li>
              <li><strong>Offerwall:</strong> Complete offers from trusted partners</li>
              <li><strong>Referral Program:</strong> Earn bonuses by inviting friends</li>
              <li><strong>Daily Bonuses:</strong> Claim daily rewards for consistent usage</li>
              <li><strong>Secure Withdrawals:</strong> Safe and reliable payment processing</li>
              <li><strong>Mobile App:</strong> Earn on the go with our Android app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Transparency and Trust</h2>
            <p className="text-slate-300 leading-relaxed">
              We are committed to transparency and user trust. Our platform:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Uses industry-standard security measures</li>
              <li>Complies with data protection regulations</li>
              <li>Provides clear terms and conditions</li>
              <li>Maintains transparent earning and withdrawal policies</li>
              <li>Implements fraud detection to protect all users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Ad Network Compliance</h2>
            <p className="text-slate-300 leading-relaxed">
              NepEarn is compliant with Google AdSense and AdMob policies. We:
            </p>
            <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
              <li>Display ads in compliance with Google's policies</li>
              <li>Provide clear disclosure about earnings and rewards</li>
              <li>Maintain transparent user terms and privacy policies</li>
              <li>Implement proper content guidelines</li>
              <li>Ensure user data is handled securely</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Have questions or need support? We're here to help!
            </p>
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300">
                <strong>Email:</strong> support@nepearn.com<br />
                <strong>Visit:</strong> <a href="/contact" className="text-emerald-400 hover:text-emerald-300">Contact Page</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


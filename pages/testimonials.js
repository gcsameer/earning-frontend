import Layout from "../components/Layout";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rajesh K.",
      username: "@rajesh123",
      earnings: "Rs 500",
      message: "I've been using NepEarn for 2 months and already withdrew Rs 500! The tasks are fun and easy to complete.",
      avatar: "👤",
      verified: true
    },
    {
      name: "Sita M.",
      username: "@sita_m",
      earnings: "Rs 1,200",
      message: "Best earning app! I love the scratch card and spin wheel games. Withdrawal process is smooth and fast.",
      avatar: "👤",
      verified: true
    },
    {
      name: "Amit S.",
      username: "@amit_sharma",
      earnings: "Rs 800",
      message: "Great way to earn extra income. The referral program is amazing - I've referred 10 friends and earned bonus coins!",
      avatar: "👤",
      verified: true
    },
    {
      name: "Priya D.",
      username: "@priya_d",
      earnings: "Rs 300",
      message: "Simple and user-friendly. I complete tasks during my free time and it adds up quickly. Highly recommend!",
      avatar: "👤",
      verified: true
    },
    {
      name: "Kiran T.",
      username: "@kiran_t",
      earnings: "Rs 1,500",
      message: "Earned over Rs 1,500 in just 3 months! The daily bonuses and challenges keep me motivated to log in every day.",
      avatar: "👤",
      verified: true
    },
    {
      name: "Nabin R.",
      username: "@nabin_r",
      earnings: "Rs 600",
      message: "Love the variety of tasks. Puzzles and quizzes are my favorite. Withdrawal to eSewa is super convenient!",
      avatar: "👤",
      verified: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">⭐</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Success Stories</h1>
          <p className="text-slate-400 text-sm">See what our users are saying about NepEarn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-5 rounded-xl border border-slate-800/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all card-hover"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <b className="text-white">{testimonial.name}</b>
                    {testimonial.verified && (
                      <span className="text-blue-400 text-xs">✓ Verified</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{testimonial.username}</p>
                  <p className="text-sm text-emerald-400 font-semibold mt-1">
                    Earned: {testimonial.earnings}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">"{testimonial.message}"</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
          <p className="text-emerald-400 text-sm mb-2">
            💬 <strong>Share Your Success Story!</strong>
          </p>
          <p className="text-slate-300 text-sm">
            Have you earned money with NepEarn? We'd love to feature your story! Contact us at{" "}
            <a href="mailto:support@nepearn.com" className="text-emerald-400 hover:text-emerald-300 underline">
              support@nepearn.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


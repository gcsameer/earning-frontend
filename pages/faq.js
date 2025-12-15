import Layout from "../components/Layout";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I start earning on NepEarn?",
          a: "Simply sign up for a free account, complete tasks, play games, and watch ads to earn coins. Coins can be converted to real money and withdrawn to your eSewa, Khalti, or bank account."
        },
        {
          q: "Is NepEarn free to use?",
          a: "Yes! NepEarn is completely free to use. There are no hidden fees or charges. You only earn money, never pay anything."
        },
        {
          q: "How do I verify my email?",
          a: "We verify your email address to ensure account security. Simply enter a valid email address during registration, and our system will verify it automatically."
        }
      ]
    },
    {
      category: "Earning Coins",
      questions: [
        {
          q: "How do I earn coins?",
          a: "You can earn coins by: 1) Completing tasks (games, puzzles, quizzes), 2) Watching rewarded ads, 3) Completing offers from our offerwall, 4) Referring friends, 5) Claiming daily login bonuses, and 6) Completing daily challenges."
        },
        {
          q: "How much can I earn per day?",
          a: "You can complete up to 3 tasks per day (excluding offerwall). Each task rewards different amounts: Scratch Card and Spin Wheel (25-100 coins), Puzzles and Quizzes (50 coins). Plus daily bonuses and challenges!"
        },
        {
          q: "What is the coin value?",
          a: "Each coin is worth Rs 0.1. So 100 coins = Rs 10, 1000 coins = Rs 100."
        },
        {
          q: "Do I get coins for clicking ads?",
          a: "No. You earn coins by completing tasks and watching rewarded ads (on mobile). Clicking regular ads does not earn coins, as per Google AdSense/AdMob policies."
        }
      ]
    },
    {
      category: "Tasks & Games",
      questions: [
        {
          q: "What types of tasks are available?",
          a: "We offer: Scratch Card (25-100 coins), Spin Wheel (25-100 coins), Math Puzzles (50 coins), Quick Quizzes (50 coins), and Offerwall tasks (various rewards)."
        },
        {
          q: "Can I complete the same task multiple times?",
          a: "You can complete each task once per day. The daily limit resets at midnight."
        },
        {
          q: "Why can't I start more tasks?",
          a: "You can complete up to 3 tasks per day (excluding offerwall). This limit resets daily. Offerwall tasks have no limit."
        }
      ]
    },
    {
      category: "Withdrawals",
      questions: [
        {
          q: "How do I withdraw my earnings?",
          a: "Go to the Withdraw page, enter the amount (minimum Rs 50), select your payment method (eSewa, Khalti, or Bank), enter your account details, and submit. Withdrawals are processed within 7-14 business days."
        },
        {
          q: "What is the minimum withdrawal amount?",
          a: "The minimum withdrawal amount is Rs 50."
        },
        {
          q: "How long does withdrawal take?",
          a: "Withdrawals are typically processed within 7-14 business days. You'll receive an email notification once processed."
        },
        {
          q: "What payment methods are supported?",
          a: "We support eSewa, Khalti, and Bank transfers. More payment methods may be added in the future."
        }
      ]
    },
    {
      category: "Referrals",
      questions: [
        {
          q: "How does the referral program work?",
          a: "Share your unique referral link with friends. When they sign up using your link, you both get bonus coins! You get 50 coins, and your friend gets 20 coins as a welcome bonus."
        },
        {
          q: "How many people can I refer?",
          a: "There's no limit! Refer as many friends as you want and earn bonus coins for each referral."
        },
        {
          q: "Where can I find my referral link?",
          a: "Your referral link is available on the Dashboard and Referrals page. You can copy it or share it directly via social media."
        }
      ]
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "How do I change my password?",
          a: "Currently, password changes must be done through support. Contact us at support@nepearn.com for assistance."
        },
        {
          q: "What if I forget my password?",
          a: "Contact our support team at support@nepearn.com, and we'll help you reset your password."
        },
        {
          q: "Is my data safe?",
          a: "Yes! We use industry-standard security measures to protect your data. Read our Privacy Policy for more details."
        }
      ]
    },
    {
      category: "Mobile App",
      questions: [
        {
          q: "Is there a mobile app?",
          a: "Yes! We have an Android app available for download. Visit the Dashboard to download the APK file."
        },
        {
          q: "Do I earn more on the mobile app?",
          a: "You can earn the same amount on both web and mobile. The mobile app offers a better experience with rewarded ads and push notifications."
        }
      ]
    },
    {
      category: "Troubleshooting",
      questions: [
        {
          q: "Tasks are not showing. What should I do?",
          a: "Try refreshing the page. If tasks still don't appear, contact support. Make sure you're logged in and your account is active."
        },
        {
          q: "I completed a task but didn't receive coins. What should I do?",
          a: "Contact our support team with your username and task details. We'll investigate and credit your account if there was an error."
        },
        {
          q: "Ads are not showing. Why?",
          a: "Ads may not show if: 1) You're using an ad blocker, 2) Your AdSense account is pending approval, 3) There are no ads available. Try disabling ad blockers and wait for AdSense approval."
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl mb-4 shadow-lg shadow-emerald-500/30">
            <span className="text-2xl">❓</span>
          </div>
          <h1 className="text-3xl font-bold mb-2 gradient-text">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-sm">Find answers to common questions about NepEarn</p>
        </div>

        <div className="space-y-6">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="space-y-3">
              <h2 className="text-xl font-semibold text-white mb-3">{category.category}</h2>
              {category.questions.map((faq, qIndex) => {
                const currentIndex = questionIndex++;
                const isOpen = openIndex === currentIndex;
                return (
                  <div
                    key={currentIndex}
                    className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-800/30"
                  >
                    <button
                      onClick={() => toggleQuestion(currentIndex)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="font-medium text-slate-200">{faq.q}</span>
                      <span className="text-slate-400 text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700/50">
                        <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 <strong>Still have questions?</strong> Contact our support team at{" "}
            <a href="mailto:support@nepearn.com" className="text-emerald-400 hover:text-emerald-300 underline">
              support@nepearn.com
            </a>{" "}
            or visit our{" "}
            <a href="/contact" className="text-emerald-400 hover:text-emerald-300 underline">
              Contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}


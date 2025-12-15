import { useState } from 'react';

export default function SocialShare({ 
  type = 'earnings', 
  coins = 0, 
  referralLink = '',
  username = '' 
}) {
  const [copied, setCopied] = useState(false);

  const shareText = {
    earnings: `🎉 I just earned ${coins} coins on NepEarn! Join me and start earning today! 💰`,
    referral: `💰 Earn money online with NepEarn! Use my referral code and we both get bonus coins! 🎁`,
    achievement: `🏆 I just unlocked a new achievement on NepEarn! Join me and start earning! 💰`
  };

  const text = shareText[type] || shareText.referral;
  const url = referralLink || (typeof window !== 'undefined' ? window.location.origin : '');

  const shareData = {
    title: 'NepEarn - Earn Money Online',
    text: text,
    url: url
  };

  const handleShare = async (platform) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        window.open(shareUrl, '_blank');
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        window.open(shareUrl, '_blank');
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        window.open(shareUrl, '_blank');
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        window.open(shareUrl, '_blank');
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(`${text} ${url}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        break;
      case 'native':
        if (navigator.share) {
          navigator.share(shareData).catch(() => {});
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleShare('whatsapp')}
          className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>💬</span>
          WhatsApp
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>📘</span>
          Facebook
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>🐦</span>
          Twitter
        </button>
        <button
          onClick={() => handleShare('telegram')}
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>✈️</span>
          Telegram
        </button>
        {navigator.share && (
          <button
            onClick={() => handleShare('native')}
            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span>📤</span>
            Share
          </button>
        )}
        <button
          onClick={() => handleShare('copy')}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>{copied ? '✓' : '📋'}</span>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}


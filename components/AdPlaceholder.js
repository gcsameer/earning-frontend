/**
 * Ad Placeholder Component
 * Shows a placeholder when ads are not configured
 * Replace with actual ad network integration
 */
export default function AdPlaceholder({ 
  size = 'medium',
  className = '',
  style = {}
}) {
  const sizes = {
    small: { width: '320px', height: '100px' },
    medium: { width: '728px', height: '90px' },
    large: { width: '970px', height: '250px' },
    responsive: { width: '100%', minHeight: '100px' }
  };

  const adSize = sizes[size] || sizes.responsive;

  return (
    <div 
      className={`bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg flex items-center justify-center ${className}`}
      style={{ 
        ...adSize, 
        ...style,
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      }}
    >
      <div className="text-center p-4">
        <div className="text-slate-400 text-sm mb-1">📢 Advertisement</div>
        <div className="text-slate-500 text-xs">
          {size === 'responsive' ? 'Responsive Ad' : `${adSize.width} × ${adSize.height}`}
        </div>
      </div>
    </div>
  );
}


/**
 * Smartlink Component
 * Direct URL that can be inserted anywhere using standard HTML hyperlink tags
 * URL: https://www.effectivegatecpm.com/wdf9i5u7j9?key=7e886e5b03d6e77314fd327592abb992
 */

export default function Smartlink({ children, className = '', style = {} }) {
  const smartlinkUrl = 'https://www.effectivegatecpm.com/wdf9i5u7j9?key=7e886e5b03d6e77314fd327592abb992';
  
  return (
    <a
      href={smartlinkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      {children || 'Click here'}
    </a>
  );
}


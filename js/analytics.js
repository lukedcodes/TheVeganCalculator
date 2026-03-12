(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-68570137-1', 'auto');
ga('send', 'pageview');

/**
 * Enhanced tracking for outbound links and interactions
 */
window.trackOutboundLink = function(url, category = 'outbound') {
  ga('send', 'event', category, 'click', url, {
    'transport': 'beacon',
    'hitCallback': function(){ document.location = url; }
  });
  return false;
};

// Auto-track outbound links
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.href) {
    const url = new URL(link.href, window.location.origin);
    const isExternal = url.hostname !== window.location.hostname;
    
    if (isExternal) {
      // Don't track if it already has an onclick tracker to avoid double-counting
      if (!link.getAttribute('onclick') || !link.getAttribute('onclick').includes('trackOutboundLink')) {
        ga('send', 'event', 'outbound', 'click', link.href, { 'transport': 'beacon' });
      }
    }
  }
}, true);

// Track specific interactions
document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      ga('send', 'event', 'interaction', 'calculate', 'Vegan Calculator');
    });
  }
  
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      ga('send', 'event', 'interaction', 'open_menu', window.location.pathname);
    });
  }
});

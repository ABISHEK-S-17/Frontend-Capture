// Import jQuery and make it available globally
import $ from 'jquery';

// Make jQuery available globally
window.$ = window.jQuery = $;

// Load plugins using dynamic script loading
// This ensures plugins load after jQuery is available
const loadPlugin = (path) => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (document.querySelector(`script[src*="${path}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = `/src/assets/js/plugins/${path}`;
    script.async = false;
    script.onload = resolve;
    script.onerror = () => {
      console.warn(`Failed to load plugin: ${path}`);
      resolve(); // Don't reject, just warn
    };
    document.head.appendChild(script);
  });
};

// Load plugins after a short delay to ensure DOM is ready
if (typeof window !== 'undefined' && document.readyState !== 'complete') {
  window.addEventListener('load', () => {
    loadPlugin('jquery-migrate-3.5.0.min.js');
    loadPlugin('owl.carousel.min.js');
    loadPlugin('jquery.easing.1.3.js');
    loadPlugin('jquery.isotope.v3.0.2.js');
    loadPlugin('jquery.magnific-popup.min.js');
  });
} else if (typeof window !== 'undefined') {
  // DOM already loaded
  loadPlugin('jquery-migrate-3.5.0.min.js');
  loadPlugin('owl.carousel.min.js');
  loadPlugin('jquery.easing.1.3.js');
  loadPlugin('jquery.isotope.v3.0.2.js');
  loadPlugin('jquery.magnific-popup.min.js');
}

// Export for use in components
export default $;


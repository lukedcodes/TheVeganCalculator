/**
 * Lightweight component loader for static HTML partials
 */
const ComponentLoader = {
  async load(element) {
    const componentPath = element.getAttribute('data-component');
    if (!componentPath) return;

    try {
      const response = await fetch(`components/${componentPath}`);
      if (!response.ok) throw new Error(`Failed to load ${componentPath}`);
      
      const html = await response.text();
      element.innerHTML = html;
      
      // Remove the attribute to prevent double loading
      element.removeAttribute('data-component');
      
      return true;
    } catch (error) {
      console.error(`ComponentLoader Error: ${error.message}`);
      return false;
    }
  },

  async loadAll() {
    const elements = document.querySelectorAll('[data-component]');
    const promises = Array.from(elements).map(el => this.load(el));
    await Promise.all(promises);
    
    // Dispatch event when all components are ready
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
  }
};

// Auto-run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  ComponentLoader.loadAll();
});

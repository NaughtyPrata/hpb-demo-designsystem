// HPB Design System - Main JavaScript

// Mobile Navigation Toggle
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      
      // Toggle hamburger icon
      const icon = mobileMenuBtn.querySelector('i');
      if (icon.classList.contains('lni-menu')) {
        icon.classList.remove('lni-menu');
        icon.classList.add('lni-close');
      } else {
        icon.classList.remove('lni-close');
        icon.classList.add('lni-menu');
      }
    });
  }
}

// Copy to Clipboard Functionality
function initCopyToClipboard() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn') || e.target.closest('.copy-btn')) {
      const btn = e.target.classList.contains('copy-btn') ? e.target : e.target.closest('.copy-btn');
      const text = btn.getAttribute('data-copy');
      
      navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="lni-checkmark"></i> Copied!';
        btn.classList.add('bg-green-500', 'text-white');
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-green-500', 'text-white');
        }, 2000);
      });
    }
  });
}

// Color Swatch Click to Copy
function initColorSwatches() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-swatch')) {
      const color = e.target.getAttribute('data-color');
      navigator.clipboard.writeText(color).then(() => {
        // Show tooltip
        showTooltip(e.target, 'Copied!');
      });
    }
  });
}

// Tooltip Function
function showTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm z-50';
  tooltip.textContent = text;
  tooltip.style.top = '-40px';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  
  element.style.position = 'relative';
  element.appendChild(tooltip);
  
  setTimeout(() => {
    tooltip.remove();
  }, 2000);
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
}

// Active Navigation Link
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Component State Demos
function initComponentDemos() {
  // Button state demos
  const demoButtons = document.querySelectorAll('.demo-button');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add click animation
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
    });
  });
  
  // Form demos
  const demoInputs = document.querySelectorAll('.demo-input');
  demoInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('ring-2', 'ring-blue-500');
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('ring-2', 'ring-blue-500');
    });
  });
}

// Responsive Design Showcase
function initResponsiveDemo() {
  const deviceButtons = document.querySelectorAll('.device-btn');
  const previewFrame = document.getElementById('responsive-preview');
  
  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      deviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update preview frame
      const device = btn.getAttribute('data-device');
      updatePreviewFrame(previewFrame, device);
    });
  });
}

function updatePreviewFrame(frame, device) {
  if (!frame) return;
  
  frame.className = 'transition-all duration-300 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto';
  
  switch (device) {
    case 'mobile':
      frame.classList.add('w-80', 'h-96');
      break;
    case 'tablet':
      frame.classList.add('w-96', 'h-80');
      break;
    case 'desktop':
      frame.classList.add('w-full', 'h-96');
      break;
  }
}

// Code Syntax Highlighting (Simple)
function initCodeHighlighting() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    // Simple syntax highlighting for HTML/CSS
    let html = block.innerHTML;
    
    // HTML tags
    html = html.replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span class="text-blue-400">$1</span>');
    
    // Attributes
    html = html.replace(/(\w+)=/g, '<span class="text-green-400">$1</span>=');
    
    // Strings
    html = html.replace(/"([^"]*)"/g, '"<span class="text-yellow-400">$1</span>"');
    
    // CSS properties
    html = html.replace(/([a-z-]+):/g, '<span class="text-purple-400">$1</span>:');
    
    block.innerHTML = html;
  });
}

// Animation on Scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // Observe all cards and components
  document.querySelectorAll('.card, .component-preview').forEach(el => {
    observer.observe(el);
  });
}

// Design Token Generator
function generateDesignTokens() {
  const tokens = {
    colors: {
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d'
      },
      secondary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      }
    },
    typography: {
      fontFamily: {
        primary: 'Inter, sans-serif',
        mono: 'JetBrains Mono, monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    }
  };
  
  return tokens;
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCopyToClipboard();
  initColorSwatches();
  initSmoothScrolling();
  updateActiveNavLink();
  initComponentDemos();
  initResponsiveDemo();
  initCodeHighlighting();
  initScrollAnimations();
});

// Export for use in other files
window.HPBDesignSystem = {
  generateDesignTokens,
  showTooltip,
  updatePreviewFrame
};
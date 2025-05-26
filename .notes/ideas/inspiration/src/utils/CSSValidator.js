/**
 * CSS Diagnostic Tool for KanSearch
 * Version: 1.0.3
 * 
 * This script helps identify CSS loading and styling issues in the KanSearch website.
 * It performs the following checks:
 * 1. Verifies if CSS files are loaded
 * 2. Confirms CSS custom properties are accessible
 * 3. Checks if cascade layers are working correctly
 * 4. Tests animation rendering
 * 5. Validates responsive behavior
 * 
 * Usage: Include in the page and check console output
 */

class CSSValidator {
  constructor() {
    this.issues = [];
  }

  runDiagnostics() {
    console.log('📊 Running CSS Diagnostics...');
    
    this.checkCSSFiles();
    this.validateCSSProperties();
    this.validateCascadeLayers();
    this.checkAnimations();
    this.checkResponsiveness();
    
    this.reportResults();
  }

  checkCSSFiles() {
    // Check if stylesheets loaded
    const loadedSheets = Array.from(document.styleSheets).map(sheet => {
      try {
        return sheet.href || 'inline styles';
      } catch (e) {
        return 'cross-origin stylesheet';
      }
    });
    
    console.log('✓ Loaded stylesheets:', loadedSheets);
    
    // Check for expected CSS files
    const expectedFiles = [
      'utilities.css', 'style.css', 'animations.css', 
      'header.css', 'hero.css', 'responsive.css', 'overrides.css'
    ];
    
    const missingFiles = expectedFiles.filter(file => 
      !loadedSheets.some(sheet => sheet && sheet.includes(file))
    );
    
    if (missingFiles.length > 0) {
      this.issues.push(`Missing CSS files: ${missingFiles.join(', ')}`);
    }
  }

  validateCSSProperties() {
    console.log('🔍 Checking CSS Custom Properties...');
    
    const testElement = document.createElement('div');
    document.body.appendChild(testElement);
    
    // Test critical CSS custom properties
    const propertiesToTest = [
      '--primary-bg', '--accent', '--btn-primary', 
      '--border-radius-md', '--space-md'
    ];
    
    const missingProperties = propertiesToTest.filter(prop => {
      const value = getComputedStyle(testElement).getPropertyValue(prop).trim();
      return value === '';
    });
    
    document.body.removeChild(testElement);
    
    if (missingProperties.length > 0) {
      this.issues.push(`Missing CSS custom properties: ${missingProperties.join(', ')}`);
    } else {
      console.log('✓ All CSS custom properties are defined');
    }
  }

  validateCascadeLayers() {
    console.log('🔍 Checking CSS Cascade Layers...');
    
    // This is a simple test - a more comprehensive test would need to check
    // specific elements and their computed styles
    
    // Check if a basic override works - create an element with specificity battle
    const testElement = document.createElement('div');
    testElement.id = 'layer-test';
    testElement.classList.add('layer-test');
    testElement.style.cssText = "position: absolute; top: -9999px; left: -9999px;";
    document.body.appendChild(testElement);
    
    // Check that body has expected styles
    const bodyStyles = getComputedStyle(document.body);
    const bodyBg = bodyStyles.backgroundColor;
    const fontFamily = bodyStyles.fontFamily;
    
    if (bodyBg !== 'rgb(18, 18, 18)' && bodyBg !== '#121212') {
      this.issues.push(`Body background color is unexpected: ${bodyBg}`);
    }
    
    document.body.removeChild(testElement);
  }

  checkAnimations() {
    console.log('🔍 Testing Animation Definitions...');
    
    const testElement = document.createElement('div');
    testElement.id = 'animation-test';
    testElement.style.cssText = "position: absolute; top: -9999px; left: -9999px; animation: fadeIn 0.5s;";
    document.body.appendChild(testElement);
    
    const computedStyle = getComputedStyle(testElement);
    const hasAnimation = computedStyle.animationName !== 'none';
    
    document.body.removeChild(testElement);
    
    if (!hasAnimation) {
      this.issues.push('Animation definitions may not be loading correctly');
    } else {
      console.log('✓ Animation definitions are working');
    }
  }

  checkResponsiveness() {
    console.log('🔍 Checking Responsive Styles...');
    
    // This is a simplified check, a real check would need to resize the viewport
    // Look for media query related styles
    const mediaQueryStyles = Array.from(document.styleSheets).some(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.constructor.name === 'CSSMediaRule'
        );
      } catch (e) {
        // Cross-origin stylesheet can't be read
        return false;
      }
    });
    
    if (!mediaQueryStyles) {
      this.issues.push('No media queries detected - responsive styles may not be loading');
    } else {
      console.log('✓ Media query styles detected');
    }
  }

  reportResults() {
    console.log('📋 CSS Diagnostic Results:');
    
    if (this.issues.length === 0) {
      console.log('%c✅ No CSS issues found! All styles appear to be working correctly.', 'color: green; font-weight: bold;');
    } else {
      console.log('%c❌ CSS issues detected:', 'color: red; font-weight: bold;');
      this.issues.forEach((issue, i) => {
        console.log(`${i+1}. ${issue}`);
      });
      console.log('\nRecommendation: Check the CSS file loading order and cascade layer structure.');
    }
  }
}

// Run diagnostics after page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new CSSValidator().runDiagnostics();
  }, 500); // Wait for CSS to fully apply
});

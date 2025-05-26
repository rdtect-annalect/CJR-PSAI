/**
 * @file MatrixOverlay.js
 * @description Matrix-style coding GIFs overlay for sections
 */

import BaseComponent from '../base/BaseComponent.js';
import { animate, presets } from '../../utils/anime.js';

export default class MatrixOverlay extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      sections: ['.about', '.why-psai', '#what-cjr'], // Target sections
      opacity: 0.06,      // Subtle overlay opacity
      ...config
    };
  }

  async init() {
    try {
      this.targetSections = document.querySelectorAll(this.config.sections.join(', '));
      
      if (this.targetSections.length === 0) {
        console.log('[MatrixOverlay] No target sections found');
        return this;
      }

      console.log(`[MatrixOverlay] Adding matrix effects to ${this.targetSections.length} sections`);
      this.createMatrixOverlays();
      
      return this;
    } catch (error) {
      console.error('Failed to initialize MatrixOverlay:', error);
      return this;
    }
  }

  createMatrixOverlays() {
    this.targetSections.forEach((section, index) => {
      // Create matrix overlay container
      const overlay = document.createElement('div');
      overlay.className = 'matrix-overlay';
      overlay.innerHTML = this.createMatrixPattern(index);
      
      // Style the overlay
      Object.assign(overlay.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        pointerEvents: 'none',
        zIndex: '1',
        overflow: 'hidden',
        opacity: '0'
      });

      // Ensure section has relative positioning
      if (window.getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
      }

      // Add overlay to section
      section.appendChild(overlay);
      
      // Set up scroll animation
      this.setupScrollAnimation(overlay, section);
    });
  }

  createMatrixPattern(sectionIndex) {
    // Create different patterns for different sections
    const patterns = [
      this.createBinaryStream(),     // About section
      this.createCodeLines(),        // Why PSAi section  
      this.createDigitalRain()       // What is CJR section
    ];
    
    return patterns[sectionIndex % patterns.length];
  }

  createBinaryStream() {
    const binary = '01010110100101001110010111001010';
    return `
      <div class="matrix-pattern binary-stream">
        <div class="binary-line">${binary.repeat(4)}</div>
        <div class="binary-line delay-1">${binary.split('').reverse().join('').repeat(3)}</div>
        <div class="binary-line delay-2">${binary.repeat(3)}</div>
      </div>
    `;
  }

  createCodeLines() {
    const codeSnippets = [
      'if (ai_detected) { return false; }',
      'function spotAI() { /* analyze */ }',
      'const truth = verifyImage(src);',
      '// AI detection algorithm',
      'while (analyzing) { process(); }'
    ];
    
    return `
      <div class="matrix-pattern code-lines">
        ${codeSnippets.map((line, i) => 
          `<div class="code-line delay-${i}">${line}</div>`
        ).join('')}
      </div>
    `;
  }

  createDigitalRain() {
    const chars = '｡ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01';
    const columns = 15;
    let rain = '';
    
    for (let i = 0; i < columns; i++) {
      const columnChars = Array.from({length: 20}, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('<br>');
      
      rain += `<div class="rain-column delay-${i % 5}">${columnChars}</div>`;
    }
    
    return `<div class="matrix-pattern digital-rain">${rain}</div>`;
  }

  setupScrollAnimation(overlay, section) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Fade in matrix overlay
          animate(overlay, {
            opacity: { to: this.config.opacity, from: 0 },
            duration: 1500,
            ease: 'outQuart'
          });
          
          // Animate pattern elements
          const elements = overlay.querySelectorAll('.binary-line, .code-line, .rain-column');
          elements.forEach((el, index) => {
            animate(el, {
              ...presets.fadeIn,
              delay: index * 200
            });
          });
          
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(section);
  }

  destroy() {
    // Remove all matrix overlays
    document.querySelectorAll('.matrix-overlay').forEach(overlay => {
      overlay.remove();
    });
    
    super.destroy();
  }
}

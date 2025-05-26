/**
 * @file dom.js
 * @description Essential DOM utilities
 */

export const $ = (selector, all = false) => 
  all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);

export const create = (tag, attrs = {}) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'text') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else if (key === 'class') el.className = value;
    else if (key === 'style') Object.assign(el.style, value);
    else el.setAttribute(key, value);
  });
  return el;
};

export const observe = (elements, callback, options = {}) => {
  const observer = new IntersectionObserver(callback, options);
  [].concat(elements).forEach(el => el && observer.observe(el));
  return observer;
};

export default { $, create, observe };

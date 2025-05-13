import { d as attr, e as ensure_array_like, f as escape_html, c as pop, p as push, h as head } from "../../chunks/index.js";
import { G as GridOverlay, D as DigitalAccents, C as CornerSquares, a as DigitalElements } from "../../chunks/DigitalAccents.js";
function NavBar($$payload) {
  $$payload.out += `<nav class="fixed w-full z-50 bg-black/20" aria-label="Main navigation"><div class="container mx-auto px-4 py-3 flex justify-between items-center"><a href="#hero" class="flex-shrink-0"><img src="/images/CJR-Logo.svg" alt="Logo" class="h-10 w-auto"></a> <ul class="hidden md:flex items-center space-x-8 font-paplane text-secondary text-sm"><li><a id="scrollButton2" href="#about" class="hover:text-orange">ABOUT</a></li> <li><a id="scrollButton3" href="#musicVideo" class="hover:text-orange">MUSIC VIDEO</a></li> <li><a id="scrollButton4" href="#why" class="hover:text-orange">WHY THE PSAI</a></li> <li><a id="scrollButton5" href="#spotAI" class="hover:text-orange">SPOT AI</a></li> <li><a id="scrollButton6" href="#whoCJR" class="hover:text-orange">WHO IS CJR</a></li></ul> <button class="block md:hidden text-white focus:outline-none focus:ring-2 focus:ring-orange" aria-label="Toggle navigation"${attr("aria-expanded", "false")} aria-controls="mobile-menu"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></nav>`;
}
function Footer($$payload, $$props) {
  push();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const navLinks = [
    { href: "#about", text: "About" },
    { href: "#music-video", text: "Music Video" },
    {
      href: "#furtherReading",
      text: "Further Reading"
    },
    { href: "#why_psai", text: "Why the PSAI" },
    { href: "#spotAI", text: "Spot AI" },
    { href: "#whoCJR", text: "Who is CJR" }
  ];
  const each_array = ensure_array_like(navLinks);
  $$payload.out += `<footer class="bg-black text-white py-16 md:py-24 font-paplane relative overflow-hidden border-t-2 border-orange-500 svelte-1d2ogmg">`;
  GridOverlay($$payload, {
    color: "rgba(255,255,255,0.04)",
    size: "32px",
    class: "absolute inset-0 pointer-events-none z-0"
  });
  $$payload.out += `<!----> `;
  DigitalAccents($$payload, {
    variant: "scattered",
    color: "var(--color-accent, #FF4F2A)",
    class: "absolute inset-0 pointer-events-none z-10 opacity-20"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 12,
    offset: 0,
    class: "absolute -top-4 -left-4 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 12,
    offset: 0,
    class: "absolute -top-4 -right-4 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 12,
    offset: 0,
    class: "absolute -bottom-4 -left-4 z-10"
  });
  $$payload.out += `<!----> `;
  CornerSquares($$payload, {
    color: "var(--color-accent, #FF4F2A)",
    size: 12,
    offset: 0,
    class: "absolute -bottom-4 -right-4 z-10"
  });
  $$payload.out += `<!----> <div class="absolute top-10 left-10 w-3 h-3 opacity-60 cross-element svelte-1d2ogmg"><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1d2ogmg"><path d="M4.28737 0L2.85825 1.42833L1.42912 0L0 1.42833L1.42912 2.85666L0 4.29118L1.42912 5.71951L2.85825 4.29118L4.28737 5.71951L5.71649 4.29118L4.28737 2.85666L5.71649 1.42833L4.28737 0Z" fill="#FFF9EB" class="svelte-1d2ogmg"></path></svg></div> <div class="absolute bottom-10 right-10 w-3 h-3 opacity-60 cross-element svelte-1d2ogmg"><svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-1d2ogmg"><path d="M4.28737 0L2.85825 1.42833L1.42912 0L0 1.42833L1.42912 2.85666L0 4.29118L1.42912 5.71951L2.85825 4.29118L4.28737 5.71951L5.71649 4.29118L4.28737 2.85666L5.71649 1.42833L4.28737 0Z" fill="#FFF9EB" class="svelte-1d2ogmg"></path></svg></div> <div class="container mx-auto px-4 relative z-10 svelte-1d2ogmg"><div class="footer-wrapper flex flex-col items-center svelte-1d2ogmg"><div class="footer-logo mb-12 svelte-1d2ogmg"><img src="/images/CJR-Logo.svg" alt="Columbia Journalism Review" class="h-16 md:h-20 drop-shadow-lg svelte-1d2ogmg"></div> <div class="mb-12 w-full max-w-2xl svelte-1d2ogmg"><ul class="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-6 gap-x-4 md:gap-x-10 font-paplane text-base tracking-[0.18em] svelte-1d2ogmg"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$payload.out += `<li class="text-center md:text-left svelte-1d2ogmg"><a${attr("href", link.href)} class="text-white hover:text-orange-400 px-2 py-1 underline-offset-4 hover:underline focus:underline focus:text-orange-400 focus:shadow-[0_0_8px_2px_var(--color-accent)] transition duration-300 border-b border-transparent hover:border-orange-400 svelte-1d2ogmg">${escape_html(link.text)}</a></li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div class="border-t border-white/10 pt-6 mt-4 w-full max-w-md svelte-1d2ogmg"><div class="text-center text-sm opacity-70 font-paplane tracking-widest flex flex-col items-center svelte-1d2ogmg"><p class="mb-3 svelte-1d2ogmg">© ${escape_html(currentYear)} Columbia Journalism Review</p> <div class="mt-6 flex gap-5 items-center justify-center svelte-1d2ogmg"><div class="w-2 h-2 rotate-45 bg-orange-500 border border-orange-400 shadow-[0_0_8px_2px_var(--color-accent)] svelte-1d2ogmg"></div> `;
  DigitalElements($$payload, {
    type: "dot",
    color: "#FF4F2A",
    size: 4,
    className: "opacity-80"
  });
  $$payload.out += `<!----> <div class="w-2 h-2 rotate-45 bg-orange-500 border border-orange-400 shadow-[0_0_8px_2px_var(--color-accent)] svelte-1d2ogmg"></div></div></div></div></div></div></footer>`;
  pop();
}
function _layout($$payload, $$props) {
  let { children } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>CJR PSAI</title>`;
    $$payload2.out += `<link rel="icon" href="/favicon.png"> <meta name="description" content="The PSAi - A campaign that uses viral AI images to teach people how to spot AI images">`;
  });
  NavBar($$payload);
  $$payload.out += `<!----> <main class="flex-grow">`;
  children($$payload);
  $$payload.out += `<!----></main> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};

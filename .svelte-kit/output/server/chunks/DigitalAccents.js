import { d as attr, i as attr_class, j as attr_style, k as stringify } from "./index.js";
function DigitalElements($$payload, $$props) {
  let {
    type = "arrow",
    pos = "",
    color = "",
    size = 0,
    rotate = 0,
    className = ""
  } = $$props;
  const defaultColors = {
    arrow: "#FFF9EB",
    dot: "#FFF9EB",
    corner: "var(--color-primary)",
    cornerSquare: "var(--color-secondary)"
  };
  const elementColor = color || defaultColors[type];
  const defaultSizes = {
    arrow: { width: 6, height: 7 },
    dot: { width: 6, height: 6 },
    corner: { width: size || 20, height: size || 20 }
  };
  if (type === "arrow") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${attr("width", defaultSizes.arrow.width)}${attr("height", defaultSizes.arrow.height)} viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg"${attr_class(`absolute ${pos} animate-arrow-micro transition-opacity duration-150 ${className}`, "svelte-167qr1o")} aria-hidden="true"><path d="M0.830078 7V0L5.17351 3.5L0.830078 7Z"${attr("fill", elementColor)} class="svelte-167qr1o"></path></svg>`;
  } else if (type === "dot") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<svg${attr("width", defaultSizes.dot.width)}${attr("height", defaultSizes.dot.height)} viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"${attr_class(`absolute ${pos} animate-dot-micro ${className}`, "svelte-167qr1o")} aria-hidden="true"><rect width="6" height="6" rx="1"${attr("fill", elementColor)} class="svelte-167qr1o"></rect></svg>`;
  } else if (type === "corner") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<svg${attr("width", defaultSizes.corner.width)}${attr("height", defaultSizes.corner.height)} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"${attr_class(`absolute ${pos} ${className}`, "svelte-167qr1o")}${attr_style(`transform: rotate(${rotate}deg);`)} aria-hidden="true"><path d="M6.7972 1.21288L1.21357 6.79341C0.440165 7.56638 0 8.62215 0 9.71563V24H5.69683C6.96697 24 8.00446 22.9694 8.00446 21.6936V7.99999H21.7057C22.9759 7.99999 24.0134 6.96937 24.0134 5.69364V0H9.72106C8.62697 0 7.57061 0.433617 6.7972 1.21288Z"${attr("fill", elementColor)} class="svelte-167qr1o"></path></svg>`;
  } else if (type === "cornerSquare") {
    $$payload.out += "<!--[3-->";
    $$payload.out += `<div${attr_class(`absolute ${pos} w-2 h-2 ${className}`, "svelte-167qr1o")}${attr_style(`background-color: ${elementColor}; width: ${size || 8}px; height: ${size || 8}px; transform: rotate(${rotate}deg);`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function CornerSquares($$payload, $$props) {
  let {
    color = "var(--color-secondary)",
    size = 8,
    offset = 1,
    class: className = ""
  } = $$props;
  $$payload.out += `<div${attr_class(`pointer-events-none w-full h-full relative ${className}`)}>`;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: `-top-${offset} -left-${offset}`,
    color,
    size
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: `-top-${offset} -right-${offset}`,
    color,
    size
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: `-bottom-${offset} -left-${offset}`,
    color,
    size
  });
  $$payload.out += `<!----> `;
  DigitalElements($$payload, {
    type: "cornerSquare",
    pos: `-bottom-${offset} -right-${offset}`,
    color,
    size
  });
  $$payload.out += `<!----></div>`;
}
function GridOverlay($$payload, $$props) {
  let {
    color = "rgba(255,255,255,0.1)",
    size = "40px",
    class: additionalClass = ""
  } = $$props;
  $$payload.out += `<div${attr_class(`absolute inset-0 w-full h-full pointer-events-none z-0 ${additionalClass}`)}${attr_style(`background-image: linear-gradient(to right, ${stringify(color)} 1px, transparent 1px), linear-gradient(to bottom, ${stringify(color)} 1px, transparent 1px); background-size: ${stringify(size)} ${stringify(size)};`)} aria-hidden="true"></div>`;
}
function DigitalAccents($$payload, $$props) {
  let {
    variant = "default",
    color = "var(--color-secondary)",
    class: className = ""
  } = $$props;
  $$payload.out += `<div${attr_class(`digital-accents relative w-full h-full pointer-events-none ${className}`)}>`;
  if (variant === "default" || variant === "scattered") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<img src="/images/desktop/gif/white/CJR_CODE_01.gif" alt="Digital Accent" class="absolute top-[15%] left-[5%] max-w-[350px] w-[150px]" draggable="false"> <img src="/images/desktop/gif/white/CJR_CODE_02.gif" alt="Digital Accent" class="absolute bottom-[10%] right-[5%] max-w-[250px] w-[200px]" draggable="false">`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (variant === "minimal") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute top-[10%] left-[8%] w-[80px] h-[40px] border-l-2 border-t-2"${attr_style(`border-color: ${stringify(color)};`)}></div> <div class="absolute bottom-[10%] right-[8%] w-[80px] h-[40px] border-r-2 border-b-2"${attr_style(`border-color: ${stringify(color)};`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (variant === "scattered") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="absolute top-[30%] left-[20%] w-2 h-2"${attr_style(`background-color: ${stringify(color)};`)}></div> <div class="absolute top-[60%] right-[25%] w-2 h-2"${attr_style(`background-color: ${stringify(color)};`)}></div> <div class="absolute bottom-[40%] left-[15%] w-2 h-2"${attr_style(`background-color: ${stringify(color)};`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
}
export {
  CornerSquares as C,
  DigitalAccents as D,
  GridOverlay as G,
  DigitalElements as a
};

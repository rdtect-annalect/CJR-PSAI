import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.D9ET1rxx.js","_app/immutable/chunks/WolX80Zp.js","_app/immutable/chunks/CzCQ0Hk2.js","_app/immutable/chunks/DCZJdv3m.js","_app/immutable/chunks/1AhUN7SB.js","_app/immutable/chunks/DX5odDvV.js","_app/immutable/chunks/DUHq_hNQ.js"];
export const stylesheets = ["_app/immutable/assets/DigitalAccents.D2gJXeSG.css","_app/immutable/assets/0.ZqXkamj0.css"];
export const fonts = [];

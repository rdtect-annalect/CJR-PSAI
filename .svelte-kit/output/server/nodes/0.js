import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.C9sbwk8z.js","_app/immutable/chunks/Q_tzgj-k.js","_app/immutable/chunks/BtBM_aYz.js","_app/immutable/chunks/CMhfYMan.js","_app/immutable/chunks/C2wfwaIB.js","_app/immutable/chunks/CcDSezLj.js"];
export const stylesheets = ["_app/immutable/assets/DigitalAccents.D2gJXeSG.css","_app/immutable/assets/0.CLi2YwNR.css"];
export const fonts = [];

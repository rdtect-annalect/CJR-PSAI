export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","fonts/TT_Paplane_Trial_Regular.ttf","images/.DS_Store","images/CJR-Logo.png","images/CJR-Logo.svg","images/desktop/.DS_Store","images/desktop/ABOUT CJR.jpg","images/desktop/FIGHTHING WITH AI.jpg","images/desktop/FOOTER.png","images/desktop/HEADER.jpg","images/desktop/HOW TO SPOT AI.jpg","images/desktop/VIDEO SECTION.jpg","images/desktop/WHY THIS MATTERS.jpg","images/desktop/gif/.DS_Store","images/desktop/gif/CJR_HIGHLIGHT_FEATURE.gif","images/desktop/gif/CJR_MACRON_MOVING.gif","images/desktop/gif/CJR_ThePsAI.gif","images/desktop/gif/orange/CJR_CODE_01.gif","images/desktop/gif/orange/CJR_CODE_02.gif","images/desktop/gif/orange/CJR_CODE_03.gif","images/desktop/gif/orange/CJR_CODE_04.gif","images/desktop/gif/white/CJR_CODE_01.gif","images/desktop/gif/white/CJR_CODE_02.gif","images/desktop/gif/white/CJR_CODE_03.gif","images/desktop/gif/white/CJR_CODE_04.gif","images/desktop/video-thumbnail.png","images/fightingwithAI/ICON_04.png","images/fightingwithAI/ICON_04.svg","images/fightingwithAI/batch1/1-mobile.jpg","images/fightingwithAI/batch1/Giant.jpg","images/fightingwithAI/batch1/Kid.jpg","images/fightingwithAI/batch1/McDonalds.jpg","images/fightingwithAI/batch1/Pikachu.jpg","images/fightingwithAI/batch1/Shrimp-Jesus.jpg","images/fightingwithAI/batch1/Swifties.jpg","images/fightingwithAI/batch1/baby.jpg","images/fightingwithAI/batch1/girl_cry.jpg","images/fightingwithAI/batch2/Elizabeth.jpg","images/fightingwithAI/batch2/Julian.jpg","images/fightingwithAI/batch2/Katy.jpg","images/fightingwithAI/batch2/Party.jpg","images/fightingwithAI/batch2/Pope.jpg","images/fightingwithAI/batch2/Tyson.jpg","images/fightingwithAI/batch2/Warren.jpg","images/fightingwithAI/batch2/WillSmith.jpg","images/fightingwithAI/batch2/Zuckerberg.jpg","images/fightingwithAI/batch2/mrBean.jpg","images/fightingwithAI/batch3/Armed.jpg","images/fightingwithAI/batch3/Bolsonaro.jpg","images/fightingwithAI/batch3/Earthquake.jpg","images/fightingwithAI/batch3/Flood.jpg","images/fightingwithAI/batch3/Hurricane.jpg","images/fightingwithAI/batch3/Israeli.jpg","images/fightingwithAI/batch3/Pentagon.jpg","images/fightingwithAI/batch3/Rescuing.jpg","images/fightingwithAI/batch3/Turkish.jpg","images/fightingwithAI/batch3/Ukranian.jpg","images/fightingwithAI/batch4/Cryingwoman.jpg","images/fightingwithAI/batch4/Luxor.jpg","images/fightingwithAI/batch4/Mysterious.jpg","images/fightingwithAI/batch4/Pizza.jpg","images/fightingwithAI/batch4/david.jpg","images/fightingwithAI/batch4/oldwomen.jpg","images/fpo-logo.png","images/mobile/.DS_Store","images/mobile/ABOUT CJR.jpg","images/mobile/FIGHTHING WITH AI.jpg","images/mobile/FOOTER.png","images/mobile/HEADER-mobile.jpg","images/mobile/HOW TO SPOT AI.jpg","images/mobile/QUIZ.jpg","images/mobile/VIDEO SECTION.jpg","images/mobile/WHY THIS MATTERS.jpg","images/spot-ai/large/1.jpg","images/spot-ai/large/1.png","images/spot-ai/large/10.jpg","images/spot-ai/large/10.png","images/spot-ai/large/2.jpg","images/spot-ai/large/2.png","images/spot-ai/large/3.jpg","images/spot-ai/large/3.png","images/spot-ai/large/4.jpg","images/spot-ai/large/4.png","images/spot-ai/large/5.jpg","images/spot-ai/large/5.png","images/spot-ai/large/6.jpg","images/spot-ai/large/6.png","images/spot-ai/large/7.jpg","images/spot-ai/large/7.png","images/spot-ai/large/8.jpg","images/spot-ai/large/8.png","images/spot-ai/large/9.jpg","images/spot-ai/large/9.png","images/spot-ai/small/1.png","images/spot-ai/small/10.png","images/spot-ai/small/2.png","images/spot-ai/small/3.png","images/spot-ai/small/4.png","images/spot-ai/small/5.png","images/spot-ai/small/6.png","images/spot-ai/small/7.png","images/spot-ai/small/8.png","images/spot-ai/small/9.png","images/video/.DS_Store","video/CJR_GIRL_MOVING.gif","video/CJR_MACRON_MOVING.webm"]),
	mimeTypes: {".png":"image/png",".ttf":"font/ttf",".svg":"image/svg+xml",".jpg":"image/jpeg",".gif":"image/gif",".webm":"video/webm"},
	_: {
		client: {start:"_app/immutable/entry/start.DcGAD3R2.js",app:"_app/immutable/entry/app.BiD3YK0E.js",imports:["_app/immutable/entry/start.DcGAD3R2.js","_app/immutable/chunks/Bii2w7Qf.js","_app/immutable/chunks/BtBM_aYz.js","_app/immutable/entry/app.BiD3YK0E.js","_app/immutable/chunks/BtBM_aYz.js","_app/immutable/chunks/Q_tzgj-k.js","_app/immutable/chunks/C2wfwaIB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

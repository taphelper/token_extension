const hamsterlog = (async () => {
    if (window.location.href.includes("hamsterkombat.io")) {
        if (localStorage.authToken == undefined) {
            var initdata = window.location.href.split("#tgWebAppData=")[1].split("&tgWebAppVersion=")[0];
            var resp = await fetch("https://api.hamsterkombat.io/auth/auth-by-telegram-webapp", {
                "headers": {
                    "accept": "application/json",
                    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                    "authorization": "authToken is empty, store token null",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Android WebView\";v=\"126\"",
                    "sec-ch-ua-mobile": "?1",
                    "sec-ch-ua-platform": "\"Android\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "x-requested-with": "org.telegram.messenger"
                },
                "referrer": "https://hamsterkombat.io/",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "{\"initDataRaw\":\"" + initdata + "\",\"fingerprint\":{\"version\":\"4.2.1\",\"visitorId\":\"a243d7455d233073ce2d0d1be1e12754\",\"components\":{\"fonts\":{\"value\":[\"sans-serif-thin\"],\"duration\":107},\"domBlockers\":{\"value\":[],\"duration\":68},\"fontPreferences\":{\"value\":{\"default\":145.90625,\"apple\":145.90625,\"serif\":164.71875,\"sans\":145.90625,\"mono\":132.625,\"min\":72.953125,\"system\":145.90625},\"duration\":21},\"audio\":{\"value\":0.00007444995,\"duration\":59},\"screenFrame\":{\"value\":[0,0,0,0],\"duration\":2},\"canvas\":null,\"osCpu\":{\"duration\":1},\"languages\":{\"value\":[[\"ru-RU\"]],\"duration\":0},\"colorDepth\":{\"value\":24,\"duration\":0},\"deviceMemory\":{\"value\":8,\"duration\":0},\"screenResolution\":{\"value\":[854,384],\"duration\":1},\"hardwareConcurrency\":{\"value\":8,\"duration\":0},\"timezone\":{\"value\":\"Europe/Moscow\",\"duration\":6},\"sessionStorage\":{\"value\":true,\"duration\":1},\"localStorage\":{\"value\":true,\"duration\":0},\"indexedDB\":{\"value\":true,\"duration\":4},\"openDatabase\":{\"value\":true,\"duration\":0},\"cpuClass\":{\"duration\":0},\"platform\":{\"value\":\"Linux aarch64\",\"duration\":0},\"plugins\":{\"value\":[],\"duration\":3},\"touchSupport\":{\"value\":{\"maxTouchPoints\":5,\"touchEvent\":true,\"touchStart\":true},\"duration\":1},\"vendor\":{\"value\":\"Google Inc.\",\"duration\":0},\"vendorFlavors\":{\"value\":[],\"duration\":1},\"cookiesEnabled\":{\"value\":true,\"duration\":10},\"colorGamut\":{\"value\":\"srgb\",\"duration\":0},\"invertedColors\":{\"duration\":1},\"forcedColors\":{\"value\":false,\"duration\":1},\"monochrome\":{\"value\":0,\"duration\":1},\"contrast\":{\"value\":0,\"duration\":1},\"reducedMotion\":{\"value\":false,\"duration\":0},\"reducedTransparency\":{\"value\":false,\"duration\":0},\"hdr\":{\"value\":false,\"duration\":0},\"math\":{\"value\":{\"acos\":1.4473588658278522,\"acosh\":709.889355822726,\"acoshPf\":355.291251501643,\"asin\":0.12343746096704435,\"asinh\":0.881373587019543,\"asinhPf\":0.8813735870195429,\"atanh\":0.5493061443340548,\"atanhPf\":0.5493061443340548,\"atan\":0.4636476090008061,\"sin\":0.8178819121159085,\"sinh\":1.1752011936438014,\"sinhPf\":2.534342107873324,\"cos\":-0.8390715290095377,\"cosh\":1.5430806348152437,\"coshPf\":1.5430806348152437,\"tan\":-1.4214488238747245,\"tanh\":0.7615941559557649,\"tanhPf\":0.7615941559557649,\"exp\":2.718281828459045,\"expm1\":1.718281828459045,\"expm1Pf\":1.718281828459045,\"log1p\":2.3978952727983707,\"log1pPf\":2.3978952727983707,\"powPI\":1.9275814160560204e-50},\"duration\":1},\"pdfViewerEnabled\":{\"value\":false,\"duration\":0},\"architecture\":{\"value\":127,\"duration\":0},\"applePay\":{\"value\":-1,\"duration\":0},\"privateClickMeasurement\":{\"duration\":0},\"webGlBasics\":{\"value\":{\"version\":\"WebGL 1.0 (OpenGL ES 2.0 Chromium)\",\"vendor\":\"WebKit\",\"vendorUnmasked\":\"ARM\",\"renderer\":\"WebKit WebGL\",\"rendererUnmasked\":\"Mali-G68\",\"shadingLanguageVersion\":\"WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)\"},\"duration\":83},\"webGlExtensions\":null}}}",
                "method": "POST",
                "mode": "cors"
            });
            var b = await resp.json();
            localStorage.authToken = b.authToken;
        }
        document.head.innerHTML = "<style> a {text-decoration: none;padding:1em;border-radius:1em;margin-top:20px;background-color:#24A1DE;font-weight:900;font-size:1.5em;color:#fff;} a:hover {background-color: #5ec2f2} * {user-select:none; font-family: monospace; margin: 0px; padding: 0px;}</style>"
        document.body.innerHTML = "<div style=\"height:100vh;background-color: white;display: flex;justify-content: center;align-items: center;color: black;text-align:center;color:#24A1DE;\"><div><h1 style=\"font-size: 3em;font-weight:900;\">Token Obtainer\n</h1><p style=\"font-size: 1.5em;\">Game: Hamster Kombat</p><br><br><br><a href=\"javascript:prompt('Copy your token:', localStorage.authToken);\">Copy token</a></div></div>";
    }
});
async function hamster(tab){
     await chrome.scripting.executeScript({
       target: {tabId: tab, allFrames: true},
       func: hamsterlog
     })
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        console.log(sender);
        if (request.exec === "hamster"){
            sendResponse({ok: true});
            hamster(sender.tab.id)
        }
    }
  );
  
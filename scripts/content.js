(async () => {
    const response = await chrome.runtime.sendMessage({exec: "hamster"});
    console.log(response);
})();
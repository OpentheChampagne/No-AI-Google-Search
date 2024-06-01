// Listener for when the Chrome extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  const ruleId = 1;
  const rule = {
    id: ruleId,
    priority: 1,
    action: {
      type: "redirect",
      redirect: {
        transform: {
          queryTransform: {
            addOrReplaceParams: [{ key: "udm", value: "14" }]
          }
        }
      }
    },
    condition: {
      urlFilter: "https://www.google.com/search*",
      resourceTypes: ["main_frame"]
    }
  };

  // Update the dynamic rules for the declarativeNetRequest API
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [ruleId],
    addRules: [rule]
  });
});
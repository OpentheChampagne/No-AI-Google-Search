document.addEventListener("DOMContentLoaded", function () {
    // console.log("Content script loaded and running");
    function removeElementByAttributes(attributes) {
        const selector = attributes.map(attr => `[${attr.name}="${attr.value}"]`).join('');
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            console.log(`Found element with attributes: ${JSON.stringify(attributes)}`, element);
            const parentContainer = element.closest('div');
            if (parentContainer) {
                console.log('Removing parent container:', parentContainer);
                parentContainer.remove();
            } else {
                console.log('Removing element itself:', element);
                element.remove();
            }
        });
    }

    removeElementByAttributes([{ name: 'jscontroller', value: '' }, { name: 'data-is-desktop', value: '1' }]);
    removeElementByAttributes([{ name: 'jscontroller', value: '' }, { name: 'data-is-desktop', value: '1' }]);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    console.log('New node added:', node);
                    if (node.matches('h1')) {
                        if (node.innerText.includes('AI Overview')) {
                            console.log('Found AI Overview header:', node);
                            const parentContainer = node.closest('div');
                            if (parentContainer) {
                                console.log('Removing parent container:', parentContainer);
                                parentContainer.remove();
                            }
                        }
                    }
                    if (node.matches('div[data-is-desktop="1"][jscontroller]')) {
                        console.log('Found specific div:', node);
                        const parentContainer = node.closest('div');
                        if (parentContainer) {
                            console.log('Removing parent container:', parentContainer);
                            parentContainer.remove();
                        }
                    }
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
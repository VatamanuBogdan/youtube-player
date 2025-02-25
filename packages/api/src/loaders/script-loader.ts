type AppendTarget = 'head' | 'body';

export default function loadJsScript(url: string, target: AppendTarget = 'head'): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const scriptElement = document.createElement('script');
            scriptElement.src = url;
            scriptElement.type = 'text/javascript';
            scriptElement.async = true;

            scriptElement.addEventListener('load', () => {
                resolve();
            });

            scriptElement.addEventListener('error', () => {
                reject(new Error(`Failed to load the ${url} script`));
            });

            if (target === 'head') {
                document.head.appendChild(scriptElement);
            } else {
                document.body.appendChild(scriptElement);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Enhanced Token Monitor with specific AWS AppSync focus
class EnhancedTokenMonitor {
    constructor() {
        this.originalXHR = window.XMLHttpRequest;
        this.originalFetch = window.fetch;
        this.originalWS = window.WebSocket;
        this.records = new Map();
        this.awsEndpoints = [
            'appsync-api',
            'appsync-realtime',
            'amazonaws.com',
            'pump-fe.helius-rpc.com'
        ];
        this.tokenPatterns = [
            'x-aws-proxy',
            'auth_token',
            'authorization'
        ];
    }

    start() {
        this.monitorXHR();
        this.monitorFetch();
        this.monitorWebSocket();
        this.monitorStorage();
        this.monitorCookies();
        console.log('%cToken Monitor Started - Ready to capture token generation', 'color: green; font-size: 14px');
    }

    monitorXHR() {
        const self = this;
        window.XMLHttpRequest = function() {
            const xhr = new self.originalXHR();
            const originalOpen = xhr.open;
            const originalSetRequestHeader = xhr.setRequestHeader;
            const requestHeaders = {};

            xhr.open = function() {
                this.requestMethod = arguments[0];
                this.requestUrl = arguments[1];
                originalOpen.apply(this, arguments);
            };

            xhr.setRequestHeader = function(header, value) {
                requestHeaders[header.toLowerCase()] = value;
                if (self.isTokenHeader(header)) {
                    console.log('%cToken Header Detected:', 'color: #ff9900', {
                        header,
                        value: value.substring(0, 20) + '...'
                    });
                }
                originalSetRequestHeader.apply(this, arguments);
            };

            xhr.addEventListener('load', function() {
                const responseHeaders = {};
                xhr.getAllResponseHeaders().split('\r\n').forEach(line => {
                    const [key, value] = line.split(': ');
                    if (key) responseHeaders[key.toLowerCase()] = value;
                });

                self.processRequest({
                    type: 'XHR',
                    url: xhr.requestUrl,
                    method: xhr.requestMethod,
                    requestHeaders,
                    responseHeaders,
                    timestamp: new Date().toISOString()
                });
            });

            return xhr;
        };
    }

    monitorFetch() {
        const self = this;
        window.fetch = async function() {
            const request = arguments[0];
            const config = arguments[1] || {};
            
            if (self.isTokenHeader(Object.keys(config.headers || {}))) {
                console.log('%cFetch Request with Token:', 'color: #ff9900', {
                    url: request.url || request,
                    headers: config.headers
                });
            }

            const response = await self.originalFetch.apply(this, arguments);
            const responseClone = response.clone();
            
            const headers = {};
            for (let [key, value] of responseClone.headers.entries()) {
                headers[key.toLowerCase()] = value;
            }

            self.processRequest({
                type: 'Fetch',
                url: typeof request === 'string' ? request : request.url,
                method: config.method || 'GET',
                requestHeaders: config.headers || {},
                responseHeaders: headers,
                timestamp: new Date().toISOString()
            });

            return response;
        };
    }

    monitorWebSocket() {
        const self = this;
        window.WebSocket = function(url, protocols) {
            console.log('%cWebSocket Connection Attempted:', 'color: #0066cc', {
                url,
                protocols
            });

            const ws = new self.originalWS(url, protocols);
            
            ws.addEventListener('open', () => {
                console.log('%cWebSocket Connected:', 'color: #00cc66', url);
            });

            ws.addEventListener('message', (event) => {
                self.processWebSocketMessage(url, event.data);
            });

            return ws;
        };
    }

    monitorStorage() {
        window.addEventListener('storage', (e) => {
            if (this.isTokenRelated(e.key)) {
                console.log('%cStorage Change Detected:', 'color: #9900cc', {
                    key: e.key,
                    oldValue: e.oldValue ? e.oldValue.substring(0, 20) + '...' : null,
                    newValue: e.newValue ? e.newValue.substring(0, 20) + '...' : null
                });
            }
        });
    }

    monitorCookies() {
        let lastCookie = document.cookie;
        setInterval(() => {
            if (document.cookie !== lastCookie) {
                const changes = this.findCookieChanges(lastCookie, document.cookie);
                if (changes.length > 0) {
                    console.log('%cCookie Changes Detected:', 'color: #cc6600', changes);
                }
                lastCookie = document.cookie;
            }
        }, 100);
    }

    findCookieChanges(oldCookie, newCookie) {
        const changes = [];
        const oldCookies = this.parseCookies(oldCookie);
        const newCookies = this.parseCookies(newCookie);
        
        for (const [key, value] of Object.entries(newCookies)) {
            if (!oldCookies[key] || oldCookies[key] !== value) {
                changes.push({
                    type: 'added/changed',
                    key,
                    value: value.substring(0, 20) + '...'
                });
            }
        }
        
        return changes;
    }

    parseCookies(cookieString) {
        return cookieString.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            cookies[name] = value;
            return cookies;
        }, {});
    }

    processRequest(data) {
        if (this.isAWSRelated(data)) {
            console.log('%cAWS Request:', 'color: #ff9900; font-weight: bold', {
                url: data.url,
                method: data.method,
                tokenHeaders: this.extractTokenHeaders(data.requestHeaders)
            });
        }
    }

    processWebSocketMessage(url, data) {
        try {
            const parsed = JSON.parse(data);
            if (this.isTokenRelated(JSON.stringify(parsed))) {
                console.log('%cWebSocket Token Message:', 'color: #0066cc', {
                    url,
                    data: parsed
                });
            }
        } catch (e) {
            // Not JSON data, ignore
        }
    }

    isAWSRelated(data) {
        const stringified = JSON.stringify(data).toLowerCase();
        return this.awsEndpoints.some(endpoint => stringified.includes(endpoint));
    }

    isTokenRelated(str) {
        return this.tokenPatterns.some(pattern => str.toLowerCase().includes(pattern));
    }

    isTokenHeader(header) {
        return this.tokenPatterns.some(pattern => header.toLowerCase().includes(pattern));
    }

    extractTokenHeaders(headers) {
        return Object.entries(headers)
            .filter(([key]) => this.isTokenHeader(key))
            .reduce((acc, [key, value]) => {
                acc[key] = value.substring(0, 20) + '...';
                return acc;
            }, {});
    }

    getRecords() {
        return Array.from(this.records.values());
    }

    stop() {
        window.XMLHttpRequest = this.originalXHR;
        window.fetch = this.originalFetch;
        window.WebSocket = this.originalWS;
        console.log('Token Monitor stopped');
    }
}

// Usage instructions in console
console.log(`
Step-by-Step Instructions:

1. Clear Browser Data:
   - Press F12 to open DevTools
   - Go to Application tab
   - Select "Clear site data"
   - Check "Cookies" and "Local storage"
   - Click "Clear site data"

2. Start Monitor:
   const monitor = new EnhancedTokenMonitor();
   monitor.start();

3. Perform These Actions:
   a. Go to pump.fun
   b. Open browser console
   c. Login to your account
   d. Watch for highlighted messages in console

4. Look For:
   - Orange messages: AWS requests & token headers
   - Blue messages: WebSocket connections
   - Purple messages: Storage changes
   - Green messages: WebSocket messages

5. After Login:
   - Check WebSocket connections to AWS AppSync
   - Look for x-aws-proxy in request headers
   - Monitor local storage changes

6. To get all records:
   monitor.getRecords()

Watch particularly for:
- WebSocket connections to: appsync-realtime-api.eu-west-1.amazonaws.com
- Headers containing: x-aws-proxy
- Authentication flows right after login
`);

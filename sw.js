// Cache only the public application shell and hashed assets. Never cache auth/API responses.
const CACHE='yangdee-shell-index-Cd9LhOJqjs';
const ASSETS = ["/assets/index-Cd9LhOJq.js","/assets/index-BwrkXpxX.css"];
const BASE=new URL(self.registration.scope).pathname.replace(/\/$/,'');
const local=path=>`${BASE}${path}`;
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll([local('/'),local('/index.html'),local('/icon.svg'),local('/manifest.webmanifest'),...ASSETS])).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api'))return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(response=>{if(response.ok&&response.headers.get('content-type')?.includes('text/html')){const clone=response.clone();caches.open(CACHE).then(c=>c.put(local('/index.html'),clone));}return response;}).catch(()=>caches.match(local('/index.html'))));return;}
 if(url.pathname.startsWith(local('/assets/'))||[local('/icon.svg'),local('/manifest.webmanifest')].includes(url.pathname)){event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));}return response;})));}
});

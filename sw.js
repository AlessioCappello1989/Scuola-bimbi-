var C='agf-v1';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C&&x.indexOf('agf-')===0}).map(function(x){return caches.delete(x)}))}).then(function(){return clients.claim()}))});
self.addEventListener('fetch',function(e){
 var u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open(C).then(function(x){x.put(e.request,c)})}return r}).catch(function(){return caches.match(e.request).then(function(h){return h||caches.match('index.html')})}));
});
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(function(l){return l.length?l[0].focus():clients.openWindow('./')}))});

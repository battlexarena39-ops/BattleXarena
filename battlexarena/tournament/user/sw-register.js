if ('serviceWorker' in navigator) {
        const swCode = `
const CACHE_NAME='war-zone-v1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{self.clients.claim();});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.hostname.includes('firebasedatabase')||u.hostname.includes('googleapis')||u.hostname.includes('zapupi')||u.hostname.includes('corsproxy')||u.hostname.includes('allorigins'))return;
  if(u.hostname.includes('fonts.')||u.hostname.includes('cdnjs.')||u.hostname.includes('gstatic.')||u.hostname.includes('jsdelivr.')){
    e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cl=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,cl));return r;})));
    return;
  }
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('/')));return;}
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});`;
        const swBlob = new Blob([swCode], {type:'text/javascript'});
        navigator.serviceWorker.register(URL.createObjectURL(swBlob)).catch(()=>{});
    }
// THIS FILE SHOULD NOT BE VERSION CONTROLLED

// https://github.com/NekR/self-destroying-sw

const filesToCache = [
  '/',
]

const cacheName = 'cache-v1'

self.addEventListener('install', (e) => {
  e.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(filesToCache)
		})
	)
})

self.addEventListener('activate', event => {
	console.log('now ready to handle fetches!')
	  event.waitUntil(
		caches.keys().then(function(cacheNames) {
			var promiseArr = cacheNames.map(function(item) {
				if (item !== cacheName) {
					// Delete that cached file
					return caches.delete(item)
				}
			})
			return Promise.all(promiseArr)
		})
	)
})

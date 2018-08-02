
interface RequestCacheObject {
    request: XMLHttpRequest
    onload: Function[]
    onprogress: Function[]
}

interface ImageRequestCache { [key: string]: RequestCacheObject }

const cachedLazyLoad = function() {
    const cache: ImageRequestCache = {}
    return (src: string, onload: Function, onprogress?: Function) => {
        if (!cache.hasOwnProperty(src)) {
            const request = new XMLHttpRequest()
            request.open('GET', src, true)
            request.responseType = 'arraybuffer'
            request.send()
            const toCache = {
                request: request,
                onload: [onload],
                onprogress: onprogress ? [onprogress] : []
            }
            cache[src] = toCache
        }
        const cached = cache[src]
        if (cached.request.readyState === 4) {
            onload(cached.request, new Event("XMLDone"))
        }
        cached.onload.push(onload)
        if (onprogress) {
            cached.onprogress.push(onprogress)
        }
        cached.request.onload = (e) => {
            cached.onload.forEach((f) => {
                f(cached.request, e)
            })
        }
        cached.request.onprogress = (e) => {
            cached.onprogress.forEach((f) => {
                f(cached.request, e)
            })
        }
        return cached.request
    }
}

export default cachedLazyLoad()
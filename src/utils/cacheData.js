import axios from 'axios'

// Đối tượng lưu trữ cache
const cache = {}
console.log(cache, 'sdjslkjslkdj')

// Hàm kiểm tra xem dữ liệu trong cache còn hiệu lực hay không
const isCacheValid = (cacheData, maxAge) => {
    return cacheData && Date.now() - cacheData.timestamp < maxAge
}

// Hàm gửi yêu cầu GET với cache
export const getWithCache = async (url, data, maxAge) => {
    if (cache[url] && isCacheValid(cache[url], maxAge)) {
        // Dữ liệu có sẵn trong cache, trả về ngay
        return cache[url].data
    }
    try {
        // Gửi yêu cầu GET
        const response = await axios.post(url, data)

        // Lưu dữ liệu vào cache
        cache[url] = {
            data: response.data,
            timestamp: Date.now(),
        }

        return response.data
    } catch (error) {
        throw error
    }
}

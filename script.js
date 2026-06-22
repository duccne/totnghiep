const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const newsContainer = document.getElementById('news-container');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');

// Viết hàm async/await để lấy dữ liệu bài viết từ API
async function fetchNews() {
    // Hiển thị hiệu ứng loading, ẩn thông báo lỗi cũ
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    newsContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        
        // Kiểm tra nếu phản hồi mạng không thành công
        if (!response.ok) {
            throw new Error(`Lỗi kết nối server: ${response.status}`);
        }

        const posts = await response.json();
        
        // Render dữ liệu nhận được thành các khối Card tin tức
        renderNews(posts);
    } catch (error) {
        // Thực hiện bắt lỗi bằng khối try...catch (mất mạng hoặc lỗi server)
        console.error('Đã xảy ra lỗi:', error);
        errorElement.textContent = `Không thể tải tin tức. Vui lòng kiểm tra lại kết nối mạng hoặc hệ thống! (${error.message})`;
        errorElement.style.display = 'block';
    } finally {
        // Ẩn Loading Indicator sau khi đã xử lý xong (dù thành công hay thất bại)
        loadingElement.style.display = 'none';
    }
}

function renderNews(posts) {
    // Chỉ lấy 12 bài viết đầu tiên để tối ưu hiển thị giao diện
    const displayPosts = posts.slice(0, 12);

    displayPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';

        // Tiêu đề bài viết
        const title = document.createElement('h3');
        title.textContent = post.title;

        // Nội dung ngắn bài viết
        const body = document.createElement('p');
        body.textContent = post.body;

        card.appendChild(title);
        card.appendChild(body);
        newsContainer.appendChild(card);
    });
}

// Kích hoạt gọi API ngay khi trang web tải xong cấu trúc DOM
document.addEventListener('DOMContentLoaded', fetchNews);

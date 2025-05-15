// 產品頁面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 處理URL錨點，自動滾動到特定分類
    const handleUrlHash = () => {
        const hash = window.location.hash.substring(1); // 去掉"#"符號
        
        if (!hash) return;
        
        const categoryBtn = document.getElementById(hash);
        if (categoryBtn) {
            // 點擊對應的分類按鈕
            categoryBtn.click();
            
            // 滾動到分類部分
            const categoryHeader = document.getElementById(`category-${hash}`);
            if (categoryHeader) {
                setTimeout(() => {
                    categoryHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    };
    
    // 處理分類標籤切換
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productRows = document.querySelectorAll('.products-row');
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    // 使用事件委托来管理标签点击事件
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', function(event) {
            const clickedButton = event.target.closest('.tab-btn');
            if (!clickedButton) return;
            
            // 移除所有標籤的active類
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 添加當前標籤的active類
            clickedButton.classList.add('active');
            
            const category = clickedButton.getAttribute('data-category');
            
            // 控制类别和产品的显示隐藏
            const isAll = category === 'all';
            
            // 使用一次性的 DOM 修改
            productRows.forEach(row => {
                row.style.display = isAll || row.getAttribute('data-category') === category ? 'grid' : 'none';
            });
            
            categoryHeaders.forEach(header => {
                const headerId = header.getAttribute('id');
                header.style.display = isAll || headerId === `category-${category}` ? 'block' : 'none';
            });
        });
    }
    
    // 產品卡片3D效果增強 - 使用事件委托优化
    const productGridContainer = document.querySelector('.product-grid');
    if (productGridContainer) {
        // 鼠标移动效果处理函数
        const handleMouseMove = (card, e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / (cardRect.width / 2)) * 8;
            const rotateX = (mouseY / (cardRect.height / 2)) * -8;
            
            // 使用 transform 一次设置所有变换
            const shadowX = (mouseX / cardRect.width) * 20;
            const shadowY = (mouseY / cardRect.height) * 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;
        };
        
        // 使用事件委托
        productGridContainer.addEventListener('mousemove', function(e) {
            const card = e.target.closest('.product-card');
            if (card) {
                handleMouseMove(card, e);
            }
        });
        
        productGridContainer.addEventListener('mouseleave', function(e) {
            const card = e.target.closest('.product-card');
            if (card) {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            }
        });
    }
    
    // 處理URL參數
    const urlParams = new URLSearchParams(window.location.search);
    const promoParam = urlParams.get('promo');
    
    if (promoParam) {
        // 如果有促銷參數，可以高亮顯示特定產品
        const promoProducts = document.querySelectorAll(`.product-card[data-promo="${promoParam}"]`);
        
        // 只创建一次徽章元素
        const createBadge = () => {
            const badge = document.createElement('div');
            badge.className = 'product-badge';
            badge.textContent = '限時促銷';
            badge.style.background = 'linear-gradient(135deg, #ff3e6b, #ff7e34)';
            return badge;
        };
        
        promoProducts.forEach(product => {
            // 添加促銷標識
            if (!product.querySelector('.product-badge')) {
                product.appendChild(createBadge());
            }
        });
    }
    
    // 初始處理URL錨點
    handleUrlHash();
    
    // 當URL hash改變時也處理
    window.addEventListener('hashchange', handleUrlHash);
}); 
// 產品頁面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 處理URL錨點，自動滾動到特定分類
    const handleUrlHash = () => {
        const hash = window.location.hash.substring(1); // 去掉"#"符號
        
        if (hash) {
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
        }
    };
    
    // 處理分類標籤切換
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productRows = document.querySelectorAll('.products-row');
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有標籤的active類
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 添加當前標籤的active類
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                // 顯示所有產品和分類標題
                productRows.forEach(row => {
                    row.style.display = 'grid';
                });
                
                categoryHeaders.forEach(header => {
                    header.style.display = 'block';
                });
            } else {
                // 隱藏所有產品和分類標題
                productRows.forEach(row => {
                    row.style.display = 'none';
                });
                
                categoryHeaders.forEach(header => {
                    header.style.display = 'none';
                });
                
                // 顯示選中分類的產品和標題
                const selectedRows = document.querySelectorAll(`.products-row[data-category="${category}"]`);
                const selectedHeader = document.getElementById(`category-${category}`);
                
                selectedRows.forEach(row => {
                    row.style.display = 'grid';
                });
                
                if (selectedHeader) {
                    selectedHeader.style.display = 'block';
                }
            }
        });
    });
    
    // 產品卡片3D效果增強
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / (cardRect.width / 2)) * 8;
            const rotateX = (mouseY / (cardRect.height / 2)) * -8;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // 添加陰影效果
            const shadowX = (mouseX / cardRect.width) * 20;
            const shadowY = (mouseY / cardRect.height) * 20;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 處理URL參數
    const urlParams = new URLSearchParams(window.location.search);
    const promoParam = urlParams.get('promo');
    
    if (promoParam) {
        // 如果有促銷參數，可以高亮顯示特定產品
        const promoProducts = document.querySelectorAll(`.product-card[data-promo="${promoParam}"]`);
        
        promoProducts.forEach(product => {
            // 添加促銷標識
            if (!product.querySelector('.product-badge')) {
                const badge = document.createElement('div');
                badge.className = 'product-badge';
                badge.textContent = '限時促銷';
                badge.style.background = 'linear-gradient(135deg, #ff3e6b, #ff7e34)';
                product.appendChild(badge);
            }
        });
    }
    
    // 初始處理URL錨點
    handleUrlHash();
    
    // 當URL hash改變時也處理
    window.addEventListener('hashchange', handleUrlHash);
}); 
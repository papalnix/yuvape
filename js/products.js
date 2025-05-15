// 产品页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 处理URL锚点，自动滚动到特定分类
    const handleUrlHash = () => {
        const hash = window.location.hash.substring(1); // 去掉"#"符号
        
        if (hash) {
            const categoryBtn = document.getElementById(hash);
            if (categoryBtn) {
                // 点击对应的分类按钮
                categoryBtn.click();
                
                // 滚动到分类部分
                const categoryHeader = document.getElementById(`category-${hash}`);
                if (categoryHeader) {
                    setTimeout(() => {
                        categoryHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }
        }
    };
    
    // 处理分类标签切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productRows = document.querySelectorAll('.products-row');
    const categoryHeaders = document.querySelectorAll('.category-header');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有标签的active类
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 添加当前标签的active类
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            if (category === 'all') {
                // 显示所有产品和分类标题
                productRows.forEach(row => {
                    row.style.display = 'grid';
                });
                
                categoryHeaders.forEach(header => {
                    header.style.display = 'block';
                });
            } else {
                // 隐藏所有产品和分类标题
                productRows.forEach(row => {
                    row.style.display = 'none';
                });
                
                categoryHeaders.forEach(header => {
                    header.style.display = 'none';
                });
                
                // 显示选中分类的产品和标题
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
    
    // 产品卡片3D效果增强
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
            
            // 添加阴影效果
            const shadowX = (mouseX / cardRect.width) * 20;
            const shadowY = (mouseY / cardRect.height) * 20;
            this.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 处理URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const promoParam = urlParams.get('promo');
    
    if (promoParam) {
        // 如果有促销参数，可以高亮显示特定产品
        const promoProducts = document.querySelectorAll(`.product-card[data-promo="${promoParam}"]`);
        
        promoProducts.forEach(product => {
            // 添加促销标识
            if (!product.querySelector('.product-badge')) {
                const badge = document.createElement('div');
                badge.className = 'product-badge';
                badge.textContent = '限时促销';
                badge.style.background = 'linear-gradient(135deg, #ff3e6b, #ff7e34)';
                product.appendChild(badge);
            }
        });
    }
    
    // 初始处理URL锚点
    handleUrlHash();
    
    // 当URL hash改变时也处理
    window.addEventListener('hashchange', handleUrlHash);
}); 
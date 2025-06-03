// 產品頁面交互功能
document.addEventListener('DOMContentLoaded', function() {
    
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

}); 
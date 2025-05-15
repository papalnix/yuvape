// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取页面元素
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const body = document.body;
    
    // 初始化滚动位置处理
    handleScroll();
    
    // 轮播图控制
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-nav-btn.prev');
    const nextBtn = document.querySelector('.slide-nav-btn.next');
    
    // 初始化轮播图功能
    function initSlider() {
        if (slides.length > 0) {
            let currentSlide = 0;
            let slideInterval;
            
            // 切换到指定幻灯片
            function goToSlide(index) {
                // 处理索引边界
                if (index < 0) {
                    index = slides.length - 1;
                } else if (index >= slides.length) {
                    index = 0;
                }
                
                // 移除当前激活状态
                slides[currentSlide].classList.remove('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.remove('active');
                }
                
                // 设置新的当前索引
                currentSlide = index;
                
                // 添加新的激活状态
                slides[currentSlide].classList.add('active');
                if (dots[currentSlide]) {
                    dots[currentSlide].classList.add('active');
                }
            }
            
            // 下一张幻灯片
            function nextSlide() {
                goToSlide(currentSlide + 1);
            }
            
            // 上一张幻灯片
            function prevSlide() {
                goToSlide(currentSlide - 1);
            }
            
            // 开始自动轮播
            function startSlideInterval() {
                // 清除可能存在的旧定时器
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
                // 设置新的定时器
                slideInterval = setInterval(nextSlide, 5000); // 5秒切换一次
            }
            
            // 点击导航按钮
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    prevSlide();
                    startSlideInterval(); // 重置定时器
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    nextSlide();
                    startSlideInterval(); // 重置定时器
                });
            }
            
            // 点击指示点
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    goToSlide(index);
                    startSlideInterval(); // 重置定时器
                });
            });
            
            // 启动自动轮播
            startSlideInterval();
            
            // 当鼠标悬停在轮播图上时暂停自动播放
            if (slides[0].parentElement) {
                const sliderContainer = slides[0].parentElement;
                
                sliderContainer.addEventListener('mouseenter', function() {
                    clearInterval(slideInterval);
                });
                
                sliderContainer.addEventListener('mouseleave', function() {
                    startSlideInterval();
                });
            }
        }
    }
    
    // 初始化轮播图
    initSlider();
    
    // 年龄验证弹窗处理
    const ageVerification = document.getElementById('age-verification');
    const confirmAgeBtn = document.getElementById('confirm-age');
    const rejectAgeBtn = document.getElementById('reject-age');
    
    // 检查是否已经验证过年龄
    if (!localStorage.getItem('age-verified')) {
        ageVerification.style.display = 'flex'; // 使用flex布局显示
    } else {
        ageVerification.style.display = 'none';
    }
    
    // 确认年龄
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('age-verified', 'true');
        ageVerification.style.display = 'none';
    });
    
    // 拒绝年龄
    rejectAgeBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
    
    // 移动端菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 滚动时改变导航栏样式
    let lastScrollTop = 0;
    let ticking = false;
    const headerHeight = document.querySelector('header').offsetHeight; // 动态获取导航栏高度
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        
        // 处理导航栏透明度
        if (hero) {
            const heroRect = hero.getBoundingClientRect();
            const headerRect = header.getBoundingClientRect();
            
            if (heroRect.top < headerRect.height && heroRect.bottom > headerRect.height * 2) {
                // 在hero区域内，保持透明
                header.classList.add('transparent');
                header.classList.remove('scrolled');
                header.classList.remove('hidden'); // 确保在hero区域内导航栏不会隐藏
            } else if (scrollTop > headerHeight) {
                // 已滚动超过hero区域
                header.classList.remove('transparent');
                header.classList.add('scrolled');
                
                // 只有在滚动超过hero区域后才应用隐藏/显示逻辑
                if (scrollDirection === 'down' && scrollTop > 150) {
                    // 向下滚动超过150px - 隐藏
                    header.classList.add('hidden');
                } else if (scrollDirection === 'up') {
                    // 向上滚动 - 立即显示
                    header.classList.remove('hidden');
                }
            } else {
                // 在页面顶部
                header.classList.remove('transparent');
                header.classList.remove('scrolled');
                header.classList.remove('hidden'); // 确保在页面顶部导航栏不会隐藏
            }
        } else {
            // 如果没有hero区域（例如在其他页面）
            if (scrollTop > headerHeight) {
                header.classList.add('scrolled');
                
                // 应用隐藏/显示逻辑
                if (scrollDirection === 'down' && scrollTop > 150) {
                    header.classList.add('hidden');
                } else if (scrollDirection === 'up') {
                    header.classList.remove('hidden');
                }
            } else {
                header.classList.remove('scrolled');
                header.classList.remove('hidden');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止滚动为负值
    }
    
    // 监听窗口滚动事件
    window.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 初始化商品数量选择器
    initQuantitySelector();
    
    // 初始化产品详情页选项卡
    initProductTabs();
    
    // 初始化产品图片切换
    initProductImageSwitch();
    
    // 初始化产品变体选择
    initVariantSelection();
    
    // 产品卡片3D效果
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = (mouseX / (cardRect.width / 2)) * 5;
            const rotateX = (mouseY / (cardRect.height / 2)) * -5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // WhatsApp按钮点击事件，检查移动设备
    const whatsappButton = document.getElementById('whatsapp-button');
    
    whatsappButton.addEventListener('click', function(e) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappNumber = '1234567890'; // 更改为您的实际WhatsApp号码
        
        if (isMobile) {
            window.location.href = `whatsapp://send?phone=${whatsappNumber}`;
        } else {
            window.open(`https://web.whatsapp.com/send?phone=${whatsappNumber}`, '_blank');
        }
    });
    
    // 自定义debounce函数
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img');
    
    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.dataset.src && img.getBoundingClientRect().top <= window.innerHeight) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };
    
    // 初始加载
    lazyLoad();
    
    // 滚动时加载
    window.addEventListener('scroll', debounce(lazyLoad, 200));
});

// 商品数量选择器
function initQuantitySelector() {
    // ... existing code ...
}

// 产品详情页选项卡
function initProductTabs() {
    // ... existing code ...
}

// 产品主图切换
function initProductImageSwitch() {
    // ... existing code ...
}

// 产品变体选择
function initVariantSelection() {
    // ... existing code ...
}

// 图片延迟加载函数
// ... existing code ... 
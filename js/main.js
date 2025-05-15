// DOM加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 驗證年齡
    ageVerification();

    // 初始化滚动处理
    handleScroll();
    
    // 移动端菜单切换
    setupMobileMenu();
    
    // 監聽窗口滾動事件
    window.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // 监听窗口大小变化，处理移动端菜单关闭
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mainMenu = document.querySelector('.main-menu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (mainMenu && menuToggle) {
                mainMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

function ageVerification(){
    // 年齡驗證彈窗處理
    const ageVerification = document.getElementById('age-verification');
    const confirmAgeBtn = document.getElementById('confirm-age');
    const rejectAgeBtn = document.getElementById('reject-age');
    
    // 檢查是否已經驗證過年齡
    if (!localStorage.getItem('age-verified')) {
        ageVerification.style.display = 'flex'; // 使用flex佈局顯示
    } else {
        ageVerification.style.display = 'none';
    }
    
    // 確認年齡
    confirmAgeBtn.addEventListener('click', function() {
        localStorage.setItem('age-verified', 'true');
        ageVerification.style.display = 'none';
    });
    
    // 拒絕年齡
    rejectAgeBtn.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
}

// 移动端菜单切换功能
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const body = document.querySelector('body');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // 当菜单打开时，禁止页面滚动
            if (mainMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = mainMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
                
                // 为移动端添加平滑滚动效果
                if (this.getAttribute('href').startsWith('#')) {
                    event.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainMenu.contains(event.target) && !menuToggle.contains(event.target) && mainMenu.classList.contains('active')) {
                mainMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// 滾動時改變導航欄樣式
let lastScrollTop = 0;
let ticking = false;
const headerHeight = document.querySelector('header')?.offsetHeight || 80; // 動態獲取導航欄高度

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    const header = document.querySelector('header');
    
    if (!header) return;
    
    // 為頁面添加滾動指示器
    document.documentElement.style.setProperty('--scroll', (scrollTop / (document.body.scrollHeight - window.innerHeight)).toFixed(2));
    
    // 統一處理導航欄樣式，移除透明效果
    if (scrollTop > headerHeight) {
        header.classList.add('scrolled');
        
        // 應用隱藏/顯示邏輯
        if (scrollDirection === 'down' && scrollTop > 150) {
            header.classList.add('hidden');
        } else if (scrollDirection === 'up') {
            header.classList.remove('hidden');
        }
    } else {
        header.classList.remove('scrolled');
        header.classList.remove('hidden');
    }
    
    // 高亮当前滚动位置对应的导航项
    highlightNavOnScroll();
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止滾動為負值
}

// 根据滚动位置高亮对应的导航项
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-menu a');
    
    if (sections.length === 0 || navItems.length === 0) return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}


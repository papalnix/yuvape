// DOM加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 驗證年齡
    ageVerification();

    // 初始化滚动处理
    handleScroll();
    
    // 移动端菜单切换
    setupMobileMenu();
    
    // 使用防抖技术处理滚动事件
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(handleScroll);
    });
    
    // 使用防抖处理窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', function() {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 768) {
                const mainMenu = document.querySelector('.main-menu');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (mainMenu && menuToggle) {
                    mainMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        }, 100);
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
    confirmAgeBtn?.addEventListener('click', function() {
        localStorage.setItem('age-verified', 'true');
        ageVerification.style.display = 'none';
        
        // 创建whatsapp和wallet按钮
        initWhatsAppButton();
        createWalletButton();
    });
    
    // 拒絕年齡
    rejectAgeBtn?.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });
}

// 移动端菜单切换功能
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const body = document.querySelector('body');
    
    if (!menuToggle || !mainMenu) return;
    
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // 当菜单打开时，禁止页面滚动
        body.style.overflow = mainMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // 点击菜单项后关闭菜单
    const menuItems = mainMenu.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
            
            // 为移动端添加平滑滚动效果
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
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
        if (mainMenu.classList.contains('active') && 
            !mainMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mainMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// 滾動時改變導航欄樣式
let lastScrollTop = 0;
const headerHeight = document.querySelector('header')?.offsetHeight || 80; // 動態獲取導航欄高度

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    const header = document.querySelector('header');
    
    if (!header) return;
    
    // 使用 document.documentElement 確保較好的兼容性
    document.documentElement.style.setProperty('--scroll', 
        Math.min(1, (scrollTop / (document.body.scrollHeight - window.innerHeight))).toFixed(2));
    
    // 統一處理導航欄樣式
    if (scrollTop > headerHeight) {
        header.classList.add('scrolled');
        
        // 應用隱藏/顯示邏輯
        header.classList.toggle('hidden', scrollDirection === 'down' && scrollTop > 150);
    } else {
        header.classList.remove('scrolled', 'hidden');
    }
    
    // 高亮当前滚动位置对应的导航项
    highlightNavOnScroll();
    
    lastScrollTop = Math.max(0, scrollTop); // 防止滾動為負值
}

// 根据滚动位置高亮对应的导航项
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.main-menu a');
    
    if (sections.length === 0 || navItems.length === 0) return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // 使用 Array.from 转换 NodeList 以使用 find 等方法
    const currentSection = Array.from(sections).find(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        return scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight;
    });
    
    if (currentSection) {
        const sectionId = currentSection.getAttribute('id');
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + sectionId);
        });
    }
}


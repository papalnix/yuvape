// 创建扑克按钮
const createPokerButton = () => {
    // 检查年龄验证状态
    const isAgeVerified = localStorage.getItem('age-verified') === 'true';
    if (!isAgeVerified) {
        return; // 如果未通过年龄验证，不创建按钮
    }

    // 如果样式不存在才添加
    if (!document.getElementById('poker-float-style')) {
        const style = document.createElement('style');
        style.id = 'poker-float-style';
        style.textContent = `
            .poker-button {
                position: fixed;
                right: 20px;
                top: 90px;
                width: 60px;
                height: 60px;
                background-color: #1a1a1a;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                border: 2px solid rgba(255, 255, 255, 0.1);
            }

            .poker-button:hover {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 8px 25px rgba(255, 0, 0, 0.4);
            }

            .poker-button .notification-dot {
                position: absolute;
                top: 0;
                right: 0;
                width: 12px;
                height: 12px;
                background-color: #ff0000;
                border-radius: 50%;
                border: 2px solid #ffffff;
            }

            .poker-button svg {
                width: 32px;
                height: 32px;
                fill: #ffffff;
            }
        `;
        document.head.appendChild(style);
    }

    // 创建按钮
    const button = document.createElement('a');
    button.className = 'poker-button';
    button.href = 'http://www.wus888.com?i=03B3ta5';
    button.target = '_blank'; // 在新标签页中打开
    
    // 扑克SVG图标
    button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
            <path d="M7 2h10v20H7z" fill="#ff0000"/>
            <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 14c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" fill="#ffffff"/>
        </svg>
        <div class="notification-dot"></div>
    `;

    // 将按钮添加到页面
    document.body.appendChild(button);
};

// 当 DOM 加载完成后创建按钮
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPokerButton);
} else {
    // 如果DOM已经加载完毕，立即初始化
    createPokerButton();
} 
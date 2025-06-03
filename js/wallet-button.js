// 创建钱袋按钮
const createWalletButton = () => {
    // 检查年龄验证状态
    const isAgeVerified = localStorage.getItem('age-verified') === 'true';
    if (!isAgeVerified) {
        return; // 如果未通过年龄验证，不创建按钮
    }

    // 如果样式不存在才添加
    if (!document.getElementById('wallet-float-style')) {
        const style = document.createElement('style');
        style.id = 'wallet-float-style';
        style.textContent = `
            .wallet-button {
                position: fixed;
                right: 20px;
                bottom: 170px;
                width: 60px;
                height: 60px;
                background-color: #FFD700;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 30px;
                color: #000;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                border: 2px solid rgba(255, 255, 255, 0.1);
            }

            .wallet-button:hover {
                transform: scale(1.1) rotate(5deg);
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
            }

            .wallet-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                z-index: 1001;
            }

            .wallet-modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-width: 80%;
                width: 400px;
                white-space: pre-line;
                line-height: 1.6;
            }

            .wallet-close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 20px;
                transition: all 0.3s ease;
            }

            .wallet-close-button:hover {
                transform: scale(1.1);
                background: rgba(0, 0, 0, 0.7);
            }
        `;
        document.head.appendChild(style);
    }

    // 创建按钮
    const button = document.createElement('div');
    button.className = 'wallet-button';
    button.innerHTML = '$';

    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'wallet-modal';

    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'wallet-modal-content';

    // 创建关闭按钮
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    closeButton.className = 'wallet-close-button';

    // 设置弹窗内容文本
    modalContent.textContent = `【香港現貨】 
    1-10盒$100@1
    20盒$80@1 （送1煙機）
    30盒$70$1 （送2煙機）
    另外有一次性 （新客戶優惠）

    另外批發100盒起
    一代通用煙機$75（50部起）
    香港現貨批發商，有需要一起合作 
    香港現貨即日送到！

    指定品牌滿500盒送10機｜先到先得`;

    // 组装弹窗
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // 添加点击事件
    button.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 将元素添加到页面
    document.body.appendChild(button);
    document.body.appendChild(modal);
};

// 当 DOM 加载完成后创建按钮
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWalletButton);
} else {
    // 如果DOM已经加载完毕，立即初始化
    createWalletButton();
} 
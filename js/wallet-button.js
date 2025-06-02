// 创建钱袋按钮
const createWalletButton = () => {
    // 创建按钮
    const button = document.createElement('div');
    button.className = 'wallet-button';
    button.innerHTML = '$';
    button.style.cssText = `
        position: fixed;
        right: 20px;
        bottom: 170px; /* 调整位置，与WhatsApp按钮保持80px间距 */
        width: 60px;
        height: 60px;
        background-color: #FFD700; /* 改为亮金色 */
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 30px;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.4);
        z-index: 1000;
    `;

    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'wallet-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        z-index: 1001;
    `;

    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'wallet-modal-content';
    modalContent.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 80%;
        width: 400px;
        white-space: pre-line;
        line-height: 1.6;
    `;

    // 创建关闭按钮
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
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
    `;

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
document.addEventListener('DOMContentLoaded', createWalletButton); 
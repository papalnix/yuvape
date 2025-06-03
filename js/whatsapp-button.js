// WhatsApp按鈕功能管理
function initWhatsAppButton() {
    // 检查年龄验证状态
    const isAgeVerified = localStorage.getItem('age-verified') === 'true';
    if (!isAgeVerified) {
        return; // 如果未通过年龄验证，不创建按钮
    }

    // 随便写个号码先
    const phoneNumber = '85295849018'; // 香港號碼
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // WhatsApp SVG 图标
    const whatsappSvg = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.4054 3.5946C18.1607 1.35 15.1714 0.0964 11.9946 0.0911C5.4375 0.0911 0.0964 5.4322 0.0911 11.9893C0.0857 14.1161 0.6643 16.1893 1.7518 18.0054L0 24L6.1339 22.2857C7.8857 23.2607 9.9161 23.7804 11.9893 23.7857H11.9946C18.5464 23.7857 23.8929 18.4446 23.8982 11.8875C23.9036 8.7214 22.65 5.7375 20.4054 3.5946ZM11.9946 21.7875C10.2 21.7875 8.4429 21.2893 6.9107 20.3571L6.5518 20.1429L2.8339 21.1607L3.8679 17.5339L3.6268 17.1589C2.5982 15.5625 2.0839 13.7036 2.0893 11.9893C2.0946 6.5357 6.5411 2.0893 12 2.0893C14.6411 2.0946 17.1214 3.1339 18.9857 5.0036C20.85 6.8732 21.8839 9.3589 21.8786 12C21.8732 17.4536 17.4268 21.7875 11.9946 21.7875ZM17.4161 14.5179C17.1214 14.3732 15.6643 13.6554 15.3911 13.5589C15.1179 13.4625 14.9196 13.4143 14.7214 13.7089C14.5232 14.0036 13.95 14.6732 13.7732 14.8714C13.5964 15.0696 13.4196 15.0911 13.125 14.9464C11.3839 14.0786 10.2375 13.3982 9.0857 11.4321C8.7857 10.9071 9.3911 10.9554 9.9536 9.8304C10.05 9.6321 10.0018 9.4607 9.9268 9.3161C9.8518 9.1714 9.2625 7.7143 9.0161 7.125C8.7804 6.5518 8.5393 6.6321 8.3518 6.6214C8.175 6.6107 7.9768 6.6107 7.7786 6.6107C7.5804 6.6107 7.2589 6.6857 6.9857 6.9804C6.7125 7.275 5.9464 7.9929 5.9464 9.45C5.9464 10.9071 6.9964 12.3107 7.1411 12.5089C7.2857 12.7071 9.2518 15.7446 12.2732 17.0143C14.1321 17.8339 14.8714 17.8929 15.8036 17.7429C16.3768 17.6464 17.5607 17.0143 17.8071 16.3286C18.0536 15.6429 18.0536 15.0536 17.9786 14.9304C17.9036 14.8071 17.7054 14.7321 17.4161 14.5179Z"/>
        </svg>
    `;
    
    // 創建WhatsApp按鈕和二維碼彈窗元素
    const fragment = document.createDocumentFragment();
    
    // 创建二维码弹窗
    const qrPopup = document.createElement('div');
    qrPopup.className = 'whatsapp-qr-popup';
    qrPopup.innerHTML = `
        <div class="qr-content">
            <button class="close-btn">×</button>
            <img src="images/qr_code.jpg" alt="WhatsApp QR Code" class="qr-image">
            <button class="direct-open-btn">打開应用</button>
        </div>
    `;
    
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.href = '#';
    whatsappButton.innerHTML = whatsappSvg;
    
    fragment.appendChild(qrPopup);
    fragment.appendChild(whatsappButton);

    // 如果样式不存在才添加
    if (!document.getElementById('whatsapp-float-style')) {
        const style = document.createElement('style');
        style.id = 'whatsapp-float-style';
        style.textContent = `
            .whatsapp-float {
                position: fixed;
                bottom: 90px;
                right: 20px;
                background-color: #25D366;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                cursor: pointer;
                transition: all 0.3s;
                z-index: 1000;
            }

            .whatsapp-float:hover {
                transform: scale(1.1);
            }
            
            .whatsapp-qr-popup {
                position: fixed;
                bottom: 90px;
                right: 90px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 20px;
                display: none;
                z-index: 999;
            }
            
            .whatsapp-qr-popup.active {
                display: block;
            }
            
            .qr-content {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .close-btn {
                position: absolute;
                top: -10px;
                right: -10px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: none;
                background: #d3d3d3;
                color: white;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .qr-image {
                width: 200px;
                height: 200px;
                object-fit: contain;
                margin-bottom: 10px;
            }
            
            .direct-open-btn {
                padding: 8px 16px;
                background: #25D366;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
            }
            
            .direct-open-btn:hover {
                background: #1ea355;
            }
        `;
        fragment.appendChild(style);
    }

    // 一次性添加到文档
    document.head.appendChild(fragment.querySelector('style') || document.createDocumentFragment());
    document.body.appendChild(fragment);

    // 构建 WhatsApp URL
    const whatsappUrl = isMobile
        ? `whatsapp://send?phone=${phoneNumber}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}`;
        
    // 获取相应平台的应用商店链接
    const getAppStoreLink = () => {
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            return 'https://apps.apple.com/app/whatsapp-messenger/id310633997';
        }
        return 'https://play.google.com/store/apps/details?id=com.whatsapp';
    };

    // 處理點擊事件
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        const popup = document.querySelector('.whatsapp-qr-popup');
        popup.classList.add('active');
    });
    
    // 关闭按钮点击事件
    document.querySelector('.close-btn').addEventListener('click', function() {
        document.querySelector('.whatsapp-qr-popup').classList.remove('active');
    });
    
    // 直接打开按钮点击事件
    document.querySelector('.direct-open-btn').addEventListener('click', function() {
        window.location.href = whatsappUrl;
        
        const openTimeout = setTimeout(function() {
            if (document.hasFocus()) {
                if (isMobile) {
                    if (confirm('看起來您還沒有安裝WhatsApp，是否前往下載？')) {
                        window.location.href = getAppStoreLink();
                    }
                } else {
                    window.location.href = 'https://www.whatsapp.com/download';
                }
            }
            clearTimeout(openTimeout);
        }, 1000);
    });
}

// 使用 DOMContentLoaded 确保DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppButton);
} else {
    // 如果DOM已经加载完毕，立即初始化
    initWhatsAppButton();
}
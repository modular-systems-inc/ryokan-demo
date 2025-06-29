// ===================================
// 京の宿 雅 - メインJavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // モバイルナビゲーション
    // ===================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    
    if (navToggle && nav) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // ナビゲーションリンクをクリックしたら閉じる
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    // ===================================
    // ヒーロースライダー
    // ===================================
    const heroSlider = document.getElementById('heroSlider');
    const heroDots = document.getElementById('heroDots');
    
    if (heroSlider && heroDots) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        
        // ドットの作成
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            heroDots.appendChild(dot);
        });
        
        const dots = heroDots.querySelectorAll('.dot');
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            goToSlide(nextIndex);
        }
        
        // 自動スライド（5秒ごと）
        setInterval(nextSlide, 5000);
    }
    
    // ===================================
    // スクロールアニメーション
    // ===================================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // 要素が画面内に入ったらアニメーション開始
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    // 初回実行
    fadeInOnScroll();
    
    // スクロール時に実行
    window.addEventListener('scroll', fadeInOnScroll);
    
    // ===================================
    // スムーススクロール
    // ===================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #だけの場合は処理しない
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // ヘッダーのスクロール制御
    // ===================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 下にスクロール
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===================================
    // フォームバリデーション
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // メールアドレスの確認
            const email = document.getElementById('email').value;
            const emailConfirm = document.getElementById('emailConfirm').value;
            
            if (email !== emailConfirm) {
                alert('メールアドレスが一致しません。');
                return;
            }
            
            // ここで実際の送信処理を行う
            alert('お問い合わせを受け付けました。\n返信まで2〜3営業日お待ちください。');
            contactForm.reset();
        });
    }
    
    // ===================================
    // 予約フォームのステップ制御
    // ===================================
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        // ステップ切り替え関数をグローバルに定義
        window.nextStep = function(step) {
            const currentStep = document.querySelector('.form-step.active');
            const nextStepElement = document.getElementById('step' + step);
            const steps = document.querySelectorAll('.step');
            
            if (currentStep && nextStepElement) {
                // バリデーション
                const inputs = currentStep.querySelectorAll('[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    alert('必須項目を入力してください。');
                    return;
                }
                
                // ステップ切り替え
                currentStep.classList.remove('active');
                nextStepElement.classList.add('active');
                
                // ステップインジケーター更新
                steps.forEach((stepIndicator, index) => {
                    if (index < step) {
                        stepIndicator.classList.add('active');
                    } else {
                        stepIndicator.classList.remove('active');
                    }
                });
                
                // 確認画面の場合、内容を表示
                if (step === 3) {
                    updateConfirmation();
                }
            }
        };
        
        window.prevStep = function(step) {
            const currentStep = document.querySelector('.form-step.active');
            const prevStepElement = document.getElementById('step' + step);
            const steps = document.querySelectorAll('.step');
            
            if (currentStep && prevStepElement) {
                currentStep.classList.remove('active');
                prevStepElement.classList.add('active');
                
                // ステップインジケーター更新
                steps.forEach((stepIndicator, index) => {
                    if (index < step) {
                        stepIndicator.classList.add('active');
                    } else {
                        stepIndicator.classList.remove('active');
                    }
                });
            }
        };
        
        function updateConfirmation() {
            // 確認画面に値を設定
            document.getElementById('confirmCheckin').textContent = document.getElementById('checkinDate').value;
            document.getElementById('confirmCheckout').textContent = document.getElementById('checkoutDate').value;
            
            const adults = document.getElementById('adults').value;
            const children = document.getElementById('children').value;
            let guestText = `大人 ${adults}名`;
            if (children > 0) {
                guestText += `、子供 ${children}名`;
            }
            document.getElementById('confirmGuests').textContent = guestText;
            
            const roomSelect = document.getElementById('roomType');
            document.getElementById('confirmRoom').textContent = roomSelect.options[roomSelect.selectedIndex].text;
            
            const planSelect = document.getElementById('plan');
            document.getElementById('confirmPlan').textContent = planSelect.options[planSelect.selectedIndex].text;
            
            const lastName = document.getElementById('guestLastName').value;
            const firstName = document.getElementById('guestFirstName').value;
            document.getElementById('confirmName').textContent = `${lastName} ${firstName} 様`;
            
            document.getElementById('confirmEmail').textContent = document.getElementById('guestEmail').value;
            document.getElementById('confirmPhone').textContent = document.getElementById('guestPhone').value;
        }
        
        // フォーム送信
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ここで実際の予約処理を行う
            alert('ご予約ありがとうございます。\n確認メールをお送りしました。');
            
            // フォームリセットして最初のステップに戻る
            reservationForm.reset();
            document.querySelector('.form-step.active').classList.remove('active');
            document.getElementById('step1').classList.add('active');
            document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
            document.querySelector('.step').classList.add('active');
        });
    }
    
    // ===================================
    // 日付入力の最小値設定
    // ===================================
    const checkinDate = document.getElementById('checkinDate');
    const checkoutDate = document.getElementById('checkoutDate');
    
    if (checkinDate && checkoutDate) {
        // 今日の日付を最小値に設定
        const today = new Date().toISOString().split('T')[0];
        checkinDate.setAttribute('min', today);
        
        // チェックイン日が変更されたらチェックアウトの最小値を更新
        checkinDate.addEventListener('change', function() {
            const checkin = new Date(this.value);
            checkin.setDate(checkin.getDate() + 1);
            const minCheckout = checkin.toISOString().split('T')[0];
            checkoutDate.setAttribute('min', minCheckout);
            
            // チェックアウト日がチェックイン日より前の場合はリセット
            if (checkoutDate.value && new Date(checkoutDate.value) <= new Date(this.value)) {
                checkoutDate.value = '';
            }
        });
    }
    
    // ===================================
    // 画像の遅延読み込み
    // ===================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserverがサポートされていない場合
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// ===================================
// エラー時のスタイル追加
// ===================================
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #c9302c !important;
    }
`;
document.head.appendChild(style);
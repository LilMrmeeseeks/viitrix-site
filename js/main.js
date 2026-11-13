document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initScrollEffects();
    initVideoLazyLoad();
    initImageLazyLoad();
    initScrollAnimations();
    initCountUp();
    initBenchmarkAnimation();
    initProductSwitcher();
    initZnClawPage();
    initYinianPage();
    initPageLoader();
});

function initZnClawPage() {
    initZnClawThemeToggle();
    initZnClawScrollAnimation();
    initZnClawNavbarScroll();
    initZnClawWechatScenes();
    initZnClawImageModal();
    
    const floatingBtn = document.getElementById('floating-btn');
    if (floatingBtn) {
        window.addEventListener('scroll', function() {
            floatingBtn.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
    }
    
    window.scrollToQRCode = function() {
        const el = document.getElementById('hero-qrcode');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    
    window.scrollToCapability = function() {
        const el = document.getElementById('capability');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    window.scrollToContact = function() {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
}

function initZnClawWechatScenes() {
    const scenes = [1, 2, 3];
    
    scenes.forEach(function(sceneId) {
        setTimeout(function() {
            const chatId = 'wechat-chat' + (sceneId > 1 ? '-' + sceneId : '');
            const chatContainer = document.getElementById(chatId);
            if (chatContainer && chatContainer.getBoundingClientRect().top < window.innerHeight) {
                initZnClawWechatScene(sceneId);
            }
        }, 500);
        
        const observerKey = 'wechatObserver' + sceneId;
        window[observerKey] = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    initZnClawWechatScene(sceneId);
                }
            });
        }, { threshold: 0.3 });
        
        const chatId = 'wechat-chat' + (sceneId > 1 ? '-' + sceneId : '');
        const chatContainer = document.getElementById(chatId);
        if (chatContainer) {
            window[observerKey].observe(chatContainer);
        }
    });
}

function initZnClawWechatScene(sceneId) {
    const playedFlag = 'wechatScene' + sceneId + 'HasPlayed';
    if (window[playedFlag]) return;
    window[playedFlag] = true;
    
    const containerSuffix = sceneId > 1 ? '-' + sceneId : '';
    const messagesContainer = document.getElementById('wechat-messages-container' + containerSuffix);
    const typingIndicator = document.getElementById('wechat-typing' + containerSuffix);
    
    if (!messagesContainer) return;
    
    messagesContainer.scrollTop = 0;
    
    const updateScrollHint = function() {
        const scrollHint = messagesContainer.querySelector('.scroll-hint');
        if (scrollHint) {
            scrollHint.style.opacity = messagesContainer.scrollHeight > messagesContainer.clientHeight ? '1' : '0';
        }
    };
    
    messagesContainer.addEventListener('scroll', function() {
        const scrollHint = messagesContainer.querySelector('.scroll-hint');
        if (scrollHint) {
            scrollHint.style.opacity = messagesContainer.scrollTop < messagesContainer.scrollHeight - messagesContainer.clientHeight - 20 ? '1' : '0';
        }
    });
    
    const messageElements = messagesContainer.querySelectorAll('.wechat-message');
    let userMessageCount = 0;
    
    let firstBotDelay = Infinity;
    messageElements.forEach(function(el) {
        if (el.classList.contains('wechat-message-bot')) {
            const delay = parseFloat(el.dataset.delay);
            if (delay >= 0 && delay < firstBotDelay) {
                firstBotDelay = delay;
            }
        }
    });
    
    messageElements.forEach(function(el) {
        const delay = parseFloat(el.dataset.delay);
        if (delay >= 0) {
            setTimeout(function() {
                el.classList.add('animate');
                setTimeout(updateScrollHint, 600);
                
                if (el.classList.contains('wechat-message-user')) {
                    userMessageCount++;
                    if (userMessageCount === 2) {
                        const typingShowDelay = 500;
                        const typingHideDelay = (firstBotDelay - delay) * 1000 - 300;
                        
                        setTimeout(function() {
                            if (typingIndicator) {
                                typingIndicator.style.opacity = '1';
                            }
                        }, typingShowDelay);
                        setTimeout(function() {
                            if (typingIndicator) {
                                typingIndicator.style.opacity = '0';
                            }
                        }, typingHideDelay);
                    }
                }
            }, delay * 1000);
        }
    });
}

function initZnClawImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    
    if (!modal || !modalImg) return;
    
    window.openImageModal = function(src) {
        modalImg.src = src;
        modal.classList.add('open');
    };
    
    window.closeImageModal = function() {
        modal.classList.remove('open');
    };
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

function initYinianPage() {
    initYinianThemeToggle();
    initYinianScrollAnimation();
    initYinianNavbarScroll();
    initYinianFloatingButton();
    initYinianWechatScenes();
    initYinianImageModal();
}

function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }, 800);
}

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const themeIconLight = document.getElementById('theme-icon-light');
    const mobileThemeIconDark = document.getElementById('mobile-theme-icon-dark');
    const mobileThemeIconLight = document.getElementById('mobile-theme-icon-light');

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isDark = !document.body.classList.contains('light-theme');
        
        if (themeIconDark && themeIconLight) {
            themeIconDark.classList.toggle('hidden', !isDark);
            themeIconLight.classList.toggle('hidden', isDark);
        }
        if (mobileThemeIconDark && mobileThemeIconLight) {
            mobileThemeIconDark.classList.toggle('hidden', !isDark);
            mobileThemeIconLight.classList.toggle('hidden', isDark);
        }
        
        if (typeof window !== 'undefined') {
            localStorage.setItem('viitrix-theme', isDark ? 'dark' : 'light');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeBtn) {
        mobileThemeBtn.addEventListener('click', toggleTheme);
    }

    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('viitrix-theme') : 'dark';
    if (savedTheme === 'light') {
        toggleTheme();
    }
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdownBtn = document.getElementById('mobile-dropdown-btn');
    const mobileDropdownContent = document.getElementById('mobile-dropdown-content');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileDropdownBtn && mobileDropdownContent) {
        mobileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdownContent.classList.toggle('hidden');
        });
    }
}

function initScrollEffects() {
    let lastScrollY = window.scrollY;
    const nav = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (nav) {
            if (currentScrollY > 50) {
                nav.classList.add('backdrop-blur-xl', 'border-b');
            } else {
                nav.classList.remove('backdrop-blur-xl', 'border-b');
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

function initVideoLazyLoad() {
    const videos = document.querySelectorAll('video[data-src]');
    
    if (!videos.length) {
        initVideoPlayers();
        return;
    }

    const loadVideo = (video) => {
        const sources = video.querySelectorAll('source[data-src]');
        sources.forEach(source => {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
        });
        video.removeAttribute('data-src');
        video.load();
        
        if (video.hasAttribute('autoplay')) {
            video.play().catch(() => {});
        }
    };

    const heroVideos = ['hero-video-dark', 'hero-video-white'];
    heroVideos.forEach(id => {
        const video = document.getElementById(id);
        if (video && video.hasAttribute('data-src')) {
            loadVideo(video);
        }
    });

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                loadVideo(video);
                observer.unobserve(video);
            }
        });
    }, {
        rootMargin: '300px 0px',
        threshold: 0.05
    });

    videos.forEach(video => {
        if (!heroVideos.includes(video.id)) {
            videoObserver.observe(video);
        }
    });

    setTimeout(() => {
        initVideoPlayers();
    }, 500);
}

function initVideoPlayers() {
    function setupVideoPlayer(videoId, playBtnId, captionId) {
        const video = document.getElementById(videoId);
        const playBtn = document.getElementById(playBtnId);
        const caption = document.getElementById(captionId);

        if (!video || !playBtn) return;

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play().catch(e => console.error('Video play failed:', e));
            } else {
                video.pause();
            }
        });

        video.addEventListener('pause', () => {
            playBtn.style.opacity = '1';
            if (caption) caption.style.opacity = '1';
        });

        video.addEventListener('play', () => {
            playBtn.style.opacity = '0';
            if (caption) caption.style.opacity = '0';
        });
    }

    setupVideoPlayer('benchmark-video', 'benchmark-play-btn', 'benchmark-video-caption');
    setupVideoPlayer('company-video', 'company-play-btn');
    setupVideoPlayer('product-video', 'product-play-btn');
}

function initImageLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (!lazyImages.length) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.srcset = img.dataset.srcset || '';
                img.classList.remove('lazy-image');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '150px 0px',
        threshold: 0.01
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

function initScrollAnimations() {
    const animateOnScroll = (selector, animationClass, threshold = 0.3) => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll('.diff-col-sim', 'animate');
    animateOnScroll('.diff-col-theory', 'animate');
    animateOnScroll('.diff-col-viitrix', 'animate');
    animateOnScroll('.data-card', 'animate');
    animateOnScroll('.timeline-node', 'animate');
    animateOnScroll('.narrative-card', 'animate');
    animateOnScroll('.trust-card', 'animate');
    animateOnScroll('.product-card', 'animate');
    animateOnScroll('.core-col-sim', 'animate');
    animateOnScroll('.core-col-theory', 'animate');
    animateOnScroll('.core-col-viitrix', 'animate');
    animateOnScroll('.fade-in-up', 'visible');
}

function initCountUp() {
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.data-value').forEach(el => {
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 1500;
                    const startTime = Date.now();

                    function update() {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(target * easeOutQuart);

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }

                    update();
                });
                countUpObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    if (document.querySelector('.data-value')) {
        countUpObserver.observe(document.querySelector('.data-value').parentElement.parentElement.parentElement);
    }
}

function initNarrativeAnimation() {
    const narrativeSection = document.getElementById('abstract-narrative');
    if (!narrativeSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.narrative-title')?.classList.add('animate');
                document.querySelector('.narrative-subtitle')?.classList.add('animate');
                document.querySelector('.narrative-card-1')?.classList.add('animate');
                document.querySelector('.narrative-card-2')?.classList.add('animate');
                document.querySelector('.narrative-card-3')?.classList.add('animate');
                document.querySelector('.narrative-connector-1')?.classList.add('animate');
                document.querySelector('.narrative-connector-2')?.classList.add('animate');
                observer.disconnect();
            }
        });
    }, { threshold: 0.2, rootMargin: '-50px' });

    observer.observe(narrativeSection);
}

function initCoreTechHover() {
    const viitrixCol = document.querySelector('.core-col-viitrix');
    const simCol = document.querySelector('.core-col-sim');
    const theoryCol = document.querySelector('.core-col-theory');

    if (!viitrixCol) return;

    viitrixCol.addEventListener('mouseenter', () => {
        if (simCol) simCol.style.opacity = '0.4';
        if (theoryCol) theoryCol.style.opacity = '0.4';

        const dataFlowContainer = document.createElement('div');
        dataFlowContainer.className = 'data-flow-container';
        dataFlowContainer.style.position = 'absolute';
        dataFlowContainer.style.inset = '0';
        dataFlowContainer.style.pointerEvents = 'none';
        dataFlowContainer.style.overflow = 'hidden';

        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'data-flow-line';
            line.style.top = `${30 + i * 20}%`;
            line.style.animationDelay = `${i * 0.8}s`;
            dataFlowContainer.appendChild(line);
        }

        viitrixCol.appendChild(dataFlowContainer);
    });

    viitrixCol.addEventListener('mouseleave', () => {
        if (simCol) simCol.style.opacity = '0.6';
        if (theoryCol) theoryCol.style.opacity = '0.6';

        const dataFlowContainer = viitrixCol.querySelector('.data-flow-container');
        if (dataFlowContainer) {
            dataFlowContainer.remove();
        }
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const type = formData.get('type');

        if (!name || !email || !type) {
            alert('请填写必填项');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = '提交成功';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = '提交';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

function initWechatChat() {
    const chatMessages = document.querySelectorAll('.wechat-message');
    const messagesContainer = document.querySelector('.wechat-messages');
    
    if (!chatMessages.length || !messagesContainer) return;

    chatMessages.forEach((msg, index) => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }, 300 + index * 400);
    });
}

function openImageModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    
    if (!modal || !modalImg) return;
    
    modalImg.src = src;
    modal.style.display = 'flex';
    
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function initYinianThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon = document.getElementById('theme-icon-sun');
    const body = document.body;
    
    if (!toggle) return;
    
    toggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            moonIcon?.classList.add('hidden');
            sunIcon?.classList.remove('hidden');
        } else {
            moonIcon?.classList.remove('hidden');
            sunIcon?.classList.add('hidden');
        }
    });
}

function initYinianScrollAnimation() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.yinian-fade-in-up').forEach(function(el) { observer.observe(el); });
}

function initYinianNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('yinian-nav-scrolled', window.scrollY > 50);
    }, { passive: true });
}

function initYinianFloatingButton() {
    const floatingBtn = document.getElementById('floating-btn');
    if (!floatingBtn) return;
    
    window.addEventListener('scroll', function() {
        floatingBtn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
}

function initYinianWechatScene(sceneId) {
    const playedFlag = 'yinianWechatScene' + sceneId + 'HasPlayed';
    if (window[playedFlag]) return;
    window[playedFlag] = true;
    
    const containerSuffix = sceneId > 1 ? '-' + sceneId : '';
    const messagesContainer = document.getElementById('wechat-messages-container' + containerSuffix);
    const typingIndicator = document.getElementById('wechat-typing' + containerSuffix);
    
    if (!messagesContainer) return;
    
    messagesContainer.scrollTop = 0;
    
    const updateScrollHint = function() {
        const scrollHint = messagesContainer.querySelector('.yinian-scroll-hint');
        if (scrollHint) {
            scrollHint.style.opacity = messagesContainer.scrollHeight > messagesContainer.clientHeight ? '1' : '0';
        }
    };
    
    messagesContainer.addEventListener('scroll', function() {
        const scrollHint = messagesContainer.querySelector('.yinian-scroll-hint');
        if (scrollHint) {
            scrollHint.style.opacity = messagesContainer.scrollTop < messagesContainer.scrollHeight - messagesContainer.clientHeight - 20 ? '1' : '0';
        }
    });
    
    const messageElements = messagesContainer.querySelectorAll('.yinian-wechat-message');
    
    let firstBotDelay = Infinity;
    messageElements.forEach(function(el) {
        if (el.classList.contains('yinian-wechat-message-bot')) {
            const delay = parseFloat(el.dataset.delay);
            if (delay >= 0 && delay < firstBotDelay) {
                firstBotDelay = delay;
            }
        }
    });
    
    messageElements.forEach(function(el) {
        const delay = parseFloat(el.dataset.delay);
        if (delay >= 0) {
            setTimeout(function() {
                el.classList.add('animate');
                setTimeout(updateScrollHint, 600);
                
                if (el.classList.contains('yinian-wechat-message-user')) {
                    const typingShowDelay = 500;
                    const typingHideDelay = (firstBotDelay - delay) * 1000 - 300;
                    
                    setTimeout(function() {
                        if (typingIndicator) {
                            typingIndicator.style.opacity = '1';
                        }
                    }, typingShowDelay);
                    setTimeout(function() {
                        if (typingIndicator) {
                            typingIndicator.style.opacity = '0';
                        }
                    }, typingHideDelay);
                }
            }, delay * 1000);
        }
    });
}

function initYinianWechatScenes() {
    const scenes = [1, 2, 3];
    
    scenes.forEach(function(sceneId) {
        setTimeout(function() {
            const chatId = 'wechat-chat' + (sceneId > 1 ? '-' + sceneId : '');
            const chatContainer = document.getElementById(chatId);
            if (chatContainer && chatContainer.getBoundingClientRect().top < window.innerHeight) {
                initYinianWechatScene(sceneId);
            }
        }, 500);
        
        const observerKey = 'yinianWechatObserver' + sceneId;
        window[observerKey] = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    initYinianWechatScene(sceneId);
                }
            });
        }, { threshold: 0.3 });
        
        const chatId = 'wechat-chat' + (sceneId > 1 ? '-' + sceneId : '');
        const chatContainer = document.getElementById(chatId);
        if (chatContainer) {
            window[observerKey].observe(chatContainer);
        }
    });
}

function initYinianImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    
    if (!modal || !modalImg) return;
    
    window.openImageModal = function(src) {
        modalImg.src = src;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeImageModal = function() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

function initZnClawThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('theme-icon-moon');
    const sunIcon = document.getElementById('theme-icon-sun');
    const body = document.body;
    
    if (!toggle) return;
    
    toggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            moonIcon?.classList.add('hidden');
            sunIcon?.classList.remove('hidden');
        } else {
            moonIcon?.classList.remove('hidden');
            sunIcon?.classList.add('hidden');
        }
    });
}

function initZnClawScrollAnimation() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.znclaw-fade-in-up').forEach(function(el) { observer.observe(el); });
}

function initZnClawNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('znclaw-nav-scrolled', window.scrollY > 50);
    }, { passive: true });
}

function initZnClawImageCompare() {
    const sliders = document.querySelectorAll('.znclaw-image-compare-slider');
    
    sliders.forEach(function(slider) {
        const container = slider.parentElement;
        const beforeImg = container.querySelector('.znclaw-before-img');
        
        if (!beforeImg) return;
        
        let isDragging = false;
        
        const updatePosition = function(x) {
            const rect = container.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
            slider.style.left = percent + '%';
            beforeImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
        };
        
        slider.addEventListener('mousedown', function(e) {
            isDragging = true;
            updatePosition(e.clientX);
        });
        
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                updatePosition(e.clientX);
            }
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        slider.addEventListener('touchstart', function(e) {
            isDragging = true;
            updatePosition(e.touches[0].clientX);
        });
        
        document.addEventListener('touchmove', function(e) {
            if (isDragging) {
                updatePosition(e.touches[0].clientX);
            }
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    });
}

function initBenchmarkAnimation() {
    const benchmarkSection = document.querySelector('#benchmark');
    if (!benchmarkSection) return;

    const benchmarkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nodes = document.querySelectorAll('.benchmark-node');
                const video = document.querySelector('.benchmark-video');
                const countUp = document.querySelector('.count-up');
                
                nodes.forEach((node, index) => {
                    setTimeout(() => node.classList.add('animate'), index * 200);
                });
                
                setTimeout(() => video.classList.add('animate'), 300);
                
                if (countUp) {
                    const target = parseInt(countUp.getAttribute('data-target'));
                    const duration = 1500;
                    const startTime = Date.now();
                    
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        countUp.textContent = Math.round(target * easeOut) + '%';
                        
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    animate();
                }
                
                benchmarkObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    benchmarkObserver.observe(benchmarkSection);
}

function initProductSwitcher() {
    const products = {
        zn04: {
            series: '边缘视觉',
            title: 'AGI Box·通用视觉智能终端',
            subtitle: '通用视觉智能体',
            keywords: ['边缘计算', 'CV沙盒', '场景落地'],
            intro: '基于边缘视觉AI芯片的轻量级智能终端，4-10 TOPS算力，搭载MaM-GPT边缘世界模型，即插即用，5分钟极速部署。',
            sceneBg: 'images/zn04-scene-bg.jpg',
            productImg: 'images/zn04-product.png',
            color: '#0088cc',
            accentColor: '#ff6b35',
            experienceLink: 'zn-claw.html'
        },
        yinian: {
            series: '文化智能',
            title: 'AGI Box·一念陪伴智能终端',
            subtitle: 'AI文化创意助手',
            keywords: ['AIGC', '文化IP', '创意生成'],
            intro: '基于MaM-GPT的文化创意智能体，融合传统文化与现代AI技术，提供祈福、文创、艺术创作等多元文化体验。',
            sceneBg: 'images/yinian-scene-bg.jpg',
            productImg: 'images/yinian-product.png',
            color: '#D4A574',
            accentColor: '#D4A574',
            experienceLink: 'yinian.html'
        },
        agibox: {
            series: '边缘计算',
            title: 'AGI-BOX Ultra',
            subtitle: '边缘智能计算盒',
            keywords: ['大模型', '边缘部署', '私有化'],
            intro: '集成大模型推理引擎的边缘计算盒，支持私有化部署，满足企业级AI应用需求，兼顾性能与隐私安全。',
            sceneBg: 'images/agi-box-scene-bg.jpg',
            productImg: 'images/agi-box-product.png',
            color: '#ff6b35',
            accentColor: '#ff6b35',
            experienceLink: '#'
        },
        llmbox: {
            series: '大模型',
            title: '大模型一体机',
            subtitle: '企业级AI基础设施',
            keywords: ['大模型', '训练推理', '企业级'],
            intro: '面向企业的大模型训练与推理一体机，集成GPU集群与优化软件栈，支持多模态大模型的全流程开发部署。',
            sceneBg: 'images/llm-scene-bg.jpg',
            productImg: 'images/llm-product.png',
            color: '#22c55e',
            accentColor: '#22c55e',
            experienceLink: '#'
        }
    };

    let currentProduct = 'zn04';

    window.switchProduct = function(productId, animate = false) {
        const product = products[productId];
        if (!product) return;

        currentProduct = productId;

        document.querySelectorAll('.thumbnail').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.product === productId) {
                el.classList.add('active');
            }
        });

        const seriesEl = document.getElementById('product-series');
        const titleEl = document.getElementById('product-title');
        const subtitleEl = document.getElementById('product-subtitle');
        const keywordsEl = document.getElementById('product-keywords');
        const introEl = document.getElementById('product-intro');
        const sceneBgEl = document.getElementById('scene-bg');
        const productImgEl = document.getElementById('product-img');

        if (!seriesEl || !titleEl || !subtitleEl || !keywordsEl || !introEl || !sceneBgEl || !productImgEl) return;

        if (animate) {
            seriesEl.style.opacity = '0';
            titleEl.style.opacity = '0';
            subtitleEl.style.opacity = '0';
            keywordsEl.style.opacity = '0';
            introEl.style.opacity = '0';
            sceneBgEl.style.opacity = '0';
            productImgEl.style.opacity = '0';

            setTimeout(() => {
                seriesEl.textContent = product.series;
                seriesEl.style.color = product.color;
                titleEl.textContent = product.title;
                subtitleEl.textContent = product.subtitle;
                introEl.textContent = product.intro;

                keywordsEl.innerHTML = product.keywords.map(k => 
                    `<span class="text-xs rounded px-2 py-1" style="background: rgba(0,0,0,0.02); color: var(--text-secondary);">${k}</span>`
                ).join('');

                sceneBgEl.src = product.sceneBg;
                productImgEl.src = product.productImg;

                seriesEl.style.opacity = '1';
                titleEl.style.opacity = '1';
                subtitleEl.style.opacity = '1';
                keywordsEl.style.opacity = '1';
                introEl.style.opacity = '1';
                sceneBgEl.style.opacity = '1';
                productImgEl.style.opacity = '1';

                if (productId === 'agibox') {
                    productImgEl.classList.add('agibox-glow');
                } else {
                    productImgEl.classList.remove('agibox-glow');
                }
            }, 200);
        } else {
            seriesEl.textContent = product.series;
            seriesEl.style.color = product.color;
            titleEl.textContent = product.title;
            subtitleEl.textContent = product.subtitle;
            introEl.textContent = product.intro;

            keywordsEl.innerHTML = product.keywords.map(k =>
                `<span class="text-xs rounded px-2 py-1" style="background: rgba(0,0,0,0.02); color: var(--text-secondary);">${k}</span>`
            ).join('');

            sceneBgEl.src = product.sceneBg;
            productImgEl.src = product.productImg;

            if (productId === 'agibox') {
                productImgEl.classList.add('agibox-glow');
            } else {
                productImgEl.classList.remove('agibox-glow');
            }
        }
    };

    window.toggleProductDetails = function() {
        const expansion = document.getElementById('details-expansion');
        const btn = document.getElementById('btn-details');
        
        if (!expansion || !btn) return;
        
        if (expansion.style.maxHeight === '1000px') {
            expansion.style.maxHeight = '0';
            expansion.style.opacity = '0';
            btn.textContent = '了解详情';
        } else {
            expansion.style.maxHeight = '1000px';
            expansion.style.opacity = '1';
            btn.textContent = '收起';
        }
    };
}
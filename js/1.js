/**
 * Main JavaScript File - Portfolio Interactive
 * Đáp ứng Tiêu chí 13 (DOM, Event), 14 (darkmode, mobile menu, project filter, scroll-to-top), 15 (Validation Form)
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Navigation Toggle (Tiêu chí 14)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Đóng menu khi bấm vào từng item
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Chức năng Dark Mode Toggle (Tiêu chí 14, 19)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            let theme = 'light';

            if (document.body.classList.contains('dark-theme')) {
                theme = 'dark';
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 3. Chức năng Lọc Dự Án (Project Filter - Tiêu chí 14)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 4. Scroll To Top Button (Tiêu chí 14)
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn?.classList.add('show');
        } else {
            scrollTopBtn?.classList.remove('show');
        }
    });

    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Kiểm tra tính hợp lệ Form Liên hệ (Form Validation - Tiêu chí 15)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            const formSuccess = document.getElementById('form-success');

            // Reset thông báo lỗi
            nameError.textContent = '';
            emailError.textContent = '';
            messageError.textContent = '';
            formSuccess.textContent = '';

            // Validate Name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Vui lòng nhập họ và tên.';
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Vui lòng nhập email.';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailError.textContent = 'Email không hợp lệ.';
                isValid = false;
            }

            // Validate Message
            if (!messageInput.value.trim()) {
                messageError.textContent = 'Vui lòng nhập nội dung tin nhắn.';
                isValid = false;
            }

            // Nếu hợp lệ
            if (isValid) {
                formSuccess.textContent = 'Gửi tin nhắn thành công! Tôi sẽ phản hồi sớm nhất.';
                contactForm.reset();
            }
        });
    }
});
// Profile Dashboard Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize profile interactions
    initializeProfileInteractions();

    // Initialize form handling
    initializeFormHandling();

    // Add entrance animations
    addEntranceAnimations();
}



// Profile Interactions
function initializeProfileInteractions() {
    // Follow button functionality
    const followBtn = document.querySelector('.btn-follow');
    if (followBtn) {
        let isFollowing = false;
        
        followBtn.addEventListener('click', function() {
            isFollowing = !isFollowing;
            
            if (isFollowing) {
                this.textContent = 'Following';
                this.style.backgroundColor = '#10b981';
                showNotification('You are now following V.ROOPAK!', 'success');
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = '#3b82f6';
                showNotification('You have unfollowed V.ROOPAK', 'info');
            }
        });
    }
    
    // Message button functionality
    const messageBtn = document.querySelector('.btn-message');
    if (messageBtn) {
        messageBtn.addEventListener('click', function() {
            const email = 'roopak.v2025@vitstudent.com';
            const subject = encodeURIComponent('Message from Profile Dashboard');
            const body = encodeURIComponent('Hi V.ROOPAK,\n\nI saw your profile and would like to connect.\n\nBest regards');
            
            window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
            showNotification('Opening email client...', 'info');
        });
    }
    
    // Social links functionality
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href || this.href === '#') {
                e.preventDefault();
                showNotification('Social link coming soon!', 'info');
            }
        });
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            showNotification('Hello from V.ROOPAK! 👋', 'info');
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
}

// Form Handling
function initializeFormHandling() {
    const form = document.querySelector('.user-form');
    
    if (form) {
        // Add input validation
        const inputs = form.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
    }
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    // Remove previous validation classes
    input.classList.remove('valid', 'invalid');
    
    if (input.hasAttribute('readonly')) return;
    
    let isValid = true;
    
    // Basic validation
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (type === 'tel') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        isValid = phoneRegex.test(value) && value.length >= 10;
    } else if (value.length === 0) {
        isValid = false;
    }
    
    input.classList.add(isValid ? 'valid' : 'invalid');
}



// Notification System
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set styles based on type
    let bgColor = '#3b82f6';
    let textColor = 'white';
    
    switch(type) {
        case 'success':
            bgColor = '#10b981';
            break;
        case 'error':
            bgColor = '#ef4444';
            break;
        case 'warning':
            bgColor = '#f59e0b';
            break;
        case 'info':
        default:
            bgColor = '#3b82f6';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${bgColor};
        color: ${textColor};
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-family: var(--font-family-base);
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Entrance Animations
function addEntranceAnimations() {
    const animatedElements = [
        '.sidebar',
        '.user-details-card',
        '.about-section'
    ];
    
    animatedElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 150 * (index + 1));
        }
    });
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Enter key on profile image
    if (e.key === 'Enter' && e.target.classList.contains('profile-image')) {
        e.target.click();
    }
});

// Skills interaction
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('skill-tag')) {
        const skill = e.target.textContent;
        showNotification(`Great choice! ${skill} is a valuable skill.`, 'success');
        
        // Add a temporary highlight effect
        e.target.style.transform = 'scale(1.1)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Load saved data on page load
window.addEventListener('load', function() {
    // Add CSS for form validation
    const style = document.createElement('style');
    style.textContent = `
        .form-control.valid {
            border-color: #10b981;
        }

        .form-control.invalid {
            border-color: #ef4444;
        }

        .skill-tag {
            cursor: pointer;
        }

        .profile-image {
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }

        .notification {
            animation: pulse 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

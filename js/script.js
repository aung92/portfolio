/**
 * Aung Ching Prue Marma - Portfolio Script
 * Handles dark mode, experience calculation, typewriter, clock, and interactions
 */

// ========================================
// DARK MODE
// ========================================
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (isDark) {
        document.documentElement.classList.add('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========================================
// EXPERIENCE CALCULATION
// ========================================
const link3Start = new Date(2024, 6, 1);
const link3End = new Date(2025, 11, 31);
const bluenetStart = new Date(2025, 11, 13);

function formatDuration(startDate, endDate) {
    const end = endDate || new Date();
    let years = end.getFullYear() - startDate.getFullYear();
    let months = end.getMonth() - startDate.getMonth();
    let days = end.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const parts = [];
    if (years > 0) parts.push(years + " Year" + (years > 1 ? 's' : ''));
    if (months > 0) parts.push(months + " Month" + (months > 1 ? 's' : ''));
    if (days > 0 && years === 0 && months === 0) parts.push(days + " Day" + (days > 1 ? 's' : ''));
    
    return parts.length ? parts.join(' ') : 'Less than a month';
}

function calculateTotalExperience() {
    const now = new Date();
    let totalMonths = (link3End.getFullYear() - link3Start.getFullYear()) * 12 + (link3End.getMonth() - link3Start.getMonth()) + 1;
    let bluenetMonths = (now.getFullYear() - bluenetStart.getFullYear()) * 12 + (now.getMonth() - bluenetStart.getMonth());
    
    if (now.getDate() < bluenetStart.getDate() && bluenetMonths > 0) {
        bluenetMonths--;
    }
    if (bluenetMonths < 0) bluenetMonths = 0;
    
    totalMonths += bluenetMonths;
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (years > 0 && months > 0) {
        return years + " Year" + (years > 1 ? 's' : '') + " " + months + " Month" + (months > 1 ? 's' : '');
    }
    if (years > 0) {
        return years + " Year" + (years > 1 ? 's' : '');
    }
    return months + " Month" + (months > 1 ? 's' : '');
}

function updateAllDurations() {
    const link3Elem = document.getElementById('link3Duration');
    const bluenetElem = document.getElementById('bluenetDuration');
    const totalExpElem = document.getElementById('totalExpDisplay');
    const expTextElem = document.getElementById('expText');
    const expYearsElem = document.getElementById('expYears');
    
    if (link3Elem) link3Elem.innerHTML = '⏱️ Duration: ' + formatDuration(link3Start, link3End);
    if (bluenetElem) bluenetElem.innerHTML = '⏱️ Duration: ' + formatDuration(bluenetStart) + ' (Ongoing)';
    
    const totalExp = calculateTotalExperience();
    if (totalExpElem) totalExpElem.textContent = totalExp;
    if (expTextElem) expTextElem.innerHTML = '🎯 ' + totalExp + ' Experience';
    if (expYearsElem) expYearsElem.textContent = totalExp;
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
const phrases = ["Technical Support Specialist", "Customer Success Professional", "Live Chat Expert", "ISP Support Specialist"];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeEffect() {
    if (!typeEl) return;
    const current = phrases[phraseIdx];
    
    if (isDeleting) {
        typeEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(typeEffect, 300);
            return;
        }
        setTimeout(typeEffect, 50);
    } else {
        typeEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 80);
    }
}

// ========================================
// ONLINE AVAILABILITY
// ========================================
function updateAvailability() {
    const now = new Date();
    const bdTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    const day = bdTime.getUTCDay();
    const hours = bdTime.getUTCHours();
    const mins = bdTime.getUTCMinutes();
    const current = hours * 60 + mins;
    
    let isOnline = false;
    let rangeText = "";
    
    if (day >= 0 && day <= 4) {
        isOnline = (current >= 540 && current <= 1260);
        rangeText = "Sun-Thu, 9AM-9PM (BST)";
    } else if (day === 5) {
        isOnline = (current >= 540 && current <= 840);
        rangeText = "Friday, 9AM-2PM (BST)";
    } else {
        isOnline = false;
        rangeText = "Saturday (Closed)";
    }
    
    const dot = document.getElementById('statusDot');
    const status = document.getElementById('statusText');
    const rangeSpan = document.getElementById('timeRange');
    
    if (dot && status) {
        if (isOnline) {
            dot.style.background = "#22c55e";
            status.textContent = "Online Now";
        } else {
            dot.style.background = "#ef4444";
            status.textContent = "Offline";
        }
    }
    if (rangeSpan) rangeSpan.textContent = rangeText;
}

// ========================================
// BANGLADESH TIME CLOCK
// ========================================
function updateClock() {
    const now = new Date();
    const bd = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    let hours = bd.getUTCHours();
    const mins = bd.getUTCMinutes().toString().padStart(2, '0');
    const secs = bd.getUTCSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    const timeElem = document.getElementById('bdTime');
    if (timeElem) timeElem.textContent = hours + ':' + mins + ':' + secs + ' ' + ampm;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateElem = document.getElementById('bdDate');
    if (dateElem) {
        dateElem.textContent = days[bd.getUTCDay()] + ', ' + bd.getUTCDate() + ' ' + months[bd.getUTCMonth()] + ' ' + bd.getUTCFullYear();
    }
}

// ========================================
// SPOTLIGHT EFFECT
// ========================================
function initSpotlight() {
    const wrapper = document.querySelector('.image-wrapper');
    const spot = document.querySelector('.spotlight');
    
    if (wrapper && spot) {
        wrapper.addEventListener('mousemove', function(e) {
            const rect = wrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            spot.style.setProperty('--x', x + '%');
            spot.style.setProperty('--y', y + '%');
        });
    }
}

// ========================================
// CLICKABLE LOGO
// ========================================
function initLogo() {
    const logo = document.getElementById('logoClickable');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHORS
// ========================================
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "#contact" || href === "#skills" || href === "#experience") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initNavbarScroll();
    initBackToTop();
    updateAllDurations();
    updateAvailability();
    typeEffect();
    updateClock();
    initSpotlight();
    initLogo();
    initSmoothScroll();
    
    setInterval(updateClock, 1000);
    setInterval(updateAvailability, 60000);
    setInterval(updateAllDurations, 86400000);
    
    console.log('Portfolio initialized successfully');
});
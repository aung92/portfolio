/**
 * Aung Ching Prue Marma - Portfolio Script
 * Handles typewriter effect, experience calculation, online status, animations, and dark/light mode
 */

// ========================================
// THEME MANAGEMENT (Dark/Light Mode)
// ========================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Check for saved theme preference or system preference
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.classList.add('dark-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
}

// ========================================
// EXPERIENCE CALCULATION (Auto-updating)
// ========================================
const link3Start = new Date(2024, 6, 1);      // July 1, 2024
const link3End = new Date(2025, 11, 31);      // December 31, 2025
const bluenetStart = new Date(2025, 11, 13);  // December 13, 2025

function formatDuration(startDate, endDate = null) {
    const end = endDate || new Date();
    let years = end.getFullYear() - startDate.getFullYear();
    let months = end.getMonth() - startDate.getMonth();
    let days = end.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const parts = [];
    if (years > 0) parts.push(`${years} Year${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} Month${months > 1 ? 's' : ''}`);
    if (days > 0 && years === 0 && months === 0) parts.push(`${days} Day${days > 1 ? 's' : ''}`);
    
    return parts.join(' ') || 'Less than a month';
}

function calculateTotalExperience() {
    const now = new Date();
    let totalMonths = 0;
    
    // Link3 duration (fixed: July 1, 2024 to Dec 31, 2025)
    const link3Months = (link3End.getFullYear() - link3Start.getFullYear()) * 12 + 
                        (link3End.getMonth() - link3Start.getMonth()) + 1;
    totalMonths += link3Months;
    
    // Bluenet duration (ongoing: Dec 13, 2025 to present)
    let bluenetMonths = (now.getFullYear() - bluenetStart.getFullYear()) * 12 + 
                        (now.getMonth() - bluenetStart.getMonth());
    
    const bluenetDayDiff = now.getDate() - bluenetStart.getDate();
    if (bluenetDayDiff < 0 && bluenetMonths > 0) {
        bluenetMonths--;
    }
    if (bluenetMonths < 0) bluenetMonths = 0;
    
    totalMonths += bluenetMonths;
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    if (years > 0 && months > 0) {
        return `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''}`;
    }
    if (years > 0) {
        return `${years} Year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
        return `${months} Month${months > 1 ? 's' : ''}`;
    }
    return 'Less than a month';
}

function updateAllDurations() {
    const link3DurationElem = document.getElementById('link3Duration');
    if (link3DurationElem) {
        link3DurationElem.innerHTML = `⏱️ Duration: ${formatDuration(link3Start, link3End)}`;
    }
    
    const bluenetDurationElem = document.getElementById('bluenetDuration');
    if (bluenetDurationElem) {
        bluenetDurationElem.innerHTML = `⏱️ Duration: ${formatDuration(bluenetStart)} (Ongoing)`;
    }
    
    const totalExp = calculateTotalExperience();
    
    const totalExpDisplay = document.getElementById('totalExpDisplay');
    const expTextSpan = document.getElementById('expText');
    const expYearsSpan = document.getElementById('expYears');
    
    if (totalExpDisplay) totalExpDisplay.textContent = totalExp;
    if (expTextSpan) expTextSpan.innerHTML = `🎯 ${totalExp} Experience`;
    if (expYearsSpan) expYearsSpan.textContent = totalExp;
}

// ========================================
// TYPEWRITER EFFECT
// ========================================
const phrases = [
    "Technical Support Specialist",
    "Customer Success Professional", 
    "Live Chat Expert",
    "ISP Support Specialist"
];

let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typewriterElement = document.getElementById('typewriter-text');

function typeEffect() {
    if (!typewriterElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 300);
            return;
        }
        setTimeout(typeEffect, 50);
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        setTimeout(typeEffect, 80);
    }
}

// ========================================
// ONLINE AVAILABILITY (Bangladesh Time)
// ========================================
function updateAvailability() {
    const now = new Date();
    const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    const day = bangladeshTime.getUTCDay();
    const hours = bangladeshTime.getUTCHours();
    const minutes = bangladeshTime.getUTCMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;
    
    let isOnline = false;
    let timeRangeText = "";
    
    if (day >= 0 && day <= 4) {
        const startTime = 9 * 60;
        const endTime = 21 * 60;
        isOnline = (currentTimeInMinutes >= startTime && currentTimeInMinutes <= endTime);
        timeRangeText = "Sun-Thu, 9AM-9PM (BST)";
    } else if (day === 5) {
        const startTime = 9 * 60;
        const endTime = 14 * 60;
        isOnline = (currentTimeInMinutes >= startTime && currentTimeInMinutes <= endTime);
        timeRangeText = "Friday, 9AM-2PM (BST)";
    } else if (day === 6) {
        isOnline = false;
        timeRangeText = "Saturday (Closed)";
    }
    
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const timeRangeSpan = document.getElementById('timeRange');
    
    if (statusDot && statusText && timeRangeSpan) {
        if (isOnline) {
            statusDot.style.background = "#22c55e";
            statusText.textContent = "Online Now";
            statusText.className = "online-text";
            statusDot.style.animation = "pulseOnline 1.5s infinite";
        } else {
            statusDot.style.background = "#ef4444";
            statusText.textContent = "Offline";
            statusText.className = "offline-text";
            statusDot.style.animation = "none";
        }
        timeRangeSpan.textContent = timeRangeText;
    }
}

// ========================================
// BANGLADESH TIME CLOCK (12-hour format)
// ========================================
function updateBangladeshTime() {
    const now = new Date();
    const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    
    let hours = bangladeshTime.getUTCHours();
    const minutes = bangladeshTime.getUTCMinutes();
    const seconds = bangladeshTime.getUTCSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    const timeString = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[bangladeshTime.getUTCDay()];
    const date = bangladeshTime.getUTCDate();
    const month = months[bangladeshTime.getUTCMonth()];
    const year = bangladeshTime.getUTCFullYear();
    const dateString = `${dayName}, ${date} ${month} ${year}`;
    
    const timeElement = document.getElementById('bdTime');
    const dateElement = document.getElementById('bdDate');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

// ========================================
// SPOTLIGHT EFFECT FOR PROFILE IMAGE
// ========================================
function initSpotlightEffect() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const spotlight = document.querySelector('.spotlight');
    
    if (imageWrapper && spotlight) {
        imageWrapper.addEventListener('mousemove', (e) => {
            const rect = imageWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            spotlight.style.setProperty('--x', x + '%');
            spotlight.style.setProperty('--y', y + '%');
        });
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "#contact") {
                e.preventDefault();
                const target = document.querySelector('#contact');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ========================================
// INITIALIZE ALL WHEN DOM IS READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateAllDurations();
    updateAvailability();
    typeEffect();
    initSpotlightEffect();
    initSmoothScroll();
    updateBangladeshTime();
    
    setInterval(updateBangladeshTime, 1000);
    setInterval(updateAvailability, 60000);
    setInterval(updateAllDurations, 86400000);
    
    console.log('Portfolio initialized successfully');
});
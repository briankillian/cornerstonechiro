class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
           
            </div>
            <nav class="navbar navbar-expand-lg fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="/index.html">
                        <div class="logo-wrapper">
                            <img src="/assets/branding/cc_text_white.png" alt="Cornerstone Chiropractic">
                        </div>
                    </a>
                    
                    <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul class="navbar-nav mx-auto">
                            <li class="nav-item">
                                <a class="nav-link nav-text text-light" href="/index.html">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-text text-light" href="/pages/services.html">SERVICES</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-text text-light" href="/pages/team.html">OUR TEAM</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-text text-light" href="/pages/about.html">OUR STORY</a>
                            </li>
                        </ul>
                        <div class="navbar-nav social-icons">
                            <a class="nav-link text-light" href="https://www.instagram.com/accounts/login/?next=%2Fcornerstonechiromi%2F&source=omni_redirect" target="_blank"><i class="fab fa-instagram"></i></a>
                            <a class="nav-link text-light" href="https://www.facebook.com/drbriankillian" target="_blank"><i class="fab fa-facebook-f"></i></a>
                            <a class="nav-link text-light" href="#"><i class="fas fa-user"></i></a>
                            <a class="nav-link text-light" href="https://schedule.drkillian.com" target="_blank">
                                <i class="fas fa-calendar-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Add animation functionality
        const banner = this.querySelector('.announcement-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 100);
        }
    }
}

// Register the custom element
customElements.define('nav-bar', Navbar);

// Add this CSS to your styles
const style = document.createElement('style');
style.textContent = `
    .navbar {
        background-color: var(--rich-black) !important;
        padding: 1rem 0;
        position: fixed;
        top: 0 !important;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    /* Remove the top adjustment styles */
    .announcement-banner {
        display: none; /* Remove the announcement banner */
    }

    /* Remove these styles as they're no longer needed */
    /*
    .navbar {
        top: 32px !important;
    }

    @media (max-width: 768px) {
        .navbar {
            top: 52px !important;
        }
    }
    */
`;

document.head.appendChild(style); 
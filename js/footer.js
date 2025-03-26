class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <img src="/assets/branding/cc_logo_white.png" alt="Logo" class="footer-logo mb-3" height="40">
                            <p class="body-small text-light mt-3">© 2025 Origins Wellness, Inc.</p>
                        </div>
                        <div class="footer-section">
                            <h5 class="footer-title">Quick Links</h5>
                            <ul class="footer-nav">
                                <li><a href="/about" class="footer-link">About Us</a></li>
                                <li><a href="/contact" class="footer-link">Contact</a></li>
                                <li><a href="/terms" class="footer-link">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div class="footer-section">
                            <h5 class="footer-title">Follow Us</h5>
                            <div class="social-links">
                                <a href="https://www.facebook.com/drbriankillian" class="footer-link d-block" target="_blank">
                                    <i class="fab fa-facebook"></i> Facebook
                                </a>
                                <a href="https://www.instagram.com/accounts/login/?next=%2Fcornerstonechiromi%2F&source=omni_redirect" 
                                   class="footer-link d-block" target="_blank">
                                    <i class="fab fa-instagram"></i> Instagram
                                </a>
                            </div>
                        </div>
                        <div class="footer-section">
                            <h5 class="footer-title">Subscribe to our newsletter</h5>
                            <div class="form-group mb-3">
                                <input type="email" class="form-input" placeholder="Email Address">
                                <button class="btn btn-lg primary-combo mt-2">OK</button>
                            </div>
                            <div class="contact-info mt-4">
                                <p class="body-small mb-1">4004 West Saint Joe Highway</p>
                                <p class="body-small mb-1">Lansing, Michigan 48917</p>
                                <p class="body-small mb-1">517 - 327 - 7463</p>
                                <p class="body-small mb-1">cornerstone@ctkmail.com</p>
                            </div>
                        </div>
                        <div class="footer-section">
                            <h5 class="footer-title">Schedule an Appointment</h5>
                            <a href="https://schedule.drkillian.com" target="_blank" class="btn primary-combo">
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', Footer); 
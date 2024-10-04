document.addEventListener("DOMContentLoaded", function () {
    console.log('Script Loaded');

    const hamburger = document.getElementById("hamburger-menu");
    const navLinksContainer = document.querySelector('.nav-links'); // Select the parent container
    const navLinks = document.querySelectorAll('.nav-links a'); // Get all nav links

    // Handle clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            console.log('Nav link clicked:', page);
            navigate(page);

            // Hide the menu after a link is clicked
            navLinksContainer.classList.remove('show');
        });
    });

    // Toggle the navigation menu when the hamburger icon is clicked
    hamburger.addEventListener("click", function () {
        navLinksContainer.classList.toggle("show"); // Apply toggle to the container
    });

    // Function to handle form submission
    function handleFormSubmission(event) {
        event.preventDefault();
        console.log('Form Submitted');

        const form = event.target;
        const formData = new FormData(form);

        // Convert form data to an object
        const formObject = Object.fromEntries(formData.entries());
        console.log('Form Data:', formObject);

        // Send form data to backend
        fetch('/api/signup', {  // Use relative URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert(data.message);

                // Store user data in local storage and redirect to payment page
                if (data.userData) {
                    localStorage.setItem('userData', JSON.stringify(data.userData));
                }
                window.location.href = '/payment.html';  // Redirect to payment page
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form.');
            });
    }

    // Function to handle dynamic navigation
    function navigate(page) {
        console.log('Navigating to:', page);
        const main = document.getElementById('app');

        if (pages[page]) {
            main.innerHTML = pages[page];  // Update the inner HTML based on the selected page

            // Attach form submit listener if navigating to the signup page
            if (page === 'signup') {
                const form = document.getElementById("signup-form");
                if (form) {
                    console.log('Form found. Attaching submit listener.');
                    form.addEventListener("submit", handleFormSubmission);
                } else {
                    console.error('Form not found on signup page.');
                }
            }

            // Attach event listeners to the buttons after the page content is updated
            attachButtonListeners();
        } else {
            console.error('Page not found:', page);
        }
    }

    // Attach event listeners for buttons dynamically
    function attachButtonListeners() {
        const exploreServicesButton = document.querySelector('.cta-btn[data-action="services"]');
        const signupButton = document.querySelector('.cta-btn[data-action="signup"]');

        if (exploreServicesButton) {
            console.log('Attaching event listener to Explore Services button');
            exploreServicesButton.addEventListener('click', () => navigate('services'));
        }

        if (signupButton) {
            console.log('Attaching event listener to Sign Up Now button');
            signupButton.addEventListener('click', () => navigate('signup'));
        }
    }

    // Content for each section
    const pages = {
        home: `
        <section class="home active">
            <div class="home-content">
                <h1>Welcome to OrbitTech</h1>
                <p>Your gateway to mastering web development and cutting-edge tech solutions. We offer tailored bootcamps and tech services to elevate your career.</p>
                
                <div class="features">
                    <div class="feature">
                        <h2>👨‍💻 Learn From Experts</h2>
                        <p>Gain practical skills through live sessions with seasoned developers.</p>
                    </div>
                    <div class="feature">
                        <h2>💼 Build a Portfolio</h2>
                        <p>Work on real-world projects and create a portfolio to showcase your skills.</p>
                    </div>
                    <div class="feature">
                        <h2>🚀 Career Support</h2>
                        <p>Receive guidance to transition into the tech industry successfully.</p>
                    </div>
                </div>

                <button class="cta-btn" data-action="services">Explore Our Services</button>
                <p>Sign up already?</p><button class="cta-btn signup-btn" data-action="signup"><a href="https://docs.google.com/forms/d/1lbqQKSv__hgzVEHL560qq6ISemULN-IQ7LvU8yDi2yY/edit">Fill the Form</a></button>
                <button class="cta-btn signup-btn" data-action="signup">Sign Up Now</button>
            </div>
        </section>`,
        
        signup: `
        <section class="signup">
            <h1>Sign Up for OrbitTech Bootcamp</h1>
            <p>Fill out the form below to secure your spot in our upcoming bootcamps.</p>

            <form class="signup-form" id="signup-form">
                <label for="name">Full Names:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="course">Select Course:</label>
                <select id="course" name="course">
                    <option value="frontend">Frontend Development - Price: &#8358;60,000</option>
                    <option value="social-media">Meta Advertising Course (Facebook, Instagram and Whatsapp) - Price: &#8358;20,000</option>
                    <option value="graphics-design">Graphics Design using Phone - Price: &#8358;10,000</option>
                </select>

                <label for="message">Message (Optional):</label>
                <textarea id="message" name="message" rows="4"></textarea>

                <button type="submit" class="cta-btn submit-btn">+</button>
                <p>Sign up already?</p><button class="cta-btn signup-btn" data-action="signup"><a href="https://docs.google.com/forms/d/1lbqQKSv__hgzVEHL560qq6ISemULN-IQ7LvU8yDi2yY/edit">Submit</a></button>
            </form>
        </section>`,

        about: `
        <section class="about">
            <div>
                <h1>About Us</h1>
                <p>At OrbitTech, we believe that anyone can become a proficient frontend developer with the right guidance and resources. Our 3-month Bootcamp is meticulously designed to provide a comprehensive learning experience that equips participants with essential skills in web development.</p>
            </div>
            <div>
            <h2>Our Mission</h2>
            <p>Our mission is to empower aspiring developers by offering high-quality education and practical training. We aim to bridge the gap between theoretical knowledge and real-world application, ensuring that our students are job-ready by the end of the program.</p>
            </div>
            <div>
            <h2>Our Approach</h2>
            <p>We prioritize hands-on learning through project-based experiences. Work on real-world projects that reinforce your understanding and contribute to your professional portfolio.</p>
            </div>
            <div>
            <p>Join a vibrant community of learners and industry professionals. Our bootcamp encourages collaboration and networking, allowing you to share ideas, seek help, and build lasting connections.</p>
            <p>Learn from experienced instructors who are passionate about teaching. Our team brings a wealth of knowledge and real-world experience, providing you with insights and mentorship throughout your journey.</p>
            
            </div>
            <div>
            <h2>Career Opportunities</h2>
            <p>The demand for skilled frontend developers continues to rise. By completing our bootcamp, you will gain the skills necessary to pursue various career paths, including Frontend Developer, UI/UX Designer, Web Designer, and Web Application Developer. We also provide career guidance and support to help you navigate the job market and prepare for interviews.</p>
            
            </div>
            <div>
            <h2>Join Us</h2>
            <p>Embark on your journey to becoming a frontend developer with OrbitTech. Our bootcamp not only prepares you with technical skills but also instills confidence and a growth mindset that is crucial for success in the tech industry.</p>
            </div>
            </section>`,
        
        services: `
        <section class="services">
            <h1>Our Services</h1>
            <ul>
                <li>3-Month Frontend Bootcamp: Master HTML, CSS, and JavaScript.</li>
                <li>Meta Advertising Course (Facebook, Instagram and Whatsapp) Pro Level: Elevate your brand's digital presence.</li>
                <li>Graphics Design: Create stunning visuals for your business needs.</li>
                <li>Web Design & Development: Tailored solutions for your business.</li>
                <li>One-on-One Mentorship: Personalized guidance to help you excel.</li>
                <li>Workshops & Seminars: Engage in short-term sessions on trending topics.</li>
                <li>Portfolio Reviews: Get expert feedback on your work to improve your skills.</li>
            </ul>
        </section>`,

        plans: `
        <section class="plans">
            <h1>Our Prices</h1>
            <div class="plan">
                <h3>Frontend Development Bootcamp for individuals</h3>
                <h4>Duration: 3 months</h4>
                <p>Access to foundational frontend courses,including HTML, CSS, JavaScript. Price: &#8358;60,000</p>
            </div>
            <div class="plan">
                <h3>Frontend Development Bootcamp for Organizations</h3>
                <h4>Duration: 3 months</h4>
                <p>Full access to all bootcamps, including HTML, CSS, JavaScript, and more. Price: &#8358;80,000</p>
            </div>
            <div class="plan">
                <h3>Meta Advertising Course (Facebook, Instagram and Whatsapp) Pro Level</h3>
                <h4>Duration: 2 weeks</h4>
                <p>All features + 1-on-1 mentoring. Price: &#8358;20,000</p>
            </div>
            <div class="plan">
                <h3>Meta Advertising course</h3>
                <h4>Duration: 2 weeks</h4>
                <p>Comprehensive social media marketing strategies. Price: &#8358;15,000</p>
            </div>
            <div class="plan">
                <h3>Graphic design Using Mobile Phone</h3>
                <h4>Duration: 3 weeks</h4>
                <p>Professional graphics design services for branding. Price: &#8358;10,000</p>
            </div>
        </section>`,

        testimonials: `
        <section class="testimonials">
            <h1>Testimonials</h1>
            <blockquote>
                "OrbitTech helped me transition from a beginner to a confident frontend developer. The instructors were fantastic!" 
                <cite>- Aiyegba Louis, OrbitTech Graduate</cite>
            </blockquote>
            <blockquote>
                "Their bootcamp was the best investment I've made. I landed a junior developer role right after graduation." 
                <cite>- Onomade Elvera, OrbitTech Alumni</cite>
            </blockquote>
            <blockquote>
                "The hands-on projects and expert feedback were invaluable in helping me build my portfolio." 
                <cite>- Aiyegba Emmanuel, OrbitTech Graduate</cite>
            </blockquote>
            <blockquote>
                "The community at OrbitTech is incredibly supportive, making learning enjoyable and productive." 
                <cite>- Chilaka Oluebube, OrbitTech Alumni</cite>
            </blockquote>
        </section>`,

        contact: `
<section class="contact">
    <h1>Contact Us</h1>
    <p>Email: careers@orbitech.com </p>
    <p>Phone: +234 902 324 1785<br> WhatsApp: +234 902 324 1785 </p>
    <div class="footer-content">
        <p>© 2024 OrbitTech. All Rights Reserved.</p>
        <div class="socials">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">Facebook</a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">Instagram</a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">Twitter</a>
        </div>
    </div>
</section>
`
    };

    // Load the home page by default
    navigate('home');

    // Expose navigate function globally
    window.navigate = navigate;
});

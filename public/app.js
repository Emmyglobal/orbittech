document.addEventListener("DOMContentLoaded", function () {
    console.log('Script Loaded');

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

    // Handle clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            console.log('Nav link clicked:', page);
            navigate(page);
        });
    });

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
                <button class="cta-btn signup-btn" data-action="signup">Sign Up Now</button>
                <p>Sign up already?</p><button><a href="">Fill the Form</a></button>
            </div>
        </section>`,
        
        signup: `
        <section class="signup">
            <h1>Sign Up for OrbitTech Bootcamp</h1>
            <p>Fill out the form below to secure your spot in our upcoming bootcamps.</p>

            <form class="signup-form" id="signup-form">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="course">Select Course:</label>
                <select id="course" name="course">
                    <option value="frontend">Frontend Development</option>
                    <option value="social-media">Social Media Marketing</option>
                </select>

                <label for="message">Message (Optional):</label>
                <textarea id="message" name="message" rows="4"></textarea>

                <button type="submit" class="cta-btn submit-btn">Submit</button>
                <p>Sign up already?</p><button><a href="">Fill the Form</a></button>
            </form>
        </section>`,

        about: `
        <section class="about">
            <h1>About Us</h1>
            <p>At OrbitTech, we believe that anyone can become a proficient frontend developer with the right guidance and resources. Our 3-month Bootcamp is meticulously designed to provide a comprehensive learning experience that equips participants with essential skills in web development.</p>
            <h2>Our Mission</h2>
            <p>Our mission is to empower aspiring developers by offering high-quality education and practical training. We aim to bridge the gap between theoretical knowledge and real-world application, ensuring that our students are job-ready by the end of the program.</p>
            <h2>Our Approach</h2>
            <p>We prioritize hands-on learning through project-based experiences. Work on real-world projects that reinforce your understanding and contribute to your professional portfolio.</p>
            <p>Join a vibrant community of learners and industry professionals. Our bootcamp encourages collaboration and networking, allowing you to share ideas, seek help, and build lasting connections.</p>
            <p>Learn from experienced instructors who are passionate about teaching. Our team brings a wealth of knowledge and real-world experience, providing you with insights and mentorship throughout your journey.</p>
            <h2>Career Opportunities</h2>
            <p>The demand for skilled frontend developers continues to rise. By completing our bootcamp, you will gain the skills necessary to pursue various career paths, including Frontend Developer, UI/UX Designer, Web Designer, and Web Application Developer. We also provide career guidance and support to help you navigate the job market and prepare for interviews.</p>
            <h2>Join Us</h2>
            <p>Embark on your journey to becoming a frontend developer with OrbitTech. Our bootcamp not only prepares you with technical skills but also instills confidence and a growth mindset that is crucial for success in the tech industry.</p>
        </section>`,

        services: `
        <section class="services">
            <h1>Our Services</h1>
            <ul>
                <li>3-Month Frontend Bootcamp: Master HTML, CSS, and JavaScript.</li>
                <li>Social Media Marketing (Facebook and Instagram): Elevate your brand's digital presence.</li>
                <li>Graphics Design: Create stunning visuals for your business needs.</li>
                <li>Web Design & Development: Tailored solutions for your business.</li>
                <li>One-on-One Mentorship: Personalized guidance to help you excel.</li>
                <li>Workshops & Seminars: Engage in short-term sessions on trending topics.</li>
                <li>Portfolio Reviews: Get expert feedback on your work to improve your skills.</li>
            </ul>
        </section>`,

        plans: `
        <section class="plans">
            <h1>Our Plans</h1>
            <div class="plan">
                <h3>Basic Plan</h3>
                <p>Access to foundational frontend courses. Price: $100</p>
            </div>
            <div class="plan">
                <h3>Pro Plan</h3>
                <p>Full access to all bootcamps, including HTML, CSS, JavaScript, and more. Price: $300</p>
            </div>
            <div class="plan">
                <h3>Premium Plan</h3>
                <p>All Pro Plan features + 1-on-1 mentoring. Price: $500</p>
            </div>
            <div class="plan">
                <h3>Enterprise Plan</h3>
                <p>Customized training programs for organizations. Contact us for pricing.</p>
            </div>
            <div class="plan">
                <h3>Marketing Plan</h3>
                <p>Comprehensive social media marketing strategies. Price: $400</p>
            </div>
            <div class="plan">
                <h3>Design Plan</h3>
                <p>Professional graphics design services for branding. Price: $300</p>
            </div>
        </section>`,

        testimonials: `
        <section class="testimonials">
            <h1>Testimonials</h1>
            <blockquote>
                "OrbitTech helped me transition from a beginner to a confident frontend developer. The instructors were fantastic!" 
                <cite>- Jane Doe, OrbitTech Graduate</cite>
            </blockquote>
            <blockquote>
                "Their bootcamp was the best investment I've made. I landed a junior developer role right after graduation." 
                <cite>- John Smith, OrbitTech Alumni</cite>
            </blockquote>
            <blockquote>
                "The hands-on projects and expert feedback were invaluable in helping me build my portfolio." 
                <cite>- Sarah Lee, OrbitTech Graduate</cite>
            </blockquote>
            <blockquote>
                "The community at OrbitTech is incredibly supportive, making learning enjoyable and productive." 
                <cite>- Mark Robinson, OrbitTech Alumni</cite>
            </blockquote>
        </section>`,

        contact: `
        <section class="contact">
            <h1>Contact Us</h1>
            <p>Email: nwaforugochukwu21@gmail.com</p>
            <p>Phone: +234 123 456 789</p>
        </section>`
    };

    // Load the home page by default
    navigate('home');

    // Expose navigate function globally
    window.navigate = navigate;
});
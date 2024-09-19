// Handle form submission
document.addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);  // Get form data

    // Convert form data to an object
    const formObject = Object.fromEntries(formData.entries());

    // Send form data to backend
    fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });

    // Function to dynamically navigate between pages
function navigate(page) {
    // Get the main content area
    const main = document.getElementById('app');
    
    // Update the inner HTML based on the page selected
    if (pages[page]) {
        main.innerHTML = pages[page];
    } else {
        console.error('Page not found');
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

            <!-- Existing CTA Button -->
            <button class="cta-btn" onclick="navigate('services')">Explore Our Services</button>

            <!-- New Sign Up Button -->
            <button class="cta-btn signup-btn" onclick="navigate('signup')">Sign Up Now</button>
        </div>
    </section>
`,
signup: `
    <section class="signup">
        <h1>Sign Up for OrbitTech Bootcamp</h1>
        <p>Fill out the form below to secure your spot in our upcoming bootcamps.</p>

        <form class="signup-form">
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
        </form>
    </section>
`,
    about: `
        <section class="about">
            <h1>About OrbitTech</h1>
            <p>We are a tech-driven company offering advanced bootcamps and customized IT solutions. At OrbitTech, our goal is to bridge the gap between technology and business, empowering the next generation of developers.</p>
        </section>
    `,
    services: `
        <section class="services">
            <h1>Our Services</h1>
            <ul>
                <li>3-Month Frontend Bootcamp: Master HTML, CSS, and JavaScript.</li>
                <li>Social Media Marketing: Elevate your brand's digital presence.</li>
                <li>Web Design & Development: Tailored solutions for your business.</li>
            </ul>
        </section>
    `,
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
        </section>
    `,
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
        </section>
    `,
    contact: `
        <section class="contact">
            <h1>Contact OrbitTech</h1>
            <p>Email: nwaforugochukwu21@gmail.com</p>
            <p>Phone: +234 123 456 789</p>
        </section>
    `
};

// Load the home page by default
navigate('home');
});

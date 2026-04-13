const newsData = [
    {
        id: 1,
        title: "New Research Facility Opens on Campus",
        category: "academic",
        date: "2026-05-10",
        excerpt: "The university has officially opened its newest state-of-the-art research facility, marking a significant milestone in advancing scientific discovery and innovation on campus.",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
        author: "Campus Communications",
        fullContent: "<p>The ribbon was officially cut Monday morning on the new <strong>Global Innovation Center</strong>, a 45,000-square-foot facility dedicated to interdisciplinary research. The building features specialized labs for robotics, molecular biology, and sustainable engineering.</p><p>President Henderson addressed the crowd, stating that this facility represents the university's commitment to solving 21st-century challenges. 'This isn't just a building; it's a hub where the next generation of breakthroughs will happen,' Henderson said.</p><p>Students will have access to the facility starting next week, with several graduate-level projects already scheduled to move into the new space.</p>"
    },
    {
        id: 2,
        title: "Volleyball Team Advances to Conference Finals",
        category: "athletics",
        date: "2026-04-12",
        excerpt: "Our men's basketball team secured a decisive victory last night, earning their spot in the conference finals. The team showed exceptional teamwork and determination throughout the game.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
        author: "Athletics Department",
        fullContent: "<p>In a nail-biting finish that kept fans on the edge of their seats, the Vikings defeated the state champions 3-2. After trailing 0 - 2, the team rallied back with an incredible defensive performance in the second half of the game.</p><p><strong>Key Highlights:</strong></p><ul><li>Marcus Reed led the scoring with 24 points.</li><li>Sarah Jenkins recorded a career-high 12 assists.</li><li>The defense forced 15 turnovers in the final quarter.</li></ul><p>The regional final is set for this Saturday at the North Park Gymnasium. Tickets go on sale tomorrow at 9:00 AM.</p>"
    },
    {
        id: 3,
        title: "Spring Career Fair Registration Now Open",
        category: "announcements",
        date: "2026-05-11",
        excerpt: "Students can now register for the Spring 2026 Career Fair, featuring over 100 employers from various industries. Early registration is encouraged as spots are limited.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
        author: "Career Services",
        fullContent: "<p>Career Services is pleased to announce that registration is now open for our flagship Spring Career Fair. This year, we are hosting a record number of Fortune 500 companies alongside local startups and non-profit organizations.</p><p>Students who register early via the <em>Handshake portal</em> will receive a digital guide to all attending employers, allowing them to research positions ahead of time. Professional attire is required, and the Alumni Association will be offering free suit rentals for those in need.</p><p>Don't miss this opportunity to network with recruiters and secure your summer internship or post-grad position.</p>"
    },
    {
        id: 4,
        title: "Campus Sustainability Initiatives Expand",
        category: "announcements",
        date: "2026-05-09",
        excerpt: "The university announces new sustainability initiatives including solar panel installation, expanded recycling programs, and a campus-wide composting system to reduce environmental impact.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
        author: "Sustainability Office",
        fullContent: "<p>As part of our mission to reach carbon neutrality by 2035, the Sustainability Office is launching three major projects this semester. Most notably, solar arrays will be installed on the roofs of three residence halls, providing roughly 15% of the campus's peak energy needs.</p><p>Additionally, a new <strong>Zero-Waste Dining</strong> program will begin in March. All plastic utensils will be replaced with compostable alternatives, and color-coded bins will be placed across the quad to assist with sorting recyclables.</p><p>Student volunteers are needed for the 'Green Team' to help educate peers on these new systems. Interested students can sign up at the student union.</p>"
    },
    {
        id: 5,
        title: "International Students Share Cultural Experiences",
        category: "events",
        date: "2026-05-08",
        excerpt: "The International Student Association hosted a cultural showcase featuring performances, traditional foods, and stories from students representing over 40 countries.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=500&fit=crop",
        author: "Student Life",
        fullContent: "<p>The Johnson Center was transformed into a global village last Friday for the annual 'Unity Through Culture' event. Thousands of students and faculty members attended to sample food, watch dance performances, and engage in meaningful dialogue.</p><p>The highlight of the evening was the <strong>Parade of Nations</strong>, where students walked through the hall carrying flags and wearing traditional garments from their home countries. 'It’s a chance for us to share our home with our new community here,' said ISA President Maria Gomez.</p><p>Photos from the event are now available on the university's social media pages.</p>"
    },
    {
        id: 6,
        title: "New Library Study Spaces Available",
        category: "announcements",
        date: "2026-05-07",
        excerpt: "The main library has completed renovations on the third floor, adding 50 new individual study spaces and 10 group collaboration rooms equipped with the latest technology.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=500&fit=crop",
        author: "Library Services",
        fullContent: "<p>Following six months of construction, the Brandel Library third-floor expansion is finally complete. The new layout was designed based on student feedback requesting more quiet, private areas and better access to power outlets.</p><p><strong>New Features Include:</strong></p><ul><li>Soundproof group study pods with 55-inch monitors.</li><li>Ergonomic 'silent zone' workstations.</li><li>A designated charging lounge for laptops and mobile devices.</li></ul><p>Room reservations can be made through the library's online booking system up to seven days in advance.</p>"
    },
    {
        id: 7,
        title: "Student Entrepreneurs Win Innovation Challenge",
        category: "academic",
        date: "2026-05-06",
        excerpt: "A team of business students won first place in the state Innovation Challenge with their sustainable packaging solution startup, earning $25,000 in seed funding.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
        author: "Business School",
        fullContent: "<p>Congratulations to the founders of <strong>EcoPack</strong>, a student-led startup that took home the grand prize at this year's State Innovation Challenge. The team developed a biodegradable packaging material made from agricultural waste that is both durable and cost-effective.</p><p>The $25,000 prize will allow the team to scale their production and begin a pilot program with local grocery stores. 'The mentorship we received through the campus incubator was vital to our win,' noted team leader Kevin Zhang.</p><p>The team plans to showcase their prototype at the upcoming Science & Tech expo next month.</p>"
    },
    {
        id: 8,
        title: "Mental Health Awareness Week Kicks Off",
        category: "events",
        date: "2026-05-05",
        excerpt: "Campus counseling services launches Mental Health Awareness Week with workshops, support groups, and wellness activities designed to promote student well-being.",
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop",
        author: "Counseling Services",
        fullContent: "<p>Mental Health Awareness Week is here, aiming to destigmatize mental health struggles and provide students with practical wellness tools. Activities are scheduled every day this week, ranging from guided meditation sessions to pet therapy in the quad.</p><p>Counseling Services will also host a seminar titled 'Managing Academic Stress' this Wednesday at 4:00 PM. All students who attend at least three events during the week will be entered into a raffle for a $100 campus bookstore gift card.</p><p>Remember, it's okay to not be okay. Our counselors are available for walk-ins daily from 9:00 AM to 5:00 PM.</p>"
    }
];
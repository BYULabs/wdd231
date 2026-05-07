const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

let currentFilter = 'all';
const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');

allBtn.addEventListener('click', () => filterCourses('all'));
cseBtn.addEventListener('click', () => filterCourses('cse'));
wddBtn.addEventListener('click', () => filterCourses('wdd'));

function filterCourses(filter) {
    currentFilter = filter;
    updateFilterButtons();
    displayCourses();
}

function updateFilterButtons() {
    allBtn.classList.remove('active');
    cseBtn.classList.remove('active');
    wddBtn.classList.remove('active');

    if (currentFilter === 'all') {
        allBtn.classList.add('active');
    } else if (currentFilter === 'cse') {
        cseBtn.classList.add('active');

    } else if (currentFilter === 'wdd') {
        wddBtn.classList.add('active');
    }
}

function displayCourses() {
    let filteredCourses = courses;

    if (currentFilter === 'cse') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    } else if (currentFilter === 'wdd') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    }

    const container = document.getElementById('courses-container');
    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p class="credits">Credits: ${course.credits}</p>
            <p>${course.description}</p>
            <p class="tech">Technologies: ${course.technology.join(', ')}</p>
            ${course.completed ? '<p class="completion-badge">✓ Completed</p>' : ''}
        `;

        container.appendChild(courseCard);
    });

    displayTotalCredits(filteredCourses);
}

function displayTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits Required: ${totalCredits}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
})
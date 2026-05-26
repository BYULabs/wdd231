import {courses} from '../data/course.js'

let currentFilter = 'all';
const allBtn = document.getElementById('all-btn');
const cseBtn = document.getElementById('cse-btn');
const wddBtn = document.getElementById('wdd-btn');

allBtn.addEventListener('click', () => filterCourses('all'));
cseBtn.addEventListener('click', () => filterCourses('cse'));
wddBtn.addEventListener('click', () => filterCourses('wdd'));

// Close button event listener
const closeBtn = document.getElementById('modal-close-btn');
closeBtn.addEventListener('click', () => {
    const modal = document.getElementById('course-modal');
    modal.close();
});

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

        courseCard.textContent = `${course.subject} ${course.number}: ${course.title}`;
        courseCard.addEventListener('click', () => openCourseModal(course));

        container.appendChild(courseCard);
    });

    displayTotalCredits(filteredCourses);
};


function openCourseModal(course) {
    const modal = document.getElementById('course-modal');
    const modalContent = document.getElementById('modal-course-details');
    
    modalContent.innerHTML = `
        <a href="https://github.com/BYULabs/${course.subject.toLocaleLowerCase()}${course.number}" class="card-link" target="_blank">
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p class="credits">Credits: ${course.credits}</p>
            <p>${course.description}</p>
            <p class="tech">Technologies: ${course.technology.join(', ')}</p>
            ${course.completed ? '<p class="completion-badge">✓ Completed</p>' : ''}
        </a>
    `;

    modal.showModal();
}

function displayTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits Required: ${totalCredits}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
})
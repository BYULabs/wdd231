import {courses} from '../data/course.js'

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

    filteredCourses.forEach((course, index) => {
        const courseBtn = document.createElement('button');
        courseBtn.classList.add('course-btn');
        
        if (course.completed) {
            courseBtn.classList.add('completed');
        }

        courseBtn.textContent = `${course.subject} ${course.number}: ${course.title}`;
        courseBtn.addEventListener('click', () => openCourseModal(course));

        container.appendChild(courseBtn);
    });

    displayTotalCredits(filteredCourses);
}

function openCourseModal(course) {
    const modal = document.getElementById('course-modal');
    const modalContent = document.getElementById('modal-course-details');
    
    modalContent.innerHTML = `
        <div class="modal-card-header">
            <h2>${course.subject} ${course.number}</h2>
        </div>
        <div class="modal-card-body">
            <h3>${course.title}</h3>
            <p class="credits"><strong>Credits:</strong> ${course.credits}</p>
            <p class="certificate"><strong>Certificate:</strong> ${course.certificate}</p>
            <p class="description">${course.description}</p>
            <p class="tech"><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
            ${course.completed ? '<p class="completion-badge">✓ Completed</p>' : ''}
            <a href="https://github.com/BYULabs/${course.subject.toLocaleLowerCase()}${course.number}" class="github-link" target="_blank" rel="noreferrer">View on GitHub →</a>
        </div>
    `;
    
    modal.showModal();
}

function closeModal() {
    const modal = document.getElementById('course-modal');
    modal.close();
}

function displayTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits Required: ${totalCredits}`;
}

document.addEventListener('DOMContentLoaded', () => {
    displayCourses();
    
    // Modal close button listener
    const closeBtn = document.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the modal content
    const modal = document.getElementById('course-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
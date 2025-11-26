class Project {
  constructor({ id, title, category, page, year, thumbnail, summary, tags }) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.page = page;
    this.year = year;
    this.thumbnail = thumbnail;
    this.summary = summary;
    this.tags = Array.isArray(tags) ? tags : [];
  }
}

/**
 * Fetch project data from an external JSON file.
 * The JSON file only contains data, not behaviour.
 */
async function fetchProjects() {
  try {
    const response = await fetch('./data/projects.json');
    if (!response.ok) {
      console.error('Could not load projects.json', response.status);
      return [];
    }
    const data = await response.json();
    return data.map(item => new Project(item));
  } catch (error) {
    console.error('Error while loading project data', error);
    return [];
  }
}

class PortfolioApp {
  constructor() {
    this.projects = [];
  }

  async init() {
    // The contact page does not depend on project data,
    // so we initialise it immediately.
    this.initialiseContactPage();

    // Only the Home page needs the project data.
    if (document.body.classList.contains('home')) {
      this.projects = await fetchProjects();
      this.renderHomePortfolioSummary();
    }
  }

  /**
   * Render a small, data-driven summary of the portfolio
   * underneath the existing static portfolio links on Home.html.
   */
  renderHomePortfolioSummary() {
    const container = document.getElementById('portfolio-summary');
    if (!container || this.projects.length === 0) {
      return;
    }

    const totalProjects = this.projects.length;
    const projectsByCategory = this.countProjectsByCategory();

    // Clean the container before adding new content (good practice
    // if this function is ever reused).
    container.innerHTML = '';

    const intro = document.createElement('p');
    intro.textContent = `Currently showing ${totalProjects} projects across ${Object.keys(projectsByCategory).length} categories.`;
    container.appendChild(intro);

    const list = document.createElement('ul');
    list.className = 'portfolio-summary-list';

    for (const [category, count] of Object.entries(projectsByCategory)) {
      const item = document.createElement('li');
      // Capitalise the category for nicer display
      const label = category.charAt(0).toUpperCase() + category.slice(1);
      item.textContent = `${label}: ${count} project${count > 1 ? 's' : ''}`;
      list.appendChild(item);
    }

    container.appendChild(list);
  }

  /**
   * Compute how many projects exist in each category.
   * Demonstrates correct use of loops and flow control.
   */
  countProjectsByCategory() {
    const result = {};
    for (const project of this.projects) {
      const category = project.category || 'uncategorised';
      if (!result[category]) {
        result[category] = 0;
      }
      result[category] += 1;
    }
    return result;
  }

  /**
   * Simple, fully client-side validation for the Contact page.
   * Demonstrates conditions, DOM manipulation and legible naming.
   */
  initialiseContactPage() {
    if (!document.body.classList.contains('contact')) {
      return;
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('text');
    const sendButton =
      document.getElementById('sendButton') ||
      document.querySelector('.content button');

    if (!nameInput || !emailInput || !messageInput || !sendButton) {
      // The form is not present; nothing to initialise.
      return;
    }

    let feedback = document.getElementById('contact-feedback');
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.id = 'contact-feedback';
      feedback.className = 'muted';
      feedback.setAttribute('aria-live', 'polite');
      sendButton.insertAdjacentElement('afterend', feedback);
    }

    sendButton.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      // Basic validation using conditions
      if (!name || !email || !message) {
        feedback.textContent = 'Please fill in all fields before sending.';
        feedback.style.color = 'red';
        return;
      }

      if (!email.includes('@')) {
        feedback.textContent = 'The email address does not look valid.';
        feedback.style.color = 'red';
        return;
      }

      // If all checks have passed, show a friendly confirmation.
      feedback.textContent = `Thank you, ${name}! Your message has not actually been sent (this is a demo for the assignment), but the form is working correctly.`;
      feedback.style.color = 'green';

      // Clear the form fields
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});

const contentDir = 'contents/';
const sectionNames = ['home', 'publications', 'awards'];

async function readText(path) {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
    return response.text();
}

function setUpNavigation() {
    const toggle = document.querySelector('.menu-toggle');
    const links = [...document.querySelectorAll('.nav-link')];
    const closeMenu = () => toggle.setAttribute('aria-expanded', 'false');
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    });
    document.querySelector('#mainNav').addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });
    links.forEach(link => link.addEventListener('click', () => {
        closeMenu();
        document.querySelector(link.hash).focus({ preventScroll: true });
    }));
    document.querySelector('.site-title').addEventListener('click', closeMenu);
    const updateCurrent = () => {
        const current = links.find(link => link.hash === location.hash) || links[0];
        links.forEach(link => {
            if (link === current) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };
    window.addEventListener('hashchange', updateCurrent);
    updateCurrent();
}

async function loadConfiguration() {
    const config = jsyaml.load(await readText(`${contentDir}config.yml`));
    Object.entries(config).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = value;
    });
    document.getElementById('profile-name').textContent = document.getElementById('page-top-title').textContent;
    document.querySelector('.author-avatar').alt = document.getElementById('profile-name').textContent;
}

async function loadSection(name) {
    const container = document.getElementById(`${name}-md`);
    try {
        container.innerHTML = marked.parse(await readText(`${contentDir}${name}.md`));
        // The original GitHub badge has an extra pair of parentheses in its URL.
        // Repair the rendered destination without rewriting the source content.
        container.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (/^\(https?:\/\/[^\s]+\)$/.test(href)) link.setAttribute('href', href.slice(1, -1));
        });
    } catch (error) {
        console.error(error);
        const message = document.createElement('p');
        message.className = 'load-error';
        message.textContent = 'This section could not be loaded. ';
        const source = document.createElement('a');
        source.href = `${contentDir}${name}.md`;
        source.textContent = 'Read the original content';
        message.append(source);
        container.replaceChildren(message);
    } finally {
        container.setAttribute('aria-busy', 'false');
    }
}

async function initialize() {
    setUpNavigation();
    marked.use({ mangle: false, headerIds: false });
    await Promise.all([
        loadConfiguration().catch(console.error),
        ...sectionNames.map(loadSection),
    ]);
    // Preserve direct section links after the Markdown changes the page height.
    const section = sectionNames.find(name => location.hash === `#${name}`);
    if (section) document.getElementById(section).scrollIntoView({ behavior: 'instant' });
    // Keep the original template's math support, using the bundled renderer only
    // when the content actually contains math (no third-party script required).
    const hasMath = [...document.querySelectorAll('.main-body')].some(element => /\$|\\\(|\\\[|\\begin\{/.test(element.textContent));
    if (hasMath) {
        window.MathJax = {
            tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], tags: 'all' },
            svg: { fontCache: 'global' },
        };
        const script = document.createElement('script');
        script.src = 'static/js/tex-svg.js';
        document.head.append(script);
    }
}

initialize().catch(console.error);

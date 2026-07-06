// COMUNIDADE
const counters = document.querySelectorAll(".counter");
const speed = 20;
counters.forEach(counter => {
    let count = 0;
    const target = parseFloat(counter.getAttribute("data-target"));
    const suffix = counter.getAttribute("data-suffix") || "";
    const prefix = counter.getAttribute("data-prefix") || "";
    const decimals = (counter.getAttribute("data-target").split(".")[1] || "").length;

    function updateCounter() {
        if (count < target) {
            count += target / 100;
            if (count > target) count = target;
            counter.textContent = prefix + count.toFixed(decimals) + suffix;
            setTimeout(updateCounter, speed);
        } else {
            counter.textContent = prefix + target.toFixed(decimals) + suffix;
        }
    }
    updateCounter();
});


// COMPROMISSO
document.querySelectorAll('.brand-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const imgEl = document.getElementById('brandImage');
        const textEl = document.getElementById('brandText');

        const newImg = this.getAttribute('data-img');
        const newText = this.getAttribute('data-text');

        imgEl.src = newImg;
        textEl.textContent = newText;

        document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Navbar transparency on scroll
const nb = document.querySelector('.navbar.parabank');
const setNav = () => {
    if (window.scrollY > 10) nb.classList.add('scrolled');
    else nb.classList.remove('scrolled');
};
setNav();
window.addEventListener('scroll', setNav);


// Video open/close
const teaser = document.getElementById('videoTeaser');
const closeBtn = document.getElementById('closeVideo');
const video = document.getElementById('awardVideo');

teaser.addEventListener('click', () => {
    document.body.classList.add('show-video');       // expands #videoHero (on top)
    setTimeout(() => { try { video.play(); } catch (e) { } }, 200);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // make sure user sees the top video
});

closeBtn.addEventListener('click', () => {
    document.body.classList.remove('show-video');
    try { video.pause(); } catch (e) { }
});


// FSW SECTION
(function () {
    const section = document.getElementById('fsw-section');
    if (!section) return;

    const imgEl = section.querySelector('.fsw-img');
    const leftEl = section.querySelector('.fsw-left');
    const rightTitle = section.querySelector('.fsw-right-title');
    const rightText = section.querySelector('.fsw-right-text');
    const featuresUl = section.querySelector('.fsw-features');

    function applyFeatures(str) {
        if (!featuresUl) return;
        featuresUl.innerHTML = '';
        const items = (str || '').split('|').map(s => s.trim()).filter(Boolean);
        if (items.length === 0) return;
        items.forEach(t => {
            const li = document.createElement('li');
            li.className = 'small';
            li.textContent = t;
            featuresUl.appendChild(li);
        });
    }

    section.querySelectorAll('.fsw-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // active state
            section.querySelectorAll('.fsw-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // fade image
            imgEl.classList.add('fsw-fade');

            // swap text
            if (leftEl) leftEl.innerHTML = this.dataset.left || leftEl.innerHTML;
            if (rightTitle) rightTitle.textContent = this.dataset.rightTitle || rightTitle.textContent;
            if (rightText) rightText.innerHTML = this.dataset.rightText || rightText.innerHTML;
            applyFeatures(this.dataset.features || '');

            // swap image
            const newSrc = this.dataset.img;
            if (newSrc) {
                const tmp = new Image();
                tmp.onload = () => {
                    imgEl.src = newSrc;
                    imgEl.classList.remove('fsw-fade');
                };
                tmp.src = newSrc;
            } else {
                imgEl.classList.remove('fsw-fade');
            }
        });
    });
})();
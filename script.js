function toStage(current, next) {
    const curEl = document.getElementById(current);
    const nextEl = document.getElementById(next);

    // Basic Validation for Name and Year
    if (current === 'stageName' && !document.getElementById('userName').value) {
        alert("Please enter your name first!");
        return;
    }
    if (current === 'stageYear') {
        const yr = document.getElementById('yearIn').value;
        if (yr < 1900 || yr > new Date().getFullYear()) {
            alert("Please enter a valid birth year.");
            return;
        }
    }

    curEl.classList.remove('active');
    nextEl.classList.add('active');

    if (next === 'stageProcess') {
        setTimeout(calculateFinalAge, 3000);
    }
}

function autoNext(input, len, cur, next) {
    if (input.value.length === len) toStage(cur, next);
}

function toggleEnvelope() {
    document.getElementById('envelope').classList.toggle('open');
}

function calculateFinalAge() {
    const name = document.getElementById('userName').value;
    const year = parseInt(document.getElementById('yearIn').value);
    const month = parseInt(document.getElementById('monthIn').value) || 0;
    const day = parseInt(document.getElementById('dayIn').value) || 1;

    // MANDATORY TASK 1 REQUIREMENT: JavaScript Date Object
    const dob = new Date(year, month, day);
    const now = new Date();
    
    let age = now.getFullYear() - dob.getFullYear();
    const mDiff = now.getMonth() - dob.getMonth();
    
    if (mDiff < 0 || (mDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
    }

    // Display age in the bouncy ball
    document.getElementById('finalAge').innerText = age;
    document.getElementById('ball').innerText = age;

    // Personalized Content Logic
    let quote = "";
    let suggestion = "";
    let wish = `Shine on, ${name}!`;

    if (age <= 7) {
        quote = `To ${name}'s parents: "A child is a beam of sunlight from the Infinite."`;
        suggestion = "Foster their imagination with play and art.";
    } else {
        quote = `Hey ${name}, "Do not wait for extraordinary circumstances to do good; use ordinary situations."`;
        suggestion = "Explore new digital skills and stay curious.";
    }

    document.getElementById('inspiringQuote').innerText = quote;
    document.getElementById('suggestionText').innerText = suggestion;
    document.getElementById('wishesText').innerText = wish;

    toStage('stageProcess', 'stageReveal');
}

// Visual click effect
function createRipple(e) {
    const ripple = document.createElement("div");
    ripple.style.position = "fixed";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.background = "rgba(255,255,255,0.2)";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.transform = "scale(0)";
    ripple.style.transition = "0.5s transform, 0.5s opacity";
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = "scale(10)";
        ripple.style.opacity = "0";
    }, 10);
    setTimeout(() => ripple.remove(), 500);
}
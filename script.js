import { generateStartupIdea } from "./ai.js";

async function generateStartup() {

    const industry =
        document.getElementById("industry").value;

    const skills =
        document.getElementById("skills").value;

    const budget =
        document.getElementById("budget").value;

    const interest =
        document.getElementById("interest").value;

    const output =
        document.getElementById("output");

    output.innerHTML = `
<div class="card loading-card">

    <h2>🦄 Unicorn AI Engine</h2>

    <div class="loader"></div>

    <div class="loading-step">
        🔍 Scanning Market Opportunities...
    </div>

    <div class="loading-step">
        📈 Calculating Growth Potential...
    </div>

    <div class="loading-step">
        💰 Evaluating Revenue Streams...
    </div>

    <div class="loading-step">
        🚀 Building Startup Blueprint...
    </div>

</div>
`;

    try {
        const cards =
            document.querySelectorAll(".reveal-card");

        cards.forEach((card, index) => {

            setTimeout(() => {

                card.classList.add("show");

            }, index * 500);

        });
        const result =
            await generateStartupIdea({
                industry,
                skills,
                budget,
                interest
            });

        output.innerHTML = `

<div class="card hero-card">
    <h1>${result.startupName}</h1>
    <h3>${result.tagline}</h3>
</div>



<div class="card">
    <h3>❗ Problem</h3>
    <p>${result.problem}</p>
</div>

<div class="card">
    <h3>💡 Solution</h3>
    <p>${result.solution}</p>
</div>
<div class="card">
    <h3>📈 Marketing Strategy</h3>
    <p>${result.marketingStrategy}</p>
</div>
<div class="card">
    <h3>🎯 Target Audience</h3>
    <p>${result.targetAudience}</p>
</div>

<div class="card">
    <h3>💰 Revenue Model</h3>
    <p>${result.revenueModel}</p>
</div>

<div class="card">
    <h3>⭐ USP</h3>
    <p>${result.usp}</p>
</div>

<div class="card">
    <h3>🛠 MVP Features</h3>
    <p>${result.mvpFeatures}</p>
</div>



<div class="card">
    <h3>⚠ Risks</h3>
    <p>${result.risks}</p>
</div>

<div class="card score-card">
    <h3>🦄 Unicorn Potential</h3>

    <div class="score">
        ${result.successScore}
    </div>

    <div class="score-label">
        Investor Confidence Score
    </div>
</div>
`;

    } catch (error) {

        console.error(error);

        output.innerHTML =
            "Error generating startup.";
    }
}

window.generateStartup = generateStartup;
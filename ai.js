const API_KEY = "AQ.Ab8RN6I4YKkCLicSLz_j2hoxVlKVTl3gmu-u6HP1kibflYWKSg";

export async function generateStartupIdea(userData) {

    const prompt = `
You are a world-class entrepreneur, venture capitalist, startup mentor, and industry expert.

Your task is to generate a startup idea with the highest possible chance of success based on the user's industry, skills, budget, and interests.

Requirements:

* The startup must be highly relevant to the specified industry.
* The startup must solve a real and significant problem.
* The idea should be innovative but realistic.
* Avoid generic or overused startup ideas.
* Consider market demand, scalability, revenue potential, competition, and feasibility.
* Use the user's skills as an advantage whenever possible.
* Consider the user's budget and suggest an achievable startup.
* Think like a founder and an investor at the same time.
* Prefer ideas capable of growing into a large company rather than a small local business.
* If suitable, incorporate AI, automation, SaaS, marketplaces, network effects, data advantages, or platform business models.

Return ONLY valid JSON.

{
"startupName":"",
"tagline":"",
"problem":"",
"solution":"",
"targetAudience":"",
"revenueModel":"",
"usp":"",
"mvpFeatures":"",
"marketingStrategy":"",
"risks":"",
"whyThisCanBeUnicorn":"",
"successScore":""
}

Success Score Guidelines:

95-100 = Exceptional unicorn-scale potential
85-94 = Strong venture-scale startup
70-84 = Good startup with growth potential
50-69 = Moderate potential
Below 50 = Weak business opportunity

The success score must be based on:

* Market Size
* Scalability
* Revenue Potential
* Competitive Advantage
* Feasibility
* Long-Term Growth Potential




Industry: ${userData.industry}
Skills: ${userData.skills}
Budget: ${userData.budget}
Interest: ${userData.interest}
`;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (data.error) {

    if (data.error.code === 503) {

        return {
            startupName: "Server Busy",
            tagline: "Gemini servers are overloaded",
            problem: "The AI service is currently experiencing high demand.",
            solution: "Please wait 30-60 seconds and try again.",
            targetAudience: "-",
            revenueModel: "-",
            usp: "-",
            mvpFeatures: "-",
            marketingStrategy: "-",
            risks: "-",
            successScore: "0"
        };

    }

    throw new Error(data.error.message);
}

        const text =
            data.candidates[0].content.parts[0].text;

        console.log("AI Response:", text);

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleanText);

        return result;

    } catch (error) {

        console.error("Gemini Error:", error);

        return `Error: ${error.message}`;
    }
}

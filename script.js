document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        { type: "text", question: "What’s your 'weird but charming' hidden talent?" },
        { type: "text", question: "If your life were a reality show, what would it be called?" },
        { type: "text", question: "What’s the most ridiculous reason you’ve ever been late?" },
        { type: "radio", question: "Pick a superpower, but there's a catch:", options: ["See the future (5 minutes ahead)", "Fly (but only 3 feet off the ground)", "Perfect singing voice (but only for nursery rhymes)", "Run at super speed (but only backward)"] },
        { type: "checkbox", question: "What random things do you collect?", options: ["Restaurant napkins", "Movie ticket stubs", "Hotel key cards", "Weird rocks", "Unused notebooks"] },
        { type: "yesno", question: "Would you rather fight 1 horse-sized duck or 100 duck-sized horses?" },
        { type: "text", question: "If your pet could text you, what would they say most often?" },
        { type: "text", question: "What’s your go-to fun fact about yourself?" },
        { type: "radio", question: "Your ideal first date is:", options: ["Amusement park", "Museum visit", "Cooking class", "Outdoor adventure"] },
        { type: "text", question: "If you could swap lives with a fictional character for a day, who would it be?" },
        { type: "radio", question: "How do you react when someone compliments you?", options: ["Blush and say thanks", "Make a joke", "Compliment them back", "Deny it completely"] },
        { type: "checkbox", question: "Pick three words your friends would use to describe you:", options: ["Spontaneous", "Goofy", "Chill", "Adventurous", "Mysterious", "Loyal"] },
        { type: "text", question: "If you had a warning label, what would it say?" },
        { type: "text", question: "What’s your guilty pleasure song?" },
        { type: "radio", question: "You can only eat one food for the rest of your life. What do you choose?", options: ["Pizza", "Sushi", "Tacos", "Ice Cream"] },
        { type: "text", question: "Describe yourself in a tweet (280 characters max)." },
        { type: "text", question: "If your life had background music, what song would always play during your best moments?" },
        { type: "radio", question: "Your dance style is best described as:", options: ["Club pro", "Awkward dad moves", "Freestyle chaos", "Too cool to dance"] },
        { type: "text", question: "If you had to be stuck in a TV show for a month, which would it be?" }
    ];

    const questionsContainer = document.getElementById("questionsContainer");

    questions.forEach((q, index) => {
        const div = document.createElement("div");
        div.classList.add("question");

        if (q.type === "text") {
            div.innerHTML = `<label>${q.question}</label><input type="text" id="q${index}" autocomplete="off" required>`;
        } else if (q.type === "radio") {
            div.innerHTML = `<label>${q.question}</label>` + q.options.map(option =>
                `<div><input type="radio" name="q${index}" value="${option}"> ${option}</div>`).join("");
        } else if (q.type === "checkbox") {
            div.innerHTML = `<label>${q.question}</label>` + q.options.map(option =>
                `<div><input type="checkbox" name="q${index}" value="${option}"> ${option}</div>`).join("");
        } else if (q.type === "yesno") {
            div.innerHTML = `<label>${q.question}</label>
                            <div><input type="radio" name="q${index}" value="Yes"> Yes</div>
                            <div><input type="radio" name="q${index}" value="No"> No</div>`;
        }

        questionsContainer.appendChild(div);
    });

    document.getElementById("bioForm").addEventListener("submit", (e) => {
        e.preventDefault();

        let answers = [];
        questions.forEach((q, index) => {
            if (q.type === "checkbox") {
                answers.push([...document.querySelectorAll(`input[name="q${index}"]:checked`)].map(cb => cb.value).join(", "));
            } else {
                answers.push(document.querySelector(`input[name="q${index}"]:checked`)?.value || document.getElementById(`q${index}`)?.value || "N/A");
            }
        });

        const bios = generateBios(answers);
        displayBios(bios);

        document.getElementById("bioForm").reset();
    });

    function generateBios(answers) {
        return [
            `I'm the kind of person who ${answers[0]} and always finds a way to make ${answers[1]} a reality. Looking for someone who appreciates ${answers[4]} as much as I do!`,
            `My life is basically ${answers[2]} meets ${answers[9]}. I thrive on ${answers[10]} and can probably beat you in a ${answers[18]} contest.`,
            `Warning: ${answers[12]}. If you can handle ${answers[16]}, we might just be a perfect match!`
        ];
    }

    function displayBios(bios) {
        document.getElementById("bioResults").innerHTML = bios.map(bio => `<p>${bio}</p>`).join("");
    }
});

const button = document.getElementById("jokeBtn");
const buttonText = document.getElementById("buttonText");
const buttonIcon = document.querySelector(".button-icon");

const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");
const status = document.getElementById("status");

async function getJoke() {
    button.disabled = true;
    buttonIcon.classList.add("loading");
    buttonText.textContent = "Loading...";
    setup.textContent = "Finding a funny joke...";
    punchline.textContent = "";
    status.textContent = "☺ Connecting to the joke API...";

    try {
        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        if (!response.ok) {
            throw new Error("Could not get a joke");
        }

        const data = await response.json();

        if (!data.setup || !data.punchline) {
            throw new Error("Invalid joke data received");
        }

        setup.textContent = data.setup;
        punchline.textContent = data.punchline;
        status.textContent = "☺ Joke loaded successfully!";

    } catch (error) {
        setup.textContent = "Oops! Something went wrong.";
        punchline.textContent =
            "Please check your internet and try again.";
        status.textContent = "⚠ " + error.message;

    } finally {
        button.disabled = false;
        buttonIcon.classList.remove("loading");
        buttonText.textContent = "Get Another Joke";
    }
}

button.addEventListener("click", getJoke);

// =========================================================
// MOBILE NAVIGATION
// =========================================================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    navToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


// Close mobile menu when a navigation link is clicked

navLinks?.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        navToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("in");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    // Fallback for older browsers

    revealElements.forEach((element) => {

        element.classList.add("in");

    });

}


// =========================================================
// CONTACT FORM - FORMSPREE
// =========================================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const formNote =
                document.getElementById("formNote");


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim();


            // =================================================
            // VALIDATION
            // =================================================

            if (!name || !email || !message) {

                if (formNote) {

                    formNote.textContent =
                        "Please fill in all fields.";

                    formNote.classList.remove(
                        "success"
                    );

                    formNote.classList.add(
                        "error",
                        "show"
                    );


                    setTimeout(() => {

                        formNote.classList.remove(
                            "show"
                        );

                        setTimeout(() => {

                            formNote.textContent = "";

                        }, 300);

                    }, 4000);

                }

                return;

            }


            // =================================================
            // DISABLE BUTTON
            // =================================================

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            const formData =
                new FormData(contactForm);


            try {

                // =================================================
                // SEND TO FORMSPREE
                // =================================================

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                // =================================================
                // SUCCESS
                // =================================================

                if (response.ok) {

                    contactForm.reset();


                    if (formNote) {

                        formNote.textContent =
                            "Message sent successfully! Thank you for reaching out.";

                        formNote.classList.remove(
                            "error"
                        );

                        formNote.classList.add(
                            "success",
                            "show"
                        );


                        setTimeout(() => {

                            formNote.classList.remove(
                                "show"
                            );


                            setTimeout(() => {

                                formNote.textContent =
                                    "";

                            }, 300);

                        }, 4000);

                    }

                }


                // =================================================
                // FORMSPREE ERROR
                // =================================================

                else {

                    let errorMessage =
                        "Something went wrong. Please try again.";


                    try {

                        const data =
                            await response.json();


                        if (
                            data &&
                            data.errors &&
                            data.errors.length > 0
                        ) {

                            errorMessage =
                                data.errors
                                    .map(
                                        (error) =>
                                            error.message
                                    )
                                    .join(" ");

                        }

                    } catch (error) {

                        console.error(
                            "Formspree response error:",
                            error
                        );

                    }


                    if (formNote) {

                        formNote.textContent =
                            errorMessage;

                        formNote.classList.remove(
                            "success"
                        );

                        formNote.classList.add(
                            "error",
                            "show"
                        );


                        setTimeout(() => {

                            formNote.classList.remove(
                                "show"
                            );


                            setTimeout(() => {

                                formNote.textContent =
                                    "";

                            }, 300);

                        }, 4000);

                    }

                }


            } catch (error) {

                console.error(
                    "Formspree error:",
                    error
                );


                if (formNote) {

                    formNote.textContent =
                        "Unable to send the message. Please check your internet connection and try again.";

                    formNote.classList.remove(
                        "success"
                    );

                    formNote.classList.add(
                        "error",
                        "show"
                    );


                    setTimeout(() => {

                        formNote.classList.remove(
                            "show"
                        );


                        setTimeout(() => {

                            formNote.textContent =
                                "";

                        }, 300);

                    }, 4000);

                }

            }


            // =================================================
            // ENABLE BUTTON AGAIN
            // =================================================

            finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Message";

                }

            }

        }
    );

}


// =========================================================
// RESUME BUTTON
// =========================================================

const resumeButton =
    document.getElementById("resumeBtn");


resumeButton?.addEventListener(
    "click",
    () => {

        // Make sure resume.pdf is in the same folder
        // as your HTML file

        window.open(
            "resume.pdf",
            "_blank"
        );

    }
);


// =========================================================
// CURRENT YEAR IN FOOTER
// =========================================================

const yearElement =
    document.getElementById("currentYear");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =========================================================
// GITHUB LINKS
// =========================================================

const githubLinks =
    document.querySelectorAll(
        ".github-link"
    );


githubLinks.forEach((link) => {

    link.setAttribute(
        "target",
        "_blank"
    );

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


// =========================================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// =========================================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    targetId &&
                    targetId !== "#"
                ) {

                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }

            }
        );

    });


// =========================================================
// END OF SCRIPT
// =========================================================
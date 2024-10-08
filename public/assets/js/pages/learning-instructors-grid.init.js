var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
    idFieldInput =
        ((dropzonePreviewNode.id = ""),
        dropzonePreviewNode &&
            ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
            dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
            (dropzone = new Dropzone(".instrucor-dropzone", {
                url: "https://httpbin.org/post",
                method: "post",
                previewTemplate: previewTemplate,
                previewsContainer: "#dropzone-preview",
            }))),
        document.getElementById("id-field")),
    instructorNameInput = document.getElementById("instructor-name-input"),
    totalCourseInput = document.getElementById("total-courses-input"),
    emailInput = document.getElementById("email-input"),
    studentsInput = document.getElementById("students-input"),
    experienceInput = document.getElementById("experience-input"),
    contactInput = document.getElementById("contact-input"),
    statusInput = document.getElementById("status-input"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
    statusVal = new Choices(statusInput, { searchEnabled: !1 }),
    forms = document.querySelectorAll(".tablelist-form");
Array.prototype.slice.call(forms).forEach(function (e) {
    e.addEventListener("submit", function (e) {
        e.preventDefault(),
            document.querySelector(".dz-image-preview") &&
                new DOMParser()
                    .parseFromString(
                        document.querySelectorAll(".dz-image-preview")[0]
                            .innerHTML,
                        "text/html"
                    )
                    .body.querySelector("[data-dz-thumbnail]");
        var t = document.getElementById("alert-error-msg");
        t.classList.remove("d-none"),
            setTimeout(() => t.classList.add("d-none"), 2e3);
        return 0 == document.querySelectorAll(".dz-image-preview").length
            ? !(t.innerHTML = "Please select a image")
            : "" == instructorNameInput.value
            ? !(t.innerHTML = "Please enter a instructor name")
            : emailInput.value.match(
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              )
            ? "" == totalCourseInput.value
                ? !(t.innerHTML = "Please enter a no. of course")
                : "" == experienceInput.value
                ? !(t.innerHTML = "Please enter a no. of experience")
                : "" == studentsInput.value
                ? !(t.innerHTML = "Please enter a no. of students")
                : "" == contactInput.value
                ? !(t.innerHTML = "Please enter a contact no")
                : "" != statusInput.value ||
                  !(t.innerHTML = "Please select a status")
            : !(t.innerHTML = "Please enter valid email address");
    });
});

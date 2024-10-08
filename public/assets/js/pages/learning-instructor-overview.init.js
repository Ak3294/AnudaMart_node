function getChartColorsArray(e) {
    var t = document.getElementById(e);
    if (t) {
        t = t.dataset.colors;
        if (t)
            return JSON.parse(t).map((e) => {
                var t = e.replace(/\s/g, "");
                return t.includes(",")
                    ? 2 === (e = e.split(",")).length
                        ? `rgba(${getComputedStyle(
                              document.documentElement
                          ).getPropertyValue(e[0])}, ${e[1]})`
                        : t
                    : getComputedStyle(
                          document.documentElement
                      ).getPropertyValue(t) || t;
            });
        console.warn("data-colors attribute not found on: " + e);
    }
}
var sessionChartChart = "";
function loadCharts() {
    var e;
    (e = getChartColorsArray("session_chart")) &&
        ((e = {
            series: [
                {
                    name: "Active Students",
                    data: [
                        3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29,
                        32, 41, 34, 29, 37, 64, 55, 49, 69, 78, 73, 69, 83,
                    ],
                },
                {
                    name: "New Enrollment",
                    data: [
                        10, 16, 25, 14, 29, 33, 47, 53, 41, 55, 63, 53, 66, 71,
                        79, 70, 73, 84, 92, 83, 96, 93, 101, 109, 99, 87, 93,
                        107,
                    ],
                },
            ],
            chart: { height: 350, type: "line", toolbar: { show: !1 } },
            legend: { show: !0, position: "top", horizontalAlign: "right" },
            markers: { size: 0, hover: { sizeOffset: 4 } },
            stroke: { curve: "smooth", width: 2 },
            colors: e,
            xaxis: {
                type: "datetime",
                categories: [
                    "02/01/2023 GMT",
                    "02/02/2023 GMT",
                    "02/03/2023 GMT",
                    "02/04/2023 GMT",
                    "02/05/2023 GMT",
                    "02/06/2023 GMT",
                    "02/07/2023 GMT",
                    "02/08/2023 GMT",
                    "02/09/2023 GMT",
                    "02/10/2023 GMT",
                    "02/11/2023 GMT",
                    "02/12/2023 GMT",
                    "02/13/2023 GMT",
                    "02/14/2023 GMT",
                    "02/15/2023 GMT",
                    "02/16/2023 GMT",
                    "02/17/2023 GMT",
                    "02/18/2023 GMT",
                    "02/19/2023 GMT",
                    "02/20/2023 GMT",
                    "02/21/2023 GMT",
                    "02/22/2023 GMT",
                    "02/23/2023 GMT",
                    "02/24/2023 GMT",
                    "02/25/2023 GMT",
                    "02/26/2023 GMT",
                    "02/27/2023 GMT",
                    "02/28/2023 GMT",
                ],
            },
        }),
        "" != sessionChartChart && sessionChartChart.destroy(),
        (sessionChartChart = new ApexCharts(
            document.querySelector("#session_chart"),
            e
        )).render());
}
window.addEventListener("resize", function () {
    setTimeout(() => {
        loadCharts();
    }, 250);
}),
    loadCharts();
var previewTemplate,
    dropzone,
    basicRating,
    options = {
        valueNames: [
            "course_title",
            "price",
            "duration",
            "students",
            "ratings",
            "status",
        ],
    },
    coursesListTable = new List("coursesListTable", options).on(
        "updated",
        function (e) {
            0 == e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none"),
                0 < e.matchingItems.length
                    ? (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "none")
                    : (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "block");
        }
    ),
    options = {
        valueNames: [
            "students_name",
            "students_email",
            "students_contact",
            "students_courses",
            "joined_date",
            "students_status",
        ],
    },
    studentsListTable = new List("studentsListTable", options).on(
        "updated",
        function (e) {
            0 == e.matchingItems.length
                ? (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "block")
                : (document.getElementsByClassName(
                      "noresult"
                  )[0].style.display = "none"),
                0 < e.matchingItems.length
                    ? (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "none")
                    : (document.getElementsByClassName(
                          "noresult"
                      )[0].style.display = "block");
        }
    ),
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
    editList =
        ((dropzonePreviewNode.id = ""),
        dropzonePreviewNode &&
            ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
            dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
            (dropzone = new Dropzone(".dropzone", {
                url: "https://httpbin.org/post",
                method: "post",
                previewTemplate: previewTemplate,
                previewsContainer: "#dropzone-preview",
            }))),
        document.querySelector("#basic-rater") &&
            (basicRating = raterJs({
                starSize: 22,
                rating: 0,
                step: 0.5,
                element: document.querySelector("#basic-rater"),
                rateCallback: function (e, t) {
                    this.setRating(e), t();
                },
            })),
        !1),
    reviewTitleInput = document.getElementById("reviewTitle-input"),
    reviewDescInput = document.getElementById("reviewDesc-input"),
    userNameVal = document.querySelector(".user-name-text").innerHTML,
    rating = document.getElementById("basic-rater"),
    date = new Date().toUTCString().slice(5, 16),
    forms = document.querySelectorAll(".tablelist-form");
function clearFields() {
    rating.removeAttribute("data-rating"),
        rating.setAttribute("title", ""),
        (rating.querySelector(".star-value").style.width = "0%"),
        (reviewTitleInput.value = ""),
        (reviewDescInput.value = ""),
        (document.getElementById("dropzone-preview").innerHTML = "");
}
Array.prototype.slice.call(forms).forEach(function (e) {
    e.addEventListener("submit", function (e) {
        e.preventDefault();
        var e = rating.getAttribute("data-rating"),
            t = document.getElementById("alert-error-msg");
        if (
            (t.classList.remove("d-none"),
            setTimeout(() => t.classList.add("d-none"), 2e3),
            !e)
        )
            return !(t.innerHTML = "Please select a rating");
        if ("" == reviewTitleInput.value)
            return !(t.innerHTML = "Please enter a review");
        if (!e) return !(t.innerHTML = "Please select a rating");
        if ("" == reviewDescInput.value)
            return !(t.innerHTML = "Please enter a review description");
        var r = '<div class="d-flex flex-grow-1 gap-2">';
        document
            .querySelectorAll("#dropzone-preview .dz-image-preview")
            .forEach(function (e) {
                var t = e.querySelector("[data-dz-thumbnail]"),
                    e = e.querySelector("[data-dz-name]");
                r +=
                    '<a href="#" class="avatar-md  mt-3">            <div class="avatar-title bg-light rounded">                <img src="' +
                    t.src +
                    '" alt="' +
                    e +
                    '" class="avatar-sm">            </div>        </a>';
            }),
            (r += "</div>");
        var n =
            '<li class="review-list py-2"  id="review-' +
            Math.floor(100 * Math.random()) +
            '">            <div class="border border-dashed rounded p-3">                <div class="hstack flex-wrap gap-3 mb-4">                    <div class="badge rounded-pill bg-danger-subtle text-danger mb-0">                        <i class="mdi mdi-star"></i> <span class="rate-num">' +
            parseFloat(e).toFixed(1) +
            '</span>                    </div>                    <div class="vr"></div>                    <div class="flex-grow-1">                        <p class="mb-0"><a href="#!">' +
            userNameVal +
            '</a></p>                    </div>                    <div class="flex-shrink-0">                        <span class="text-muted fs-13 mb-0">' +
            date +
            '</span>                    </div>                    <div class="flex-shrink-0">                        <a href="#!" class="badge bg-secondary-subtle text-secondary"><i class="ph-pencil align-baseline me-1"></i> Edit</a>                        <a href="#removeItemModal" class="badge bg-danger-subtle text-danger" data-bs-toggle="modal"><i class="ph-trash align-baseline"></i></a>                    </div>                </div>                <h6 class="review-title fs-md">' +
            reviewTitleInput.value +
            '</h6>                <p class="review-desc mb-0">' +
            reviewDescInput.value +
            "</p>                " +
            r +
            "            </div>        </li>";
        return (
            "" !== reviewTitleInput.value &&
            e &&
            "" !== reviewDescInput.value &&
            !editList
                ? (document
                      .getElementById("review-list")
                      .insertAdjacentHTML("afterbegin", n),
                  document.getElementById("review-close").click())
                : "" !== reviewTitleInput.value &&
                  e &&
                  "" !== reviewDescInput.value &&
                  editList &&
                  ((n = 0),
                  (n = document.getElementById("id-field").value),
                  (document
                      .getElementById(n)
                      .querySelector(".rate-num").innerHTML =
                      parseFloat(e).toFixed(1)),
                  (document
                      .getElementById(n)
                      .querySelector(".review-title").innerHTML =
                      reviewTitleInput.value),
                  (document
                      .getElementById(n)
                      .querySelector(".review-desc").innerHTML =
                      reviewDescInput.value),
                  document.getElementById("review-close").click()),
            !0
        );
    });
}),
    document
        .getElementById("addReview")
        .addEventListener("hidden.bs.modal", function () {
            clearFields();
        });
var removeProduct = document.getElementById("removeItemModal");
function editReviewList() {
    Array.from(document.querySelectorAll("#review-list .review-list")).forEach(
        function (r) {
            r.querySelector(".edit-item-list").addEventListener(
                "click",
                function (e) {
                    editList = !0;
                    var t = r.getAttribute("id");
                    (document.getElementById("id-field").value = t),
                        (reviewTitleInput.value =
                            r.querySelector(".review-title").innerHTML),
                        (reviewDescInput.value =
                            r.querySelector(".review-desc").innerHTML),
                        r.querySelectorAll(".product-img") &&
                            r
                                .querySelectorAll(".product-img")
                                .forEach(function (e) {
                                    var t = {
                                        name: e.getAttribute("alt"),
                                        size: 12345,
                                    };
                                    dropzone.options.addedfile.call(
                                        dropzone,
                                        t
                                    ),
                                        dropzone.options.thumbnail.call(
                                            dropzone,
                                            t,
                                            e.src
                                        );
                                }),
                        basicRating.setRating(
                            parseFloat(r.querySelector(".rate-num").innerHTML)
                        );
                }
            );
        }
    );
}
removeProduct &&
    removeProduct.addEventListener("show.bs.modal", function (t) {
        document
            .getElementById("remove-product")
            .addEventListener("click", function (e) {
                t.relatedTarget.closest(".review-list").remove(),
                    document.getElementById("close-modal-review").click();
            });
    }),
    editReviewList();

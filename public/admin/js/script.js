$(document).ready(function () {
    $(".sideMenuToggler").click(function () {
        $(".sideMenu").toggleClass("active");
        $(".text").toggleClass("text-active");
        $(".icon").toggleClass("icon-active");
        $(".nav-link").toggleClass("nav-link-active");
        $(".main").toggleClass("main-active");
        $(".dropdown").toggleClass("dropdown-active");
        $(".submenu_icon").toggle();
    });
    $(".smm").click(function () {
        $(".sideMenu").toggleClass("smm-active");
        $(".main").toggleClass("main-active");
    });
    $("#home").click(function () {
        $("#home_expand").text() == "expand_less"
            ? $("#home_expand").text("expand_more")
            : $("#home_expand").text("expand_less");
        $("#home_submenu").slideToggle();
    });
    $(".sideMenu-li").each(function (index) {
        $(this).hover(
            function () {
                $(this)
                    .find(".submenu_circle")
                    .css("background-color", "transparent");
            },
            function () {
                $(this).find(".submenu_circle").css("background-color", "#F80");
            }
        );
    });
});

function activeSideBar(name) {
    $("#" + name).addClass("sideMenu-li-active");
}

function logout() {
    iziToast.question({
        timeout: 20000,
        close: false,
        overlay: true,
        displayMode: "once",
        id: "question",
        zindex: 999,
        title: "Hey",
        message: "Are you sure you want to logout?",
        position: "center",
        buttons: [
            [
                "<button><b>YES</b></button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: "/admin/logout",
                    })
                        .done((res) => {
                            iziToast.info({
                                title: "Success",
                                message: res.message,
                                position: "topRight",
                            });
                            setTimeout(function () {
                                window.location.href = "/admin/login";
                            }, 1000);
                        })
                        .fail(function (xhr, status, error) {
                            iziToast.error({
                                title: "Error",
                                message: xhr.responseText,
                                position: "topRight",
                            });
                        });
                },
            ],
            [
                "<button>NO</button>",
                function (instance, toast) {
                    instance.hide(
                        {
                            transitionOut: "fadeOut",
                        },
                        toast,
                        "button"
                    );
                },
            ],
        ],
    });
}

document
    .querySelector(".pagination-next")
    .addEventListener("click", function () {
        document.querySelector(".pagination.listjs-pagination") &&
            document
                .querySelector(".pagination.listjs-pagination")
                .querySelector(".active") &&
            null !=
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active").nextElementSibling &&
            document
                .querySelector(".pagination.listjs-pagination")
                .querySelector(".active")
                .nextElementSibling.children[0].click();
    }),
    document
        .querySelector(".pagination-prev")
        .addEventListener("click", function () {
            document.querySelector(".pagination.listjs-pagination") &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active") &&
                null !=
                    document
                        .querySelector(".pagination.listjs-pagination")
                        .querySelector(".active").previousSibling &&
                document
                    .querySelector(".pagination.listjs-pagination")
                    .querySelector(".active")
                    .previousSibling.children[0].click();
        }),
    document
        .getElementById("showModal")
        .addEventListener("show.bs.modal", function (e) {
            e.relatedTarget.classList.contains("edit-item-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Edit " + e.relatedTarget.dataset.name),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML = "Update"))
                : e.relatedTarget.classList.contains("add-btn")
                ? ((document.getElementById("exampleModalLabel").innerHTML =
                      "Add " + e.relatedTarget.dataset.name),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "block"),
                  (document.getElementById("add-btn").innerHTML =
                      "Add " + e.relatedTarget.dataset.name))
                : ((document.getElementById("exampleModalLabel").innerHTML =
                      "List " + e.relatedTarget.dataset.name),
                  (document
                      .getElementById("showModal")
                      .querySelector(".modal-footer").style.display = "none"));
        }),
    document
        .querySelector("#image-input")
        .addEventListener("change", function () {
            var e = document.querySelector("#image-preview"),
                t = document.querySelector("#image-input").files[0],
                a = new FileReader();
            a.addEventListener(
                "load",
                function () {
                    e.src = a.result;
                },
                !1
            ),
                t && a.readAsDataURL(t);
        });



        function displayPP(input, el, container) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
        
                reader.onload = function (e) {
                    el.attr("src", e.target.result);
                    container.show();
                };
        
                reader.readAsDataURL(input.files[0]);
            }
        }
var previewTemplate,
    dropzone,
    ckClassicEditor = document.querySelectorAll(".ckeditor-classic"),
    dropzonePreviewNode =
        (ckClassicEditor &&
            Array.from(ckClassicEditor).forEach(function () {
                ClassicEditor.create(
                    document.querySelector(".ckeditor-classic")
                )
                    .then(function (e) {
                        e.ui.view.editable.element.style.height = "180px";
                    })
                    .catch(function (e) {
                        console.error(e);
                    });
            }),
        document.querySelector("#dropzone-preview-list"));
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone("#dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview",
        }))),
    ((dropzonePreviewNode = document.querySelector(
        "#dropzone-preview-list2"
    )).id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone("#dropzone2", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview2",
        })));
(dropzonePreviewNode = document.querySelector("#dropzone-preview-list3")),
    (dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone("#dropzone3", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview3",
        })));
dropzonePreviewNode = document.querySelector("#dropzone-preview-list4");
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone("#dropzone4", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview4",
        })));
dropzonePreviewNode = document.querySelector("#dropzone-preview-list5");
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone("#dropzone5", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#dropzone-preview5",
        })));

var previewTemplate,
    dropzone,
    dropzonePreviewNode = document.querySelector("#category-preview-list");
(dropzonePreviewNode.id = ""),
    dropzonePreviewNode &&
        ((previewTemplate = dropzonePreviewNode.parentNode.innerHTML),
        dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode),
        (dropzone = new Dropzone(".category-dropzone", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#category-preview",
        })));

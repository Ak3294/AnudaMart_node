var dropzone,
    previewTemplate,
    video,
    dropzonePreviewNode = document.querySelector("#dropzone-preview-list"),
    videoPreviewNode =
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
        document.querySelector("#video-preview-list"));
(videoPreviewNode.id = ""),
    videoPreviewNode &&
        ((previewTemplate = videoPreviewNode.parentNode.innerHTML),
        videoPreviewNode.parentNode.removeChild(videoPreviewNode),
        (video = new Dropzone(".video", {
            url: "https://httpbin.org/post",
            method: "post",
            previewTemplate: previewTemplate,
            previewsContainer: "#video-preview",
        })));

function displayPP(input, container) {
    container.html("");
    if (input.files && input.files.length > 0) {
        Array.from(input.files).forEach((file) => {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = $("<img />", {
                    src: e.target.result,
                    style: "margin: 5px; width: 100px; height: 100px;",
                });
                container.append(img);
            };
            reader.readAsDataURL(file);
        });
        container.show();
    } else {
        container.hide();
    }
}
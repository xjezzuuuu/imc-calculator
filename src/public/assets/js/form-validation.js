// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              axios
                .post("send-email", {
                  data: $("#form-1").serializeJSON(),
                })
                .then(function (res) {
                  if (res.status == 200) {
                    $.toast({
                      heading: "Email enviado",
                      text: "La información fue enviada a su profesora.",
                      position: "top-right",
                      loaderBg: "#ff6849",
                      icon: "success",
                      hideAfter: 3500,
                    });
                    setTimeout("location.reload(true);", 4000);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            form.classList.add("was-validated");
          },
          false,
        );
      });
    },
    false,
  );
})();

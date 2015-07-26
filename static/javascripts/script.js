(function($) {
    "use strict"; // Start of use strict

    $( document ).ready(function() {

        // Protect against CSRF using a csrf_token
        // For more information: https://docs.djangoproject.com/en/dev/ref/csrf/
        var csrftoken = $.cookie('csrftoken');
        function csrfSafeMethod(method) {
          // these HTTP methods do not require CSRF protection
          return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
        }

        // Setup ajax 
        $.ajaxSetup({
          beforeSend: function(xhr, settings) {
              if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                  xhr.setRequestHeader("X-CSRFToken", csrftoken);
              }
          },
        });

        $(".checkboxinput").bootstrapSwitch();
        $('#div_id_gender select').prepend('<option disabled selected> Select gender </option>');
    
        $(document).on('click', '#register', function (e) {
            var form = '#registration-form';
            console.log($(form).serialize());
            $.ajax({
                processData: false,
                contentType: false,
                url: "/register/",
                type: "POST",
                data: new FormData($(form)[0]),
                success: function(data) {
                    $(form).replaceWith(data['form_html']);
                    $(".checkboxinput").bootstrapSwitch();
        $('#div_id_gender select').prepend('<option disabled selected> Select gender </option>');

                    $('html, body').stop().animate({
                        scrollTop: ($(form).offset().top - 50)
                        }, 1250, 'easeInOutExpo');
                    if (!(data['success'])) {
                        // Here we replace the form, for the
                        $.snackbar({content: 'There were errors.' });
                    }
                    else {
                        // Here you can show the user a success message or do whatever you need
                        $.snackbar({content: 'Registration successful.' });
                        $(form).find('.success-message').show();
                    }
                },
                error: function () {
                    $(form).find('.error-message').show();
                }
            });
            e.preventDefault();
            console.log('Cool');

        } );
    });

})(jQuery); // End of use strict
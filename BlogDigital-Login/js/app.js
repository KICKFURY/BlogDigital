
$.holdReady(true);

const sdkUrl = ((window.location.protocol === 'file:')
  ? 'http:'
  : window.location.protocol) + '//api.backendless.com/sdk/js/latest/backendless.min.js'

$.getScript(sdkUrl, () => {
  ;(async function () {
    $.holdReady(false);

    ;(function ($) {
      $.fn.wrongInput = function () {
        return this.each(function () {
          const $this = $(this)
          const $field = $this.is('input.txt') || $this.is('input[type=text]') ? $this : $this.find('input.txt')

          const rmWrng = function ($field) {
            $field.removeClass('wronginput');
          };

          if ($field.hasClass('wronginput')) {
            return
          }

          $field.addClass('wronginput');
          $field.one('input', function () {
            rmWrng($field);
          });
        });
      };
    })(Zepto);

    function createPopup(text, type) {
      const $popup = $("<div class='popup'></div>")
      const $body = $('body');

      if (type) {
        $popup.addClass(type);
      }
      $popup.text(text);
      if ($body.find('.popup').length) {
        $('.popup').remove();
      }
      $body.append($popup);
      $popup.animate({
        right  : '20px',
        opacity: 0.8
      }, 500);
      setTimeout(function () {
        $popup.animate({
          right  : '-' + $popup.width() + 'px',
          opacity: 0
        }, 500);
        setTimeout(function () {
          $popup.remove();
        }, 500);
      }, 3000);
    }

    function userLoggedInStatus(user) {
      console.log('user has logged in', user);
      $('.login').hide();
      $('.logined').show();
    }

    
//Backendless: defaults
const APPLICATION_ID = '2395CDAE-3725-4E9C-FF38-6A660F40BE00';
const API_KEY = '6B2BAF75-935A-4DFD-B668-4D3639422CAA';
Backendless.serverURL = "https://api.backendless.com";
Backendless.initApp(APPLICATION_ID, API_KEY);

if (!APPLICATION_ID || !API_KEY) {
  alert(
    'Missing application ID or api key arguments. ' +
    'Login to Backendless Console, select your app and get the ID and key from the Manage > App Settings screen. ' +
    'Copy/paste the values into the Backendless.initApp call located in BlogDigital-Login.js'
  );
}
    
        const FACEBOOK_APP_ID = null;
    
        const GOOGLE_CLIENT_ID = null;
    

    let stayLoggedIn = Backendless.LocalCache.get(Backendless.LocalCache.Keys.STAY_LOGGED_IN)

    if (await Backendless.UserService.isValidLogin()) {
      $('.login').hide();
      $('.logined').show();      
    } else {
      Backendless.setCurrentUserToken(null)
    }

    function gotError(err) { // see more on error handling
      $('input').addClass('redBorder');

      console.error(err);

      if (err.code) {
        createPopup(err.message || err, 'error');
        console.log('error message - ' + err.message);
        console.log('error code - ' + err.statusCode);
      }
    }

    function userLoggedOut() {
      location.reload();
    }

    $('#logout').on('click', function () {
      Backendless.UserService
        .logout()
        .then(userLoggedOut, gotError);
    });

                                
    function gotErrorRegister(err) { // see more on error handling
      $('input').each(function () {
        if (err.message.indexOf($(this).attr('id')) !== -1) {
          $(this).addClass('redBorder');
        }
      });

      createPopup(err.message, 'error');
      console.log('error message - ' + err.message);
      console.log('error code - ' + err.statusCode);
    }

    function gotErrorRestore(err) { // see more on error handling
      $('input').addClass('redBorder');
      createPopup(err.message, 'error');
      console.log('error message - ' + err.message);
      console.log('error code - ' + err.statusCode);
    }

    function userRegistered(user) {
      console.log('user has been registered');
      $('.thankTemp').show();
      $('.regForm').hide();
    }

    function success() {
      $('.restorePass').hide();
      $('.thankTemp').show();
    }

    $('#remember').prop('checked', stayLoggedIn);

    $('#remember').on('change', function () {
      stayLoggedIn = $('#remember').prop('checked');
    });

    $('#user_login').on('click', function () {
      const username = $('#login').val();
      const password = $('#password').val();

      $('input').on('keydown', function () {
        $('input').removeClass('redBorder');
      }); 

      if (!username) {
        createPopup('Identity cannot be empty!', 'error');
        $('#login').addClass('redBorder');

        return false;
      }

      if (!password) {
        createPopup('Password cannot be empty!', 'error');
        $('#password').addClass('redBorder');

        return false;
      }

      Backendless.UserService
        .login(username, password, stayLoggedIn)
        .then(userLoggedInStatus, gotError);
    });

    $('.double, .int').on('input', function (e) {
      const $el = $(this),
        value = $el.val().trim(),
        pattern = /^((-(([1-9]+\d*(\.\d+)?)|(0\.0*[1-9]+)))|((0|([1-9]+\d*))(\.\d+)?))([eE](\+|\-)?\d+)?$/;

      if (value.search(pattern) === -1) {
        $el.val("");
      }
    });

    $('.date').datepicker({
      beforeShow: function (input, inst) {
        setTimeout(function () {
          inst.dpDiv.css({ left: 50 + '%', top: 218, marginLeft: -30 });
        }, 0);
      }
    });

    $('#register').on('click', function () {
      const user = new Backendless.User();

      $('input').each(function () {
        const $el = $(this)
        const value = $el.val().trim();

        if (value) {
          user[$el.attr('id')] = value;
        }
      });

      Backendless.UserService
        .register(user)
        .then(userRegistered, gotErrorRegister);
    });

    $('#restore').on('click', function (e) {
      e.preventDefault();

      $('.restorePass input').removeClass('redBorder');
      $('.login').hide();
      $('.restorePass').show();
    });

    $('#restorePassword').on('click', function () {
      const login = $('#loginRestore').val();

      $('input').on('keydown', function () {
        $('input').removeClass('redBorder');
      });

      if (!login) {
        createPopup('Enter username!', 'error');
        $('input').addClass('redBorder');

        return false;
      }

      Backendless.UserService
        .restorePassword(login)
        .then(success, gotErrorRestore);
    });
                                
    function callback(user) {
      $('.logined').show();
      $('.login').hide();

      console.log(user);
    }

    
    $('#fb_login').on('click', function () {
      if (!FB) {
        return alert('Facebook SDK not found');
      }

      if (!FACEBOOK_APP_ID) {
        return alert(
          'Missing Facebook App Id. \n' +
          'Set your Facebook App Id in Social Settings of your app and then generate sample again'
        );
      }

      // description of options parameter: https://developers.facebook.com/docs/reference/javascript/FB.login/v2.9
      const fbLoginOptions = { scope: 'email' };

      FB.init({
        appId  : FACEBOOK_APP_ID,
        cookie : true,
        xfbml  : true,
        version: 'v2.8'
      });

      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          loginWithFacebookSDK(response);
        } else {
          FB.login(function (response) {
            loginWithFacebookSDK(response);
          }, fbLoginOptions);
        }
      });
    });

    function loginWithFacebookSDK(loginStatus) {
      const accessToken = loginStatus && loginStatus.authResponse && loginStatus.authResponse.accessToken;
      const fieldsMapping = { email: 'email' };

      Backendless.UserService
        .loginWithFacebookSdk(accessToken, fieldsMapping, stayLoggedIn)
        .then(callback, gotError);
    }
                                
    $('#tw_login').on('click', function () {
      const fieldsMapping = { email: 'email', displayName: 'name' };

      Backendless.UserService
        .loginWithTwitter(fieldsMapping, stayLoggedIn)
        .then(callback, gotError);
    });
                                
    $('#gplus_login').on('click', function () {
      if (!gapi) {
        return alert('Google+ SDK not found');
      }

      if (!GOOGLE_CLIENT_ID) {
        return alert(
          'Missing Google client ID. \n' +
          'Set your Google client ID in Social Settings of your app and then generate sample again'
        );
      }

      gapi.auth.authorize({
        client_id: GOOGLE_CLIENT_ID,
        scope    : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
      }, function (response) {
        const accessToken = response && response.access_token;
        const error = response && response.error;
        const errorMessage = error && response.details;

        if (errorMessage) {
          return createPopup(errorMessage, 'error');
        }

        loginWithGooglePlusSDK(accessToken);
      });
    });

    function loginWithGooglePlusSDK(accessToken) {
      const fieldsMapping = { email: 'email' };

      Backendless.UserService
        .loginWithGooglePlusSdk(accessToken, fieldsMapping, stayLoggedIn)
        .then(callback, gotError);
    }
                                
  })()
});

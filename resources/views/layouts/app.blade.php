
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Page Financial -  @yield('title')</title>

    <link rel="stylesheet" href="{{asset('assets/css/themify-icons.css')}}">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('assets/images/favicon.png')}}">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="{{asset('assets/css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    @yield('style')

</head>

<body class="color-theme-blue" id="page">

    <div class="preloader"></div>

    <div class="main-wrapper">

    @yield('content')

    </div>

    <script
  src="https://code.jquery.com/jquery-migrate-3.3.2.js"
  integrity="sha256-BDmtN+79VRrkfamzD16UnAoJP8zMitAz093tvZATdiE="
  crossorigin="anonymous"></script>
    <script src="{{asset('assets/js/plugin.js')}}"></script>
    <script src="{{asset('assets/js/apexcharts.min.js')}}"></script> 
    <script src="{{asset('assets/js/chart.js')}}"></script> 
    <script src="{{asset('assets/js/scripts.js')}}"></script>
    <script src="{{ asset('js/app.js') }}"></script>

    <!-- <script>
        $(".dashboard-tab").height( $('.dashboard-nav').height() - 18 );
        $(".dashboard-tab").niceScroll({
            cursorcolor: "#999", // change cursor color in hex
      });
    </script> -->
    @yield('script')

    
</body>


</html>
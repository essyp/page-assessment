@extends( 'layouts.app' )

@section('title','Wallet System')

@section('style')
<link rel="stylesheet" href="{{asset('assets/css/toastr.min.css')}}">
<link rel="stylesheet" href="{{asset('assets/css/waitMe.min.css')}}">
@endsection

@section('content')

    <div id="root"></div>
  
@endsection

@section('script')
<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script src="{{asset('assets/js/toastr.min.js')}}"></script>
    <script src="{{asset('assets/js/waitMe.min.js')}}"></script>
    <script>
        function open_loader(container) {
			$(container).waitMe({
				effect : 'bounce',
				text : '',
				bg : 'rgba(255,255,255,0.7)',
				color : '#000',
				maxSize : '',
				waitTime : '-1',
				textPos : 'vertical',
				fontSize : '',
				source : '',
				onClose : function() {}
			});
		}

		function close_loader(container) {
			$(container).waitMe("hide");
		}
    </script>
@endsection
<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Config;

class MailHelper
{
    protected $auth;

    public function __construct($email, $title, $template, $data)
    {
        $this->email = $email;
        $this->template = $template;
        $this->data = $data;
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function sendMail()
    {
        Mail::send($this->template, ['data' => $this->data], function ($message) {
            $message->to($this->email)
                ->subject($this->title);
            $message->from($this->email);
        });
    }

    public function sendUserMail()
    {
        Mail::send($this->template, $this->data, function ($message) {
            $message->to($this->email)
                ->subject($this->title);
            $message->from($this->email);
        });
    }
}

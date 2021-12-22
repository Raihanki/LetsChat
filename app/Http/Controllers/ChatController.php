<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        $chats = Chat::where(
            fn ($chat) => $chat->where('sender_id', Auth::user()->id)->where('reciver_id', $user->id)
        )->orWhere(
            fn ($chat) => $chat->where('sender_id', $user->id)->where('reciver_id', Auth::user()->id)
        )->get();
        return inertia('Show', [
            "user" => $user,
            "chats" => $chats
        ]);
    }

    public function store(Request $request, User $user)
    {
        $data = $request->validate([
            "message" => "required"
        ]);
        $chat = Auth::user()->chats()->create([
            "reciver_id" => $user->id,
            "message" => $data['message']
        ]);
        broadcast(new MessageSent($chat->load('reciver')))->toOthers();
        return back();
    }
}

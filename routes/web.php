<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/chat/{user:username}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chat/{user:username}', [ChatController::class, 'store'])->name('chats.store');
    Route::redirect('/dashboard', '/home');
    Route::get('/', HomeController::class);
});

require __DIR__ . '/auth.php';

import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: ChatComponent
    },
    {
        path: "**",
        redirectTo: "/"
    }
];

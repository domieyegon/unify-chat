import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/account/register/register.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
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

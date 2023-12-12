import { Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/account/register/register.component';
import { ActivateComponent } from './components/account/activate/activate.component';
import { SetupComponent } from './components/account/setup/setup.component';

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
        path: "activate/:key",
        component: ActivateComponent
    },
    {
        path: "setup",
        component: SetupComponent
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

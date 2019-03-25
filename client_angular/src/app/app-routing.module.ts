import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./shared/services/auth-guard.service";

const routes: Routes = [
    {
        path:         'games',
        loadChildren: './game/game.module#GameModule',
        canLoad:      [AuthGuard]
    },
    {
        path:         'supports',
        loadChildren: './support/support.module#SupportModule',
        canLoad:      [AuthGuard]
    },
    {
        path:         'upgrades',
        loadChildren: './upgrade/upgrade.module#UpgradeModule',
        canLoad:      [AuthGuard]
    },
    {
        path:         'login',
        loadChildren: './login/login.module#LoginModule',
        canLoad:      [AuthGuard]
    },
    {
      path:         'register',
      loadChildren: './register/register.module#RegisterModule',
      canLoad:      [AuthGuard]
    },
    {path: '**', redirectTo: 'games'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash:            true,
        preloadingStrategy: PreloadAllModules
    })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

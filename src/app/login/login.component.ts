import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import { RouterExtensions } from "nativescript-angular/router";
import { NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page"
import { User } from "../model/user/shared/user.model";
import { UserService } from "../model/user/shared/user.service";

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    user: User;
    isLoggingIn = true;
    processing=false;

    constructor(private _routerExtensions: RouterExtensions, 
                private zone: NgZone, 
                private page: Page,
                private userService: UserService,) {
                    this.user = new User();
                    this.user.email="";
                    this.user.password="";
                    this.user.confirmPassword="";
                    this.page.actionBarHidden = true;
                    this.page.backgroundSpanUnderStatusBar = true;
                    this.page.className = "page-login-container";
                    this.page.statusBarStyle = "dark";
    }


    toggleDisplay(){
        this.isLoggingIn = !this.isLoggingIn
    }

    submit(){
        if (!this.user.email || !this.user.password) {
            this.alertMsj("Porfavor complete su email y/o contraseña");
            return;
        }
        
        this.processing=true;
        if(this.isLoggingIn){
            this.login()
        } else{
            this.register();
        }
    }

    private login(){
        this.userService.login(this.user)
            .then(() => {
                this.processing = false;
                this.navigateHome();
            })
            .catch(() => {
                this.processing = false;
                this.alertMsj("No se encontro una cuenta asociada a su email");
            });
    }

    private register(){}

    private alertMsj(msj: string){
        return alert({
            title: "App Base",
            okButtonText: "Ok",
            message: msj
        });
    }


    // login() {
    //     if (Kinvey.User.getActiveUser() == null) {
    //         Kinvey.User.loginWithMIC()
    //             .then((user: Kinvey.User) => {
    //                 this.navigateHome();
    //                 console.log("user: " + JSON.stringify(user));
    //             })
    //             .catch((error: Kinvey.BaseError) => {
    //                 alert("An error occurred. Check your Kinvey settings.");
    //                 console.log("error: " + error);
    //             });
    //     } else {
    //         this.navigateHome();
    //     }
    // }

    private navigateHome() {
        this.zone.run(() => {
            this._routerExtensions.navigate(["home"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 350,
                    curve: "ease"
                }
            });
        });
    }

}

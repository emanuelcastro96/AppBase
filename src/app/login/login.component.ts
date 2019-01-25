import { Component, ViewChild, ElementRef } from "@angular/core";
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
    email: string;
    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;
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

    private register(){
        if (this.user.password != this.user.confirmPassword) {
            this.alertMsj("Las contraseñas no coinciden");
            return;
        }

        this.userService.register(this.user)
            .then(()=>{
                this.processing = false;
                this.isLoggingIn = true;
                this.alertMsj("Su cuenta se creo satisfactoriamente");
                this.navigateHome();
            })
            .catch(()=>{
                this.processing=false;
                this.alertMsj("Hubo un problema al crear su cuenta");
            });
        
    }

    private alertMsj(msj: string){
        return alert({
            title: "App Base",
            okButtonText: "Ok",
            message: msj
        });
    }

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

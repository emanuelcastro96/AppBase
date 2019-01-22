// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app/app.module";
import "./app/shared/kinvey.common";

enableProdMode();
platformNativeScriptDynamic({ startPageActionBarHidden: true }).bootstrapModule(AppModule);

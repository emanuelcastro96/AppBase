import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from './user.model';
import { Kinvey } from 'kinvey-nativescript-sdk';

@Injectable()
export class UserService {
	login(user: User){
		return Kinvey.User.login(user.email, user.password)
			.catch(this.errorHandler);
	}

	errorHandler(error: Kinvey.BaseError){
		console.error("error: " + error.message);
		return Promise.reject(error.message);
	}
}
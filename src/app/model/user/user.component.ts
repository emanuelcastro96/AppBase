import { Component, OnInit } from '@angular/core';

import { User } from './shared/user.model';
import { UserService } from './shared/user.service';

@Component({
	moduleId: module.id,
	selector: 'user',
	templateUrl: 'user.component.html',
	providers: [UserService]
})

export class UserComponent implements OnInit {
	user: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {}
}
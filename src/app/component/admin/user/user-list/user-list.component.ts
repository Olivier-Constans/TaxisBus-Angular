import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../service/user.service';
import { User } from '../../../../bean/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addHero({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(hero: User): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.userService.deleteHero(hero).subscribe();
  }*/

}

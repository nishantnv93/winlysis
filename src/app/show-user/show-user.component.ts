import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {

  hostName: string;
  userData: any;
  isUserDataRendered: boolean = false;

  constructor(private route: ActivatedRoute,
    public userAuthService: UserService) { }

  ngOnInit() {
    this.hostName = this.route.snapshot.queryParamMap.get("email");
    this.route.queryParamMap.subscribe(queryParams => {
      this.hostName = queryParams.get("email");
      this.getUSerData(this.hostName);
    });
  }

  getUSerData(hostName: string) {
    this.userAuthService.getUser(hostName)
      .get()
      .pipe(
        map(changes =>
          this.userData
          = changes.docs.map(c =>
            ({ key: c.id, ...c.data() })
          )
        )
      ).subscribe(userInfo => {
        this.userData = userInfo[0];
        this.isUserDataRendered = true;
        return this.userData;
      });
  }
}

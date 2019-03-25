import { Component, OnInit } from "@angular/core";
import {User} from "../shared/model/user";
import {AuthService} from "../shared/services/rest/auth.rest-service";
import {error} from "selenium-webdriver";

@Component({
    selector: "login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  user: User = new User();
  isLoginSuccess: boolean = false;

    constructor(private authService: AuthService) {
       
    }

    ngOnInit(): void {
        
    }

  onLogin() {
      this.authService.login(this.user)
        .subscribe(res => {
          if(res) {
            this.isLoginSuccess = true
          }
        }, error => {
          console.log("LOGIN ERROR: " + error);
        })
  }
}

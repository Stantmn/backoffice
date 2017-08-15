import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from '../../services/account.service';
import { User } from '../../classes/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AccountService]
})
export class LoginComponent implements OnInit {
    public user: User;
    private errorMessage: any;
    public emailMessage: string;
    public passwordMessage: string;

    constructor(private AccountService: AccountService, private router: Router) {
        this.user = new User;
        this.router = router;
        this.emailMessage = "";
        this.passwordMessage = "";
        localStorage.removeItem('token');
    }

    ngOnInit() {

    }

    onLoggedin() {
        if(!this.user.email) {
            this.emailMessage = "Please fill all required fields";
        }else if (!this.user.password){
            this.passwordMessage = "Please fill all required fields";
        }else{
            this.emailMessage = "";
            this.passwordMessage = "";
            this.AccountService.signIn(this.user)
                .map((res) => {
                    return res.json().data;
                })
                .subscribe(
                    response =>{
                        localStorage.setItem('username', response.name);
                        localStorage.setItem('token', response.token);
                        this.router.navigate(['']);
                    },
                    error => {
                        this.errorMessage = <any>error;
                        if(this.errorMessage.status == 404){
                            this.emailMessage = this.errorMessage.statusText;
                        }else if(this.errorMessage.status == 403){
                            this.passwordMessage = this.errorMessage.statusText;
                        }

                    }
                );
        }
    }

}

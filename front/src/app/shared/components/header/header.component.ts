import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [AccountService]
})
export class HeaderComponent implements OnInit {
    public username: string;

    constructor(private AccountService: AccountService, private router: Router) {
        this.username = localStorage.getItem('username');

    }

    ngOnInit() {
        this.checkToken();
    }

    checkToken = function () {
        this.AccountService.checkToken()
            .map(res => res.json())
            .subscribe(
                data => {
                    if (!data.data) {
                        this.router.navigate(['/login']);
                    }
                },
                err => {
                    if (err.status == 403) {
                        this.router.navigate(['/login']);
                    }
                }
            );
    };

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
}

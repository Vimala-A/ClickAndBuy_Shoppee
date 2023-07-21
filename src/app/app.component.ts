import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'shoppe-cart';
    // isLoggedIn: boolean = false;
    showDivSec: boolean = false;

    public ngOnInit(): void {
        // this.isLoggedIn = Boolean(localStorage.getItem('userEmail'));
    }

    public isLoggedIn(): boolean {
        return  Boolean(localStorage.getItem('userEmail'));
    }

    public showDiv():void {
        this.showDivSec = true;
       
    }
    
}

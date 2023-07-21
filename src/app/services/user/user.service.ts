import { Injectable } from '@angular/core';
import { appConfig} from 'src/shope-cart-app-config';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    public userEmail: string = ''
    public isAdmin: boolean = false;
    constructor() {
        this.userEmail = localStorage.getItem('userEmail') || '';
      
    }

    public getUserEmail(): any {
        if (!this.userEmail) {
            return localStorage.getItem('userEmail');
        }
        return this.userEmail;
    }

    public getUserName(): string {
        return this.splitEmail()?.[0]; // Since we are using email to login, before @domain.com, considering as UserName
    }
    public getUserEmailDomainAddress(): string {
        return this.splitEmail()[1]; // To check the admin access, we are considering after @domain name value
    }
    public splitEmail(): string[] {
        return this.getUserEmail() ? this.getUserEmail().split('@') : [];
    }
    public isAdminUser(): boolean {
        const domainName = this.getUserEmailDomainAddress()?.toLowerCase();
        this.isAdmin = Boolean(domainName?.startsWith(appConfig.ADMIN_EMAIL_DOMAIN)); // Considering username@blindmatrix.com as an Admin user
        localStorage.setItem('isAdmin',JSON.stringify(this.isAdmin));
        return this.isAdmin;
        
    }
}

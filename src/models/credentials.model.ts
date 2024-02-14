export class Credentials {
    static MAX_SIZE_PASSWORD = 8;

    private readonly mail: string;
    private readonly password: string;

    constructor(mail: string, password: string) {
        this.mail = mail;
        this.password = password;
    }
    isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !(!this.mail.trim() || !emailRegex.test(this.mail));
    }

    isValidPassword(): boolean {
        return this.password.length >= Credentials.MAX_SIZE_PASSWORD;
    }
}
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ENV } from '../../../environments/env.generated';

@Component({
    selector: 'app-verify-email-page',
    imports: [RouterLink],
    templateUrl: './verifyEmailPage.html',
})

export class VerifyEmailPage {
    private http = inject(HttpClient);
    private route = inject(ActivatedRoute);

    verifyEmailSignal = signal({});
    verifyEmailState = this.verifyEmailSignal() as any;
    result = this.verifyEmailState.result

    ngOnInit() {
        const urlToken = this.route.snapshot.paramMap.get('token')!
        const bodyReq = {
            token: decodeURIComponent(urlToken),
        }

        this.http.post(`${ENV.APP_SERVER}/api/verifyEmail`, bodyReq).subscribe({
            next: (res) => {
                console.log("verifyEmail", res);
                this.verifyEmailSignal.set(res);

            },
            error: (error) => {
                this.verifyEmailSignal.set(error);
            },
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../components/message-display/message-display';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay],
    templateUrl: './CandidatesPage.html',
})
export class CandidatesPage {
    private http = inject(HttpClient);

    columnsToDisplay = [
        'profilePicture',
        'name',
        'curriculumVitae',
        'phoneNumber',
        'linkedIn',
        'archived',
        'hired',
        'rejected',
        'fired',
        'button1',
        'button2',
        'button3',
        'button4',
        'button5',
    ];

    results = signal({});


    ngOnInit() {
        this.http.post("api/getCandidates", {}).subscribe({
            next: (res) => {
                console.log("getCandidates", res);
                this.results.set(res);

            },
            error: (error) => {
                this.results.set(error);
            },
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../components/message-display/message-display';
import { TableComponent } from "../../../components/table/table";
import { useTranslation } from '../../../utils/translation/useTranslation';
import { candidatesColumnDef } from './customerTableDataProps';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './CandidatesPage.html',
})
export class CandidatesPage {
    private http = inject(HttpClient);
    translation = useTranslation("candidates");

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

    signal = signal({});
    results = this.signal() as any;
    tableColumnsDef = candidatesColumnDef;

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

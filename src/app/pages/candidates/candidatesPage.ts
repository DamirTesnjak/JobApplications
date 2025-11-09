import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../components/message-display/message-display';
import { TableComponent } from "../../../components/table/table";
import { candidatesColumnDef } from './customerTableDataProps';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { ITableData } from '../../../components/message-display/type';
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';

@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './CandidatesPage.html',
    styleUrl: '../../../styles/global/globals.module.scss'
})
export class CandidatesPage {
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("candidates", this.localeService.languageString);

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
    results = this.signal() as {
        [x: string]: ITableData[];
    };
    tableColumnsDef = candidatesColumnDef;

    ngOnInit() {
        this.http.post("api/getCandidates", {
            locale: this.localeService.languageString
        }).subscribe({
            next: (res) => {
                console.log("getCandidates", res);
                this.signal.set(res);

            },
            error: (error) => {
                this.signal.set(error);
            },
        });
    }
}

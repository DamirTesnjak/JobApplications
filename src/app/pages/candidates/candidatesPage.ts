import { HttpClient } from '@angular/common/http';
import { Component, inject, Signal, signal } from '@angular/core';
import { MessageDisplay } from '../../../components/message-display/message-display';
import { TableComponent } from "../../../components/table/table";
import { candidatesColumnDef } from './customerTableDataProps';
import { useTranslation } from '../../../utils/translation/useTranslation';
import { ITableData } from '../../../components/message-display/type';
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';
import { ICandidateSchema } from '../../../utils/dbConfig/models/candidateModel';

type IResponse = {
    candidates: ICandidateSchema[];
    success: boolean;
    successMessage: string;
}
@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './CandidatesPage.html',
    styleUrl: '../../../styles/global/globals.module.scss'
})
export class CandidatesPage {
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    translation = useTranslation("candidates", this.localeService.getLocale());

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

    candidates: ICandidateSchema[] | [] = [];
    results = signal<any>({});

    tableColumnsDef = candidatesColumnDef;

    ngOnInit() {
        const locale = this.localeService.getLocale()
        this.http.post("api/getCandidates", {
            locale: locale()
        }).subscribe({
            next: (res) => {
                const response = res as IResponse;
                this.results.set(response);

            },
            error: (error) => {
                this.results.set(error);
            },
        });
    }
}

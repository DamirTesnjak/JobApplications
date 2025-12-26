import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { MessageDisplay } from '../../../components/message-display/message-display';
import { TableComponent } from "../../../components/table/table";
import { candidatesColumnDef } from './customerTableDataProps';
import { DetectLocaleChangeService } from '../../../utils/translation/detectLocaleChange.service';
import { ICandidateSchema } from '../../../utils/dbConfig/models/candidateModel';
import { ENV } from '../../../environments/env.generated';
import { MatTableDataSource } from '@angular/material/table';

type IResponse = {
    candidates: ICandidateSchema[];
    success: boolean;
    successMessage: string;
}
@Component({
    selector: 'app-create-candidate-page',
    imports: [MessageDisplay, TableComponent],
    templateUrl: './candidatesPage.html',
    styleUrl: '../../../styles/global/globals.module.scss'
})
export class CandidatesPage {
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    private _dataSource: MatTableDataSource<ICandidateSchema> = new MatTableDataSource<ICandidateSchema>([]);

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

    results = signal<ICandidateSchema[]>([]);
    
    tableColumnsDef = candidatesColumnDef;

    ngOnInit() {
        const locale = this.localeService.getLocale()
        this.http.post(`${ENV.APP_SERVER}/api/getCandidates`, {
            locale: locale()
        }).subscribe({
            next: (res) => {
                const response = res as IResponse;
                console.log('Get Candidates Response:', response.candidates);
                this.results.set(response.candidates);
            },
            error: (error) => {
                this.results.set(error);
            },
        });
    }

    dataSource = computed(() => {
    this._dataSource.data = this.results();
        return this._dataSource;
    });

    data = computed(() => {
        return this.results();
    });
}

import { Component, EventEmitter, inject, Input, Output, signal, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Button } from '../button/button.component';
import { initialStateCompanyEmailConfigs } from '../../app/state/companyEmailConfigs/companyEmailConfigs.reducers';
import flattenObject, { IObjectToFlat } from '../../utils/methods/flattenObject';
import { InputComponent } from '../input/input';
import { StatusDisplay } from '../status-display/status-display';
import { useTranslation } from '../../utils/translation/useTranslation';
import { initialStateCandidate } from '../../app/state/candidate/candidate.reducer';
import { initialStateHrUser } from '../../app/state/hrUser/hrUser.reducer';
import { Store } from '@ngrx/store';
import { stateSelector } from '../../utils/stateSelector/stateSelector';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetectLocaleChangeService } from '../../utils/translation/detectLocaleChange.service';
@Component({
    selector: 'app-edit-form',
    imports: [Button, InputComponent, StatusDisplay, CommonModule, FormsModule],
    templateUrl: './edit-form.html',
    styleUrl: './edit-form.scss'
})
export class EditForm {
    private readonly store = inject(Store);
    private http = inject(HttpClient);
    private localeService = inject(DetectLocaleChangeService);

    @Input() id: string = "";
    @Input() stateModel!:
        | typeof initialStateCandidate
        | typeof initialStateHrUser
        | typeof initialStateCompanyEmailConfigs;
    @Input() storeSlice!: string;
    @Input() editable: boolean = false;
    @Input() newProfile: boolean = false;
    @Input() showUploadCVButton: boolean = false;
    @Input() showUploadPictureButton: boolean = false;
    @Input() hrForm: boolean = false;
    @Input() serverActionName: string = "";

    @Output() change = new EventEmitter<Event>();

    actionResponse = signal<any>({});
    stateModelKeyAndValues: any;

    stateModelKeys!: string[];
    fieldsToDisplayKeys!: string[];
    selectedFile: File | null = null;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['stateModel'] || changes['storeSlice']) {
            this.stateModelKeyAndValues = stateSelector(this.storeSlice, this.store);

            this.stateModelKeys = Object.keys(flattenObject(this.stateModel));
            this.fieldsToDisplayKeys = this.stateModelKeys.filter(
                (stateModelKey) =>
                    stateModelKey !== 'data' &&
                    stateModelKey !== 'contentType' &&
                    stateModelKey !== 'id',
            )
        }
    }

    translation = useTranslation("editForm", this.localeService.getLocale());

    flattenedObjects(stateModelKey: string) {
        return this.newProfile
            ? flattenObject(initialStateCandidate)[stateModelKey]
            : flattenObject(this.stateModelKeyAndValues() as unknown as IObjectToFlat)[stateModelKey];
    };

    displayDefaultValue(field: string) {
        if (this.actionResponse() && this.actionResponse().prevState) {
            return this.actionResponse().prevState[field];
        }
        return "";
    };

    handleFormAction(event: Event): void {
        console.log("HANDLE FORM ACTION FIRED ✅");
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);

        if (this.selectedFile?.type === 'application/pdf') {
            formData.append("file", this.selectedFile);
        }
        if (this.selectedFile?.type.includes("image")) {
            formData.append("profilePicture", this.selectedFile);
        }

        formData.append("locale", this.localeService.getLocale()());

        console.log('formData', formData);

        this.http.post(`api/${this.serverActionName}`, formData).subscribe({
            next: (res) => {
                console.log(`${this.serverActionName}`, res);
                this.actionResponse.set(res);
            },
            error: (error) => {
                console.log(`${this.serverActionName}`, error);
                this.actionResponse.set(error);
            },
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }
}
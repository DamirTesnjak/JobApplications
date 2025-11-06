import { Component, EnvironmentInjector, inject, Input, signal, Signal, SimpleChanges } from '@angular/core';
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
@Component({
    selector: 'app-edit-form',
    imports: [Button, InputComponent, StatusDisplay, CommonModule],
    templateUrl: './edit-form.html',
    styleUrl: './edit-form.scss'
})
export class EditForm {
    private readonly store = inject(Store);
    private http = inject(HttpClient);

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

    actionResponse = signal<any>({});
    stateModelKeyAndValues: any;

    stateModelKeys!: string[];
    fieldsToDisplayKeys!: string[];

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

    injector = inject(EnvironmentInjector);
    translation = useTranslation("editForm", this.injector);

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
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
            injector: this.injector
        }

        this.http.post(`api/${this.serverActionName}`, bodyReq).subscribe({
            next: (res) => {
                console.log(`${this.serverActionName}`, res);
                this.actionResponse.set(res);
            },
            error: (error) => {
                this.actionResponse.set(error);
            },
        });
        // this.onClick.emit();
    }
}
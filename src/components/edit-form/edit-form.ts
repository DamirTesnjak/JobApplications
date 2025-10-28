import { Component, inject, Input, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Button } from '../button/button.component';
import { initialStateCompanyEmailConfigs } from '../../app/state/companyEmailConfigs/companyEmailConfigs.reducers';
import flattenObject from '../../utils/methods/flattenObject';
import { InputComponent } from '../input/input';
import { StatusDisplay } from '../status-display/status-display';
import { useTranslation } from '../../utils/translation/useTranslation';
import { initialStateCandidate } from '../../app/state/candidate/candidate.reducer';
import { initialStateHrUser } from '../../app/state/hrUser/hrUser.reducer';
import { Store } from '@ngrx/store';
import { stateSelector } from '../../utils/stateSelector/stateSelector';
@Component({
    selector: 'app-edit-form',
    imports: [Button, InputComponent, StatusDisplay],
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
    @Input() storeSlice: string = "";
    @Input() editable: boolean = false;
    @Input() newProfile: boolean = false;
    @Input() showUploadCVButton: boolean = false;
    @Input() showUploadPictureButton: boolean = false;
    @Input() hrForm: boolean = false;
    @Input() serverActionName: string = "";

    actionResponse = signal<any>({});
    stateModelKeyAndValues = stateSelector(this.storeSlice, this.store);

    stateModelKeys = Object.keys(flattenObject(this.stateModel));
    fieldsToDisplayKeys = this.stateModelKeys.filter(
        (stateModelKey) =>
            stateModelKey !== 'data' &&
            stateModelKey !== 'contentType' &&
            stateModelKey !== 'id',
    )

    translation = useTranslation("en", "editForm");

    flattenedObjects(stateModelKey: string) {
        return this.newProfile
            ? flattenObject(initialStateCandidate)[stateModelKey]
            : flattenObject(this.stateModelKeyAndValues())[stateModelKey];
    };

    displayDefaultValue(field: string) {
        if (this.actionResponse() && this.actionResponse().prevState) {
            return this.actionResponse().prevState[field];
        }
        return this.flattenedObjects(field);
    };

    handleFormAction(event: Event): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const bodyReq = {
            formData: formData,
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
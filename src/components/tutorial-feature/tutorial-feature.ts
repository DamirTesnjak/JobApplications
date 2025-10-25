import { Component, inject, Input } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { useTranslation } from '../../utils/translation/useTranslation';
import { Router } from '@angular/router';
import { ITourSteps } from './type';

@Component({
    selector: 'app-tutorial-feature',
    imports: [],
    templateUrl: './tutorial-feature.html',
})
export class TutorialFeature {
    private shepherd = inject(ShepherdService);
    private router = inject(Router)

    translation = useTranslation("en", "tutorial");
    steps: Array<any> = [];
    locations: string[] = [];
    tutorialRunning = false; // mimic Redux state

    ngOnInit() {
        this.setupTourSteps();
    }

    setupTourSteps() {
        const tourSteps: ITourSteps = {
            '/candidates': [
                {
                    attachTo: { element: '#sidebar-settings', on: 'bottom' },
                    text: this.translation('candidates'),
                },
                {
                    attachTo: { element: '#elementDoesNotExist', on: 'bottom' },
                    text: '',
                },
            ],
            '/settings': [
                {
                    attachTo: { element: '#companyEmailConfiguration', on: 'bottom' },
                    text: this.translation('settings'),
                },
                { attachTo: { element: '#elementDoesNotExist', on: 'bottom' }, text: '' },
            ],
            '/settings/companyEmailConfiguration': [
                {
                    attachTo: { element: '#form', on: 'bottom' },
                    text: this.translation('companyEmailConfiguration'),
                },
                {
                    attachTo: { element: '#setupEmailTemplateMessages', on: 'bottom' },
                    text: this.translation('companyEmailConfiguration2'),
                },
                { attachTo: { element: '#elementDoesNotExist', on: 'bottom' }, text: '' },
            ],
            '/settings/setupEmailTemplateMessages': [
                {
                    attachTo: { element: '#textEditorMainToolbar', on: 'bottom' },
                    text: this.translation('setupEmailTemplateMessages'),
                },
                {
                    attachTo: { element: '#textEditorToolbar', on: 'bottom' },
                    text: this.translation('setupEmailTemplateMessages2'),
                },
                {
                    attachTo: { element: '#editor', on: 'bottom' },
                    text: this.translation('setupEmailTemplateMessages3'),
                },
                {
                    attachTo: { element: '#preview', on: 'bottom' },
                    text: this.translation('setupEmailTemplateMessages4'),
                },
                {
                    attachTo: { element: '#overviewEmailTemplateMessages', on: 'bottom' },
                    text: this.translation('setupEmailTemplateMessages5'),
                },
                { attachTo: { element: '#elementDoesNotExist', on: 'bottom' }, text: '' },
            ],
            '/settings/overviewEmailTemplateMessages': [
                {
                    attachTo: { element: '#table', on: 'bottom' },
                    text: this.translation('overviewEmailTemplateMessages'),
                },
                {
                    attachTo: { element: '#mapEmailTemplateMessages', on: 'bottom' },
                    text: this.translation('overviewEmailTemplateMessages2'),
                },
                { attachTo: { element: '#elementDoesNotExist', on: 'bottom' }, text: '' },
            ],
            '/settings/mapTemplateMessages': [
                {
                    attachTo: { element: '#form', on: 'bottom' },
                    text: this.translation('mapTemplateMessages'),
                },
                {
                    attachTo: { element: '#sidebar-candidates', on: 'bottom' },
                    text: this.translation('mapTemplateMessages2'),
                },
                { attachTo: { element: '#elementDoesNotExist', on: 'bottom' }, text: '' },
            ],
        };
        const currentRoute = this.router.url;
        this.steps = tourSteps[currentRoute] || [];
    }

    startTutorial() {
        this.tutorialRunning = true;
        this.locations = [];

        this.shepherd.defaultStepOptions = {
            cancelIcon: { enabled: true },
            classes: 'shepherd-theme-arrows',
            scrollTo: true,
        };

        this.shepherd.modal = true;
        this.shepherd.confirmCancel = false;

        // Setup tour steps
        this.shepherd.addSteps(
            this.steps.map((step, idx) => ({
                id: 'step-' + idx,
                attachTo: step.attachTo,
                text: step.text,
                buttons: [
                    {
                        text: 'Back',
                        action: this.shepherd.back,
                    },
                    {
                        text: 'Next',
                        action: this.shepherd.next,
                    },
                    {
                        text: 'Close',
                        action: () => {
                            this.shepherd.cancel();
                            this.tutorialRunning = false;
                        },
                    },
                ],
            }))
        );

        this.shepherd.start();

        // Handle step change events
        this.shepherd.tourObject?.on('show', (event: any) => {
            const currentStep = event.step;
            const element = currentStep?.options.attachTo?.element;
            if (!document.querySelector(element)) {
                this.handleTargetNotFound();
            }
        });

        this.shepherd.tourObject?.on('complete', () => {
            this.tutorialRunning = false;
        });
    };

    handleTargetNotFound() {
        const current = this.router.url;

        if (current === '/candidates') this.router.navigate(['/settings']);
        else if (current === '/settings')
            this.router.navigate(['/settings/companyEmailConfiguration']);
        else if (current === '/settings/companyEmailConfiguration')
            this.router.navigate(['/settings/setupEmailTemplateMessages']);
        else if (current === '/settings/setupEmailTemplateMessages')
            this.router.navigate(['/settings/overviewEmailTemplateMessages']);
        else if (current === '/settings/overviewEmailTemplateMessages')
            this.router.navigate(['/settings/mapTemplateMessages']);
        else if (current === '/settings/mapTemplateMessages')
            this.router.navigate(['/candidates']);
    };
}

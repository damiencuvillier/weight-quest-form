import { Component, inject, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOptgroup, MatOption, MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-profile-edit',
  imports: [
    AvatarComponent,
    MatStepper,
    MatStep,
    MatLabel,
    MatFormField,
    MatStepLabel,
    MatInput,
    MatLabel,
    MatStepperPrevious,
    MatButton,
    MatStepperNext,
    MatSelect,
    MatOption,
    NgForOf,
    MatSuffix,
    MatRadioButton,
    MatRadioGroup,
    MatOptgroup,
    MatIcon,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    FormsModule,
    NgIf,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSlideToggle,
    MatListItem,
    MatList
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);

  generalGroup = this._formBuilder.group({
    age: [ '', Validators.required ],
    weight: [ '', [ Validators.required, Validators.min(50), Validators.max(200) ] ],
    height: [ '', [ Validators.required, Validators.min(1.20), Validators.max(2.20) ] ],
    gender: [ '', Validators.required ],
    pathologies: [ '' ],
    family: [ '' ],
    job: [ '', Validators.required ]
  });
  feelingGroup = this._formBuilder.group({
    mental: [ '', Validators.required ],
    physical: [ '', Validators.required ]
  });
  motiveGroup = this._formBuilder.group({
    motivation: [ '', Validators.required ],
  });
  evaluationGroup = this._formBuilder.group({
    meals: [ '', Validators.required ],
    restaurant: [ '', Validators.required ],
    desire: [ '', Validators.required ],
    overeat: [ '', Validators.required ]
  });
  changeGroup = this._formBuilder.group({
    betterways: [ '', Validators.required ],
  });

  public ages: string[] = [ '<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+' ];
  public pathologies: string[] = [ 'Diabète', 'Hypertension', 'Cholestérol', 'HTA', 'SAOS' ];
  public maritalStatuses: string[] = [ 'En couple', "Parents", "Grand-Parents" ];

  public mental?: number = 5;

  public physicalLabel ?: string;

  protected bmi?: number;

  public updatePhysicalLabel() {
    const labels = [
      '',
      'Je ne fais aucune activité physique',
      'De temps à autre',
      'Je fais une activité physique modérée une fois par semaine',
      'Je fais une activité physique intensive une fois par semaine',
      'Je fais une activité physique quotidienne de manera modérée',
      'J\'ai une activité sportive intensive plusieurs fois par semaine'
    ];
    // @ts-ignore
    this.physicalLabel = labels[this.feelingGroup.controls.physical.value ?? 0];

    this.onChange();
  }

  public motivations: { [key: string]: string } = {
    'health': 'améliorer ma santé',
    'mobility': 'améliorer ma mobilité',
    'feeling': 'me sentir mieux de ma peau',
    'image': 'améliorer mon image de moi',
    'confident': 'améliorer ma confiance en moi',
    'tired': 'être moins fatigué',
    'moral': 'avoir un meilleur moral',
    'pain': 'avoir moins de douleurs',
    'sexual': 'améliorer ma libido'
  };

  public actions: { [key: string]: string } = {
    food: 'Changer mon alimentation',
    move: 'Bouger plus',
    medicine: 'Prendre le médicament GLP-1\n(Wegovy, Mounjaro, Ozempic, …)',
    surgery: 'Chirurgie',
    other: 'Autre'
  }

  public onChange(): void {
    this.generalGroup.valueChanges.subscribe(val => {
      localStorage.setItem('general', JSON.stringify(val));
    });
    this.feelingGroup.valueChanges.subscribe(val => {
      localStorage.setItem('feeling', JSON.stringify(val));
    });
    this.motiveGroup.valueChanges.subscribe(val => {
      localStorage.setItem('motive', JSON.stringify(val));
    });
    this.evaluationGroup.valueChanges.subscribe(val => {
      localStorage.setItem('evaluation', JSON.stringify(val));
    })
    this.changeGroup.valueChanges.subscribe(val => {
      localStorage.setItem('change', JSON.stringify(val));
    })


    if (this.generalGroup.controls.height.value && this.generalGroup.controls.weight.value) {
      this.bmi = Math.floor(
        parseInt(this.generalGroup.controls.weight.value) /
        Math.pow(parseFloat(this.generalGroup.controls.height.value), 2));
    } else {
      this.bmi = undefined;
    }


  }

  ngOnInit(): void {
    const general = localStorage.getItem('general');
    if (general != null) {
      this.generalGroup.setValue({
        ...{
          height: 1.80,
          weight: 70
        },
        ...JSON.parse(general)
      });
    }
    const feeling = localStorage.getItem('feeling');
    if (feeling != null) {
      this.feelingGroup.setValue(JSON.parse(feeling));
    }

    const motive = localStorage.getItem('motive');
    if (motive != null) {
      this.motiveGroup.setValue(JSON.parse(motive));
    }

    const evaluation = localStorage.getItem('evaluation');
    if (evaluation != null) {
      this.evaluationGroup.setValue(JSON.parse(evaluation));
    }

    const change = localStorage.getItem('change');
    if (change != null) {
      this.changeGroup.setValue(JSON.parse(change));
    }

    this.updatePhysicalLabel()
  }


  protected readonly Object = Object;

  propagateToRadio($event: MouseEvent) {
    if ($event.target === null) return;
    // @ts-ignore
    ($event.target as HTMLElement).querySelector('button')?.click();
  }

  moveActionDown(index: number) {

    if (Array.isArray(this.changeGroup.controls.betterways.value)) {
      const values: string[] = Array.from(this.changeGroup.controls.betterways.value.values());
      [values[index], values[index + 1]] = [values[index + 1], values[index]];
      // @ts-ignore
      this.changeGroup.controls.betterways.setValue(values);

    }
  }

  moveActionUp(index: number) {
    if (Array.isArray(this.changeGroup.controls.betterways.value)) {
      const values: string[] = Array.from(this.changeGroup.controls.betterways.value.values());
      [values[index], values[index - 1]] = [values[index - 1], values[index]];
      // @ts-ignore
      this.changeGroup.controls.betterways.setValue(values);

    }
  }
}

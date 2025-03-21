import { Component, inject, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious } from '@angular/material/stepper';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatOptgroup, MatOption, MatSelect } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'app-profile-edit',
  imports: [
    AvatarComponent,
    MatStepper,
    MatStep,
    MatLabel,
    MatFormField,
    MatStepLabel,
    ReactiveFormsModule,
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
    MatSlider,
    MatSliderThumb
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent implements OnInit{

  private _formBuilder = inject(FormBuilder);

  generalGroup = this._formBuilder.group({
    age: [ '', Validators.required ],
    weight: [ '', [ Validators.required, Validators.min(50), Validators.max(200) ] ],
    gender: [ '', Validators.required ],
    pathologies: [ '' ],
    family: [ '', Validators.required ],
    job: [ '', Validators.required ]
  });
  feelingGroup = this._formBuilder.group({
    mental: [ '', Validators.required ],
    physical: [ '', Validators.required ]
  });
  public ages: string[] = [ '<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+' ];
  public pathologies: string[] = [ 'Diabète', 'Hypertension', 'Cholestérol', 'HTA', 'SAOS' ];
  public maritalStatuses: string[] = [ 'En couple', "Parents", "Grand-Parents" ];

  public onChange(): void {
    this.generalGroup.valueChanges.subscribe(val => {
      localStorage.setItem('general', JSON.stringify(val));
    });
    this.feelingGroup.valueChanges.subscribe(val => {
      localStorage.setItem('feeling', JSON.stringify(val));
    });
  }

  ngOnInit(): void {
    const general = localStorage.getItem('general');
    if (general != null) {
      this.generalGroup.setValue(JSON.parse(general));
    }
    const feeling = localStorage.getItem('feeling');
    if (feeling != null) {
      this.feelingGroup.setValue(JSON.parse(feeling));
    }
  }


}

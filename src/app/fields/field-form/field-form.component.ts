import { Component, OnInit, SimpleChanges, SimpleChange, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalComponent } from '../../common/modal/modal.component';
import { IField } from '../../models/field.model';
import { FieldService } from '../field.service';
import { ModalPosition } from '../../common/modal/ModalPosition';
import { FieldType } from '../../models/FieldType';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.scss']
})
export class FieldFormComponent implements OnInit, OnDestroy {
  @ViewChild("fieldFormModal", { static: true })
  public fieldFormModal: ModalComponent;

  @Output() fieldChanged = new EventEmitter<IField>();

  public fieldsForm: FormGroup = this.initForm();

  private field: IField;
  private subscription = new Subscription();

  constructor(private fb: FormBuilder, private fieldService: FieldService) { }

  ngOnInit() {
    if (!this.field) {
      this.field = {} as IField;
    }
    let updateSubscription: Subscription;
    let changeSubscription = this.fieldsForm.valueChanges.pipe(
      debounceTime(1500)
    ).subscribe(formData => {
      if (this.fieldsForm.touched && this.fieldsForm.valid) {
        this.fieldFormModal.showLoader();
        updateSubscription = this.fieldService.updateField(this.fieldsForm.value).subscribe((result: IField) => {
          this.fieldFormModal.hideLoader();
          this.fieldChanged.emit(result);
        })
      }
    });
    this.subscription.add(changeSubscription);
    this.subscription.add(updateSubscription);
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: SimpleChange = changes.field;
    this.initFormByField(field.currentValue);
  }

  initForm() {
    return this.fb.group({
      _id: [''],
      label: [''],
      type: [''],
      isRequired: ['']
    });
  }

  initFormByField(field) {
    if (field) {
      this.fieldsForm.patchValue(field);
    }
  }

  open(field) {
    this.field = field;
    this.fieldsForm.reset();
    this.initFormByField(this.field);
    this.fieldFormModal.show();
  }

  updateField() {

  }

  getPosition() {
    return ModalPosition.RIGHT;
  }

  getFieldType() {
    return FieldType;
  }

  onCreateAffectedField() {
    if(!this.field.affectedFields) {
      this.field.affectedFields = [];
    }
    this.field.affectedFields.unshift({});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

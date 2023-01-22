import { FormBuilder, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import {
  QueryBuilderClassNames,
  QueryBuilderConfig
} from "angular2-query-builder";

@Component({
  selector: "app-root",
  template: `
    <h2>Vanilla</h2>
    <br />
    <query-builder
      [formControl]="queryCtrl"
      [config]="currentConfig"
      [allowRuleset]="allowRuleset"
      [allowCollapse]="true"
      [persistValueOnFieldChange]="persistValueOnFieldChange"
    >
      <ng-container
        *queryInput="
          let rule;
          type: 'textarea';
          let getDisabledState = getDisabledState
        "
      >
        <textarea
          class="text-input text-area"
          [(ngModel)]="rule.operator"
          [disabled]="getDisabledState()"
          placeholder="Operator"
        ></textarea>
        <textarea
          class="text-input text-area"
          [(ngModel)]="rule.value"
          [disabled]="getDisabledState()"
          placeholder="Value"
        ></textarea>
        <textarea
          class="text-input text-area"
          [(ngModel)]="rule.time"
          [disabled]="getDisabledState()"
          placeholder="Kurun Waktu"
        ></textarea>
      </ng-container>
    </query-builder>
    <br />
    <div>
      <div class="row">
        <p class="col-6">Control Valid (Vanilla): {{ queryCtrl.valid }}</p>
        <div class="col-6">
          <label
            ><input type="checkbox" (change)="switchModes($event)" />Entity
            Mode</label
          >
        </div>
      </div>
      <div class="row">
        <p class="col-6">Control Touched (Vanilla): {{ queryCtrl.touched }}</p>
        <div class="col-6">
          <label
            ><input
              type="checkbox"
              (change)="changeDisabled($event)"
            />Disabled</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <label
            ><input type="checkbox" [(ngModel)]="allowRuleset" />Allow
            Ruleset</label
          >
        </div>
        <div class="col-6">
          <label
            ><input type="checkbox" [(ngModel)]="allowCollapse" />Allow
            Collapse</label
          >
        </div>
        <div class="col-6">
          <label
            ><input
              type="checkbox"
              [(ngModel)]="persistValueOnFieldChange"
            />Persist Values on Field Change</label
          >
        </div>
      </div>

      <textarea class="output">{{ query | json }}</textarea>
    </div>
  `,
  styles: [
    `
      /deep/ html {
        font: 14px sans-serif;
        margin: 30px;
      }

      .mat-icon-button {
        outline: none;
      }

      .mat-arrow-icon {
        outline: none;
        line-height: 32px;
      }

      .mat-form-field {
        padding-left: 5px;
        padding-right: 5px;
      }

      .text-input {
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .text-area {
        width: 300px;
        height: 100px;
      }

      .output {
        width: 100%;
        height: 300px;
      }
    `
  ]
})
export class AppComponent {
  public queryCtrl: FormControl;

  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: "fa fa-minus",
    addIcon: "fa fa-plus",
    arrowIcon: "fa fa-chevron-right px-2",
    button: "btn",
    buttonGroup: "btn-group",
    rightAlign: "order-12 ml-auto",
    switchRow: "d-flex px-2",
    switchGroup: "d-flex align-items-center",
    switchRadio: "custom-control-input",
    switchLabel: "custom-control-label",
    switchControl: "custom-control custom-radio custom-control-inline",
    row: "row p-2 m-1",
    rule: "border",
    ruleSet: "border",
    invalidRuleSet: "alert alert-danger",
    emptyWarning: "text-danger mx-auto",
    operatorControl: "form-control",
    operatorControlSize: "col-auto pr-0",
    fieldControl: "form-control",
    fieldControlSize: "col-auto pr-0",
    entityControl: "form-control",
    entityControlSize: "col-auto pr-0",
    inputControl: "form-control",
    inputControlSize: "col-auto"
  };

  public query = {
    condition: "and",
    rules: [
      { field: "age", operator: "<=", entity: "physical" },
      {
        field: "birthday",
        operator: "=",
        value: new Date(),
        entity: "nonphysical"
      },
      {
        condition: "or",
        rules: [
          { field: "gender", operator: "=", entity: "physical" },
          { field: "occupation", operator: "in", entity: "nonphysical" },
          { field: "school", operator: "is null", entity: "nonphysical" },
          { field: "notes", operator: "=", entity: "nonphysical" }
        ]
      }
    ]
  };

  public entityConfig: QueryBuilderConfig = {
    entities: {
      physical: { name: "Physical Attributes" },
      nonphysical: { name: "Nonphysical Attributes" }
    },
    fields: {
      age: { name: "Age", type: "number", entity: "physical" },
      gender: {
        name: "Gender",
        entity: "physical",
        type: "category",
        options: [{ name: "Male", value: "m" }, { name: "Female", value: "f" }]
      },
      name: { name: "Name", type: "string", entity: "nonphysical" },
      notes: {
        name: "Notes",
        type: "textarea",
        operators: ["=", "!="],
        entity: "nonphysical"
      },
      educated: {
        name: "College Degree?",
        type: "boolean",
        entity: "nonphysical"
      },
      birthday: {
        name: "Birthday",
        type: "date",
        operators: ["=", "<=", ">"],
        defaultValue: () => new Date(),
        entity: "nonphysical"
      },
      school: {
        name: "School",
        type: "string",
        nullable: true,
        entity: "nonphysical"
      },
      occupation: {
        name: "Occupation",
        entity: "nonphysical",
        type: "category",
        options: [
          { name: "Student", value: "student" },
          { name: "Teacher", value: "teacher" },
          { name: "Unemployed", value: "unemployed" },
          { name: "Scientist", value: "scientist" }
        ]
      }
    }
  };

  public config: QueryBuilderConfig = {
    fields: {
      age: { name: "Age", type: "number" },
      gender: {
        name: "Gender",
        type: "category",
        options: [{ name: "Male", value: "m" }, { name: "Female", value: "f" }]
      },
      name: { name: "Name", type: "string" },
      notes: { name: "Notes", type: "textarea", operators: ["=", "!="] },
      educated: { name: "College Degree?", type: "boolean" },
      birthday: {
        name: "Birthday",
        type: "date",
        operators: ["=", "<=", ">"],
        defaultValue: () => new Date()
      },
      school: { name: "School", type: "string", nullable: true },
      occupation: {
        name: "Occupation",
        type: "category",
        options: [
          { name: "Student", value: "student" },
          { name: "Teacher", value: "teacher" },
          { name: "Unemployed", value: "unemployed" },
          { name: "Scientist", value: "scientist" }
        ]
      }
    }
  };

  public currentConfig: QueryBuilderConfig;
  public allowRuleset: boolean = true;
  public allowCollapse: boolean;
  public persistValueOnFieldChange: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.queryCtrl = this.formBuilder.control(this.query);
    this.currentConfig = this.config;
  }

  switchModes(event: Event) {
    this.currentConfig = (<HTMLInputElement>event.target).checked
      ? this.entityConfig
      : this.config;
  }

  changeDisabled(event: Event) {
    (<HTMLInputElement>event.target).checked
      ? this.queryCtrl.disable()
      : this.queryCtrl.enable();
  }
}

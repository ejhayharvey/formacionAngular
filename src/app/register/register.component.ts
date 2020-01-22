import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { RegisterFormService } from "../register-form.service";

import { MustMatch } from "../must-match.validator";
import { debounceTime } from "rxjs/operators";
import { MemoryForm } from "../models";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  currentFormValue: Observable<any>;
  registerForm: FormGroup;
  submitted = false;
  showMsg = false;
  dontShow = false;
  registerMsg: string;
  registerFormValue: MemoryForm;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterFormService
  ) {}

  ngOnInit() {
    this.registerFormValue = this.memoryForm;
    this.registerForm = this.fb.group(
      {
        name: [this.registerFormValue.name, Validators.required],
        email: [
          this.registerFormValue.email,
          [Validators.required, Validators.email]
        ],
        password: [
          this.registerFormValue.password,
          [Validators.required, Validators.minLength(6)]
        ],
        confirmPassword: [
          this.registerFormValue.confirmPassword,
          Validators.required
        ]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

    this.registerForm.valueChanges.pipe(debounceTime(500)).subscribe(value => {
      console.log("We could autosave!", value);
      this.memoryForm = value;
    });
  }

  set memoryForm(value: MemoryForm) {
    this.registerService.memory = value;
  }

  get memoryForm() {
    return this.registerService.memory;
  }

  sendInfo(): void {
    this.registerService.sendInfo(this.registerForm.value.name);
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      this.sendInfo();

      this.registerService
        .sendDataForm(this.registerForm.value)

        .subscribe(
          data => {
            this.registerMsg = data["p"];
          },
          error => {
            this.registerMsg = error["statusText"];
            this.dontShow = true;
            console.log(error, "error");
          },
          () => {
            console.log("complete");
          }
        );

      this.showMsg = true;
      this.registerForm.reset();
      this.submitted = false;
    }
  }
}

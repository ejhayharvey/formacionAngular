import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Observable } from "rxjs";
import { RegisterFormService } from "../register-form.service";
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent
} from "@angular/common/http";
import { Router } from "@angular/router";

import { MustMatch } from "../must-match.validator";
import { debounceTime } from "rxjs/operators";
import { MemoryForm } from "../models";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  /*
  injectar service form

  utilizar el subject para mandar info a través de el a todos sus suscriptores
  */
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
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );

    this.registerForm.valueChanges.pipe(debounceTime(100)).subscribe(value => {
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

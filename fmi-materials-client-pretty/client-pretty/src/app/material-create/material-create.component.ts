import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../services/material-service/material.service";
import {Material} from "../services/material-service/material";
import {HttpResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-material-create',
  templateUrl: './material-create.component.html',
  styleUrls: ['./material-create.component.css']
})
export class MaterialCreateComponent {
  constructor(private fb: FormBuilder, private materialService: MaterialService,
              @Inject(MAT_DIALOG_DATA) public data: { course: string }) {
  }

  materialForm!: FormGroup;

  ngOnInit() {
    this.materialForm = this.fb.group({
      name: ['', Validators.required],
      filePath: ['', Validators.required],
      type: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  onSubmit() {
    let name = '';
    let type = '';
    let filePath = '';
    let group = '';
    if (this.materialForm != null) {
      name = this.materialForm.value.name;
      type = this.materialForm.value.type;
      filePath = this.materialForm.value.filePath;
      group = this.materialForm.value.group;
    }
    const material: Material = {
      name: name,
      type: type,
      filePath: filePath,
      group: group
    };
    const courseName: string = this.data.course; // Replace with actual course ID
    this.materialService.createMaterial(material, courseName).subscribe(r => {
        console.log(r);
      }
    );
  }
}

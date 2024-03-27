import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css'],
})
export class EditTaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;

  openToEdit: boolean = false;
  taskForm: FormGroup;
  taskState: boolean = false;

  constructor(private database: DatabaseService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskTitle: [''],
      taskDescription: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.initializeForm(this.task);
    }
  }

  initializeForm(task: Task) {
    this.taskForm.controls['taskTitle'].setValue(task.title);
    this.taskForm.controls['taskDescription'].setValue(task.description);

    this.taskForm.disable();
  }

  changeState(event: any, task: Task) {
    this.taskState = event.target!.checked;

    let taskChanged: Task = {
      id: task.id,
      title: task.title,
      description: task.description,
      date: task.date,
      finished: this.taskState,
    };

    this.database.updateTask(taskChanged);

    this.taskState ?? this.taskForm.disable();
  }

  updateTask() {
    this.taskForm.enable();
    this.openToEdit = !this.openToEdit;
  }

  saveTaskEdited() {
    let taskEdited: Task = {
      id: this.task?.id,
      title: this.taskForm.controls['taskTitle'].value,
      description: this.taskForm.controls['taskDescription'].value,
      date: this.task?.date,
      finished: this.task?.finished,
    };

    console.log(taskEdited);

    this.task = taskEdited;
    this.database.updateTask(this.task);

    this.openToEdit = !this.openToEdit;
    this.taskForm.disable();
  }
}

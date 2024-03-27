import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  loadTask: boolean = false;

  taskForm = this.fb.group({
    taskTitle: ['', Validators.required],
    taskDescription: [''],
  });

  constructor(private fb: FormBuilder, private database: DatabaseService) {}

  ngOnInit(): void {}

  addTask() {
    this.loadTask = !this.loadTask;
  }

  async getNewTask() {
    let titleTask: string = this.taskForm.value.taskTitle ?? '';
    let descTask: string = this.taskForm.value.taskDescription ?? '';

    let dateNum: number = new Date().setSeconds(0, 0);
    let actualDate = new Date(dateNum).toISOString();

    let newTask: Task = {
      title: titleTask,
      description: descTask,
      date: actualDate,
      finished: false,
    };
    this.loadTask = !this.loadTask;

    this.database.addTask(newTask);

    window.location.reload();
  }
}

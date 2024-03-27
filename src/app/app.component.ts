import { Component } from '@angular/core';
import { Task } from './models/task.interface';
import { DatabaseService } from './services/database.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tasks';
  tasks: Task[] = [];

  editBoxOpen: boolean = false;

  taskForm = this.fb.group({
    taskTitle: ['', Validators.required],
    taskDescription: [''],
  });
  constructor(private database: DatabaseService, private fb: FormBuilder) {
    this.getTasks();
  }

  async getTasks() {
    this.tasks = (await this.database.getAllTasks()).reverse();
    console.log(this.tasks);
  }

  deleteTask(id: number) {
    this.database.deleteTask(id);
    this.tasks = this.tasks.filter((task: Task) => {
      return task.id != id;
    });
  }
}

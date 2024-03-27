import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  tasks: Dexie.Table<Task, number>;

  constructor() {
    super('todolistDB');
    this.version(1).stores({
      tasks: '++id, title, description, date, completed',
    });
    this.tasks = this.table('tasks');
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.tasks.toArray();
  }

  async addTask(task: Task): Promise<void> {
    await this.tasks.add(task);
  }

  async updateTask(task: Task): Promise<void> {
    await this.tasks.put(task);
  }

  async deleteTask(id: number): Promise<void> {
    await this.tasks.delete(id);
  }
}

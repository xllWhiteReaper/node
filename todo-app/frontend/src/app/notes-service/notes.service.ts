import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  get notes$(): Observable<Note[]> {
    console.log('getting notes from service');
    return this.http.get<Note[]>(API_URL);
  }
}

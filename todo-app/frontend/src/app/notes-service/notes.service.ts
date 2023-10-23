import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Note } from '../models/note.interface';
import { APIResponse } from '../models/api-response.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  get notes$(): Observable<Note[]> {
    return this.http.get<Note[]>(API_URL);
  }

  addNote(noteToAdd: string): Observable<boolean> {
    return this.http.post(API_URL, { newNoteDescription: noteToAdd }).pipe(
      map((response) => {
        return (response as APIResponse<any>)?.error ? false : true;
      })
    );
  }

  deleteNote(noteId: string): Observable<boolean> {
    return this.http.delete(`${API_URL}/${noteId}`).pipe(map(() => true));
  }
}

import { Component, OnInit } from '@angular/core';
import { Note } from './models/note.interface';
import { Observable } from 'rxjs';
import { NotesService } from './notes-service/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'to-do app';
  notes$!: Observable<Note[]>;
  constructor(private notesService: NotesService) {
    console.log('requesting constructor');
  }

  ngOnInit(): void {
    console.log('requesting notes');
    this.notes$ = this.notesService.notes$;
  }
}
